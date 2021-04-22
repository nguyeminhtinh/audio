/* eslint-disable jsx-a11y/anchor-is-valid */
// @flow
import React, { useState, memo, useEffect } from 'react';
import queryString from 'query-string';
// import NaverLogin from 'react-naver-login';
import Loading from 'components/Loading';
import NaverLogin from '@dohyeon/react-naver-login';
import Input from 'components/Input';
import PrimaryButton from 'components/Button';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import { checkPlatform } from '../../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  signIn: Function,
  // signInKakao: Function,
  signInNaver: Function,
  checkUserSnsLogin: Function,
  type: string,
  statusCheck: string,
  isProcessing: boolean,
};

const FormLogin = ({
  history,
  signIn,
  signInNaver,
  checkUserSnsLogin,
  type,
  statusCheck,
  isProcessing,
}: Props) => {
  const currentOS = checkPlatform();
  // const [loaded, setLoaded] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  });
  const [dataLoginNaver, setDataLoginNaver] = useState({});

  const params = queryString.parse(window.location.hash);

  const handleChangeInput = (value, name) => {
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };
  // const idKakao = process.env.REACT_APP_ID_KAKAO;
  const idNaver = process.env.REACT_APP_ID_NAVER;
  const callbackNaver = process.env.REACT_APP_CALLBACK_NAVER;
  const apiUrl = process.env.REACT_APP_API_URL || '';
  const handleSubmit = () => {
    signIn(dataLogin);
  };

  useEffect(() => {
    if (type === 'CHECK_USER_SNS_LOGIN_SUCCESS' && statusCheck === 'Y') {
      signInNaver({
        birth: '',
        email: dataLoginNaver?.response?.email,
        imgPath: dataLoginNaver?.response?.profile_image,
        isBookClub: 'N',
        isSns: 'Y',
        name: dataLoginNaver?.response?.nickname,
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
    }
    if (type === 'CHECK_USER_SNS_LOGIN_SUCCESS' && statusCheck === 'N') {
      history.push(
        `${ROUTERS.SIGN_UP_SNS}?name=${dataLoginNaver?.response?.nickname}&email=${dataLoginNaver?.response?.email}&birth=${dataLoginNaver?.response?.birthday}&type="naver"`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, statusCheck, dataLoginNaver]);

  const handleLoginApple = () => {
    const checker = checkPlatform();
    if (checker.iphone) {
      window.webkit.messageHandlers.loginApple.postMessage('');
    }
  };

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
        setDataLoginNaver(data);
        checkUserSnsLogin({
          email: data?.response?.email,
          snsType: 'NAVER',
          socialId: '',
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      {isProcessing ? (
        <Loading />
      ) : (
        <div className="form-login">
          <div className="form-login__top">
            <img
              src={IMAGES.icon_logo_login}
              alt="icon_logo_login"
              className="form-login__top__intro-logo"
            />
            <img
              src={IMAGES.icon_intro}
              alt="icon_intro"
              className="form-login__top__intro"
            />
          </div>
          <Input
            placeholder="아이디"
            type="text"
            label=""
            value={dataLogin.email.trim()}
            onChange={(e) => handleChangeInput(e.target.value, 'email')}
            name="userId"
            autoComplete="off"
            onKeyPress={handleKeyDown}
          />
          <Input
            placeholder="비밀번호를 입력해주세요."
            type="password"
            label=""
            value={dataLogin.password.trim()}
            onChange={(e) => handleChangeInput(e.target.value, 'password')}
            onKeyPress={handleKeyDown}
          />
          <div className="text-center btn-login">
            <PrimaryButton
              type="button"
              variant="primary"
              onClick={handleSubmit}
            >
              로그인
            </PrimaryButton>
          </div>
          <div className="group-action">
            <p
              onClick={() => history.push(ROUTERS.SIGN_UP)}
              role="presentation"
            >
              회원 가입
            </p>
            <p
              onClick={() => history.push(ROUTERS.FIND_PASSWORD)}
              role="presentation"
            >
              비밀번호 찾기
            </p>
          </div>
          <div className="easy-login">
            <p>간편 로그인</p>
            <div className="easy-login__group-action-login">
              {/* <img
            src={IMAGES.icon_kakao}
            alt="icon_kakao"
            onClick={() => {
              handleLoginKakaoTalk();
            }}
            role="presentation"
            id="kakao-login-btn"
          /> */}
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
                <img
                  src={IMAGES.icon_naver}
                  alt="icon_naver"
                  role="presentation"
                />
              </NaverLogin>
              {currentOS.iphone && (
                <img
                  src={IMAGES.icon_apple}
                  alt="icon_apple"
                  onClick={handleLoginApple}
                  role="presentation"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo<Props>(FormLogin);
