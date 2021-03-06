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
      titleHeader="???????????? ??????"
      isShowHeader
      isLink
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      <div className="form-signup-page">
        <Input
          placeholder="?????? ???????????? ?????? (??????,?????? ?????? 8~20??????)"
          type="password"
          label="?????? ????????????"
          value={dataUpdate.currentPassword}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'currentPassword');
          }}
        />
        <Input
          placeholder="???????????? (??????,?????? ?????? 8~20??????)"
          type="password"
          label="??? ????????????"
          value={dataUpdate.password}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'password');
          }}
          errorMsg={error.password}
        />
        <Input
          placeholder="???????????? (??????,?????? ?????? 8~20??????)"
          type="password"
          label="???????????? ??????"
          value={dataUpdate.passwordConfirm}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'passwordConfirm');
          }}
        />
        <Button customClass="btn-submit" onClick={handleSubmit}>
          <p>????????????</p>
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
        textBtnRight="??????"
        isShowHeader
        title="??????"
      >
        <div className="title-content">?????????????????????.</div>
      </Modal>
      <Modal
        isOpen={isShowConfirmBack}
        isShowFooter
        handleClose={() => setIsShowConfirmBack(false)}
        handleSubmit={() => window.history.go(-1)}
        customClassButton="w-100"
        classNameBtnRight="btn-right"
        classNameBtnLeft="btn-left"
        textBtnRight="??????"
        textBtnLeft="??????"
        isShowHeader
        title="??????"
        isShowTwoBtn
      >
        <div className="title-content">
          ????????? ?????????????????????????
          <br />
          ???????????? ?????? ???????????????.
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
        textBtnRight="??????"
        isShowHeader
        title="??????"
      >
        <div className="title-content">{isShowError.content}</div>
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(FormUpdatePassword);
