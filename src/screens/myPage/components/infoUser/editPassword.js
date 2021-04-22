// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import ROUTERS from 'constants/router';
import Input from 'components/Input';
import Button from 'components/Button';
import Modal from 'components/Modal';
// import useCountDownTime from '../../../../customHooks/useCountDownTime';
import { Validator } from '../../../../utils/Validator';

type Props = {
  updatePassword: Function,
  type: string,
  errors: string,
  resetData: Function,
  codeStatus: number,
  history: {
    push: Function,
  },
  registerHistoryPage: Function,
};
const FormUpdatePassword = ({
  updatePassword,
  type,
  errors,
  resetData,
  codeStatus,
  history,
  registerHistoryPage,
}: Props) => {
  const [error, setError] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [isShowError, setIsShowError] = useState({
    isOpen: false,
    content: '',
  });
  const [isShowConfirmBack, setIsShowConfirmBack] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    password: '',
    passwordConfirm: '',
    currentPassword: '',
  });
  // const time = 180000;
  // // Count time
  // const [minutes, seconds, handleStart] = useCountDownTime(time);
  const handleChangeInput = (value, name) => {
    setDataUpdate({
      ...dataUpdate,
      [name]: value,
    });
  };

  useEffect(() => {
    registerHistoryPage('SG2-1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'UPDATE_PASSWORD_SUCCESS' && codeStatus === 200) {
      setIsShow(true);
      resetData();
    }
    if (type === 'UPDATE_PASSWORD_SUCCESS' && codeStatus !== 200) {
      setIsShowError({
        isOpen: true,
        content: errors,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleSubmit = () => {
    let validation: {
      password?: string,
    } = {};
    const ruleSignUp = {
      password: ['password', 'passwordRequired'],
    };
    const objSubmit = {
      password: dataUpdate.password,
    };
    validation = Validator(objSubmit, ruleSignUp);
    if (Object.keys(validation).length > 0) {
      setError(validation);
      return validation;
    }
    updatePassword({
      conPassword: dataUpdate.password,
      newPassword: dataUpdate.passwordConfirm,
      oldPassword: dataUpdate.currentPassword,
    });

    setError({});
    return validation;
  };

  // check back function
  const handleCheckBack = () => {
    if (
      dataUpdate.password.trim() !== '' ||
      dataUpdate.passwordConfirm.trim() !== '' ||
      dataUpdate.currentPassword.trim() !== ''
    ) {
      setIsShowConfirmBack(true);
    } else {
      history.push(ROUTERS.MY_PAGE);
    }
  };

  return (
    <MainLayout
      customClass=""
      titleHeader="비밀번호 변경"
      isShowHeader
      isLink
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      <div className="form-signup-page">
        <Input
          placeholder="기존 비밀번호 입력 (영문,숫자 포함 8~20자리)"
          type="password"
          label="현재 비밀번호"
          value={dataUpdate.currentPassword}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'currentPassword');
          }}
        />
        <Input
          placeholder="패스워드 (영문,숫자 포함 8~20자리)"
          type="password"
          label="새 비밀번호"
          value={dataUpdate.password}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'password');
          }}
          errorMsg={error.password}
        />
        <Input
          placeholder="패스워드 (영문,숫자 포함 8~20자리)"
          type="password"
          label="비밀번호 확인"
          value={dataUpdate.passwordConfirm}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'passwordConfirm');
          }}
        />
        <Button customClass="btn-submit" onClick={handleSubmit}>
          <p>변경하기</p>
        </Button>
      </div>
      <Modal
        isOpen={isShow}
        isShowFooter
        handleClose={() => {
          setIsShow(false);
          history.push(ROUTERS.MY_PAGE);
        }}
        handleSubmit={() => {
          setIsShow(false);
          history.push(ROUTERS.MY_PAGE);
        }}
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">수정되었습니다.</div>
      </Modal>
      <Modal
        isOpen={isShowConfirmBack}
        isShowFooter
        handleClose={() => setIsShowConfirmBack(false)}
        handleSubmit={() => window.history.go(-1)}
        customClassButton="w-100"
        classNameBtnRight="btn-right"
        classNameBtnLeft="btn-left"
        textBtnRight="확인"
        textBtnLeft="취소"
        isShowHeader
        title="알림"
        isShowTwoBtn
      >
        <div className="title-content">
          수정을 취소하시겠습니까?
          <br />
          작성중인 글은 삭제됩니다.
        </div>
      </Modal>
      <Modal
        isOpen={isShowError.isOpen}
        isShowFooter
        handleClose={() => {
          setIsShowError({
            ...isShowError,
            isOpen: false,
          });
        }}
        handleSubmit={() =>
          setIsShowError({
            ...isShowError,
            isOpen: false,
          })
        }
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">{isShowError.content}</div>
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(FormUpdatePassword);
