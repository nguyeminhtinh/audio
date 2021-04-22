// @flow

import React, { memo, useEffect } from 'react';
import PrimaryButton from 'components/Button';
import IMAGES from 'themes/images';
import queryString from 'query-string';
import ROUTERS from 'constants/router';
import Lottie from 'react-lottie';
import NaverLogin from '@dohyeon/react-naver-login';
import logo from '../../../../assets/json/join_01.json';
import { API } from '../../../../utils/Apis';
import { checkPlatform, setJwtToken } from '../../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  signInNaver: Function,
  type: string,
  resetData: Function,
  codeSignIn: number,
  seqNo: string,
  checkUserAccess: Function,
  code: number,
  typeCheckUser: string,
  token: string,
  settingUserCategory: Function,
  // signInKakao: Function,
  signInNaver: Function,
  getTypeLogin: Function,
};

const iconLogo = {
  loop: false,
  autoplay: true,
  animationData: logo,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const SignUp = ({
  history,
  type,
  resetData,
  codeSignIn,
  seqNo,
  checkUserAccess,
  code,
  typeCheckUser,
  token,
  settingUserCategory,
  // signInKakao,
  signInNaver,
  getTypeLogin,
}: Props) => {
  const currentOS = checkPlatform();
  const idNaver = process.env.REACT_APP_ID_NAVER;
  const callbackNaver = process.env.REACT_APP_CALLBACK_NAVER;
  const apiUrl = process.env.REACT_APP_API_URL || '';
  const params = queryString.parse(window.location.hash);
  const convertBase64 = seqNo && window.atob(seqNo);
  const seqNoId = convertBase64 && convertBase64.replace('seqNo=', '');
  useEffect(() => {
    if (type === 'SIGN_IN_NAVER_SUCCESS' && codeSignIn === 201) {
      getTypeLogin('naver');
      resetData();
      checkUserAccess({
        seqNo: seqNoId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seqNoId, type]);

  const handleLoginNaver = () => {
    fetch(`${apiUrl}/naver/user/information`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: params?.access_token,
      }),
    })
      .then((res) => res.json())
      .then((infoNaver) => {
        const data = JSON.parse(infoNaver.body);
        signInNaver({
          birth: '',
          email: data?.response?.email,
          imgPath: data?.response?.profile_image,
          isBookClub: 'N',
          isSns: 'Y',
          name: data?.response?.nickname,
          onlyWifi: 'N',
          password: '',
          phone: '',
          pushable: 'Y',
          role: 'GUEST',
          roleKey: '',
          termsPolicy: 'Y',
          privacyPolicy: 'Y',
          eventPolicy: 'N',
        });
      })
      .catch(console.log);
  };
  useEffect(() => {
    if (params?.access_token) {
      handleLoginNaver();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window]);

  useEffect(() => {
    if (code === 201 && typeCheckUser === 'CHECK_USER_ACCESS_SUCCESS') {
      API.setHeader('Authorization', `${token}`);
      const data = { token };
      setJwtToken(JSON.stringify(data));
      history.push(ROUTERS.MAIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, token, typeCheckUser]);

  // get setting category
  useEffect(() => {
    if (token !== '') {
      settingUserCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="signup-page">
      <div className="signup-page__top">
        {/* <img src={IMAGES.icon_sign_up} alt="icon_sign_up" /> */}
        <Lottie options={iconLogo} isStopped={false} isPaused={false} />
      </div>
      <PrimaryButton
        type="button"
        variant="primary"
        customClass="btn-login-email"
        onClick={() => history.push(ROUTERS.SIGN_UP_FORM)}
      >
        이메일로 가입하기
      </PrimaryButton>
      <PrimaryButton
        type="button"
        variant="primary"
        customClass="btn-member"
        onClick={() => history.push(ROUTERS.LOGIN)}
      >
        이미 회원이신가요?
      </PrimaryButton>
      <div className="login-social">
        <p>간편 로그인</p>
        <div className="login-social__item">
          {/* <img src={IMAGES.icon_kakao} alt="icon_kakao" /> */}
          <NaverLogin
            clientId={idNaver}
            callbackUrl={callbackNaver}
            render={(props) => (
              <img
                src={IMAGES.icon_naver}
                // eslint-disable-next-line react/prop-types
                onClick={props.onClick}
                alt="icon_naver"
                role="presentation"
              />
            )}
            // onSuccess={(naverUser) => handleLoginNaver(naverUser)}
            // onFailure={(result) => console.error(result)}
          >
            <img src={IMAGES.icon_naver} alt="icon_naver" role="presentation" />
          </NaverLogin>
          {currentOS.iphone && <img src={IMAGES.icon_apple} alt="icon_apple" />}
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(SignUp);
