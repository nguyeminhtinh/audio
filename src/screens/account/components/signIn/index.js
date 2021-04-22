/* eslint-disable no-case-declarations */
// @flow

import React, { memo, useEffect, useState } from 'react';
import Modal from 'components/Modal';
import ROUTERS from 'constants/router';
import FormLogin from './FormLogin';
import { API } from '../../../../utils/Apis';
import { setJwtToken, toDoHideMusicPlayer } from '../../../../utils/Helpers';

type Props = {
  signIn: Function,
  history: {
    push: Function,
  },
  type: string,
  isProcessing: boolean,
  errorServer: Object,
  resetData: Function,
  codeSignIn: number,
  seqNo: string,
  checkUserAccess: Function,
  code: number,
  typeCheckUser: string,
  token: string,
  settingUserCategory: Function,
  signInFacebook: Function,
  signInKakao: Function,
  signInNaver: Function,
  getTypeLogin: Function,
  checkUserSnsLogin: Function,
  statusCheck: string,
  // goToLogin: Function,
};

const SignIn = ({
  signIn,
  history,
  type,
  isProcessing,
  errorServer,
  resetData,
  codeSignIn,
  seqNo,
  checkUserAccess,
  code,
  typeCheckUser,
  token,
  settingUserCategory,
  signInFacebook,
  signInKakao,
  signInNaver,
  getTypeLogin,
  checkUserSnsLogin,
  statusCheck,
}: Props) => {
  /**
   * handle effect after login success
   */
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (codeSignIn === 502) {
      setIsShow(true);
    }
  }, [codeSignIn]);

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      toDoHideMusicPlayer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // goToLogin();
    window.scrollTo(0, 0);
  });

  const convertBase64 = seqNo && window.atob(seqNo);
  const seqNoId = convertBase64 && convertBase64.replace('seqNo=', '');

  useEffect(() => {
    if (type === 'SIGN_IN_SUCCESS' && codeSignIn === 200) {
      getTypeLogin('normal');
      resetData();
      checkUserAccess({
        seqNo: seqNoId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seqNoId, type]);

  useEffect(() => {
    if (type === 'SIGN_IN_FACEBOOK_SUCCESS' && codeSignIn === 201) {
      getTypeLogin('facebook');
      resetData();
      checkUserAccess({
        seqNo: seqNoId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seqNoId, type]);

  useEffect(() => {
    if (type === 'SIGN_IN_KAKAO_SUCCESS' && codeSignIn === 201) {
      getTypeLogin('kakao');
      resetData();
      checkUserAccess({
        seqNo: seqNoId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seqNoId, type]);

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
    <div className="login-page">
      <FormLogin
        signIn={signIn}
        isProcessing={isProcessing}
        history={history}
        errorServer={errorServer}
        type={type}
        signInFacebook={signInFacebook}
        signInKakao={signInKakao}
        signInNaver={signInNaver}
        checkUserSnsLogin={checkUserSnsLogin}
        statusCheck={statusCheck}
      />
      <Modal
        isOpen={isShow}
        isShowFooter
        handleClose={() => {
          setIsShow(false);
          resetData();
        }}
        handleSubmit={() => {
          setIsShow(false);
          resetData();
        }}
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">
          이메일 혹은 비밀번호를 확인해주세요!
        </div>
      </Modal>
    </div>
  );
};

export default memo<Props>(SignIn);
