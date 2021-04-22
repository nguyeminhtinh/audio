// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import Modal from 'components/Modal';
import REGEX from 'constants/regex';
import Input from 'components/Input';
import Button from 'components/Button';
import Loading from 'components/Loading';
import ROUTERS from 'constants/router';

type Props = {
  findPassword: Function,
  type: string,
  history: {
    go: Function,
    push: Function,
  },
  codeFindPass: number,
  resetData: Function,
  isProcessing: boolean,
};
const FindPassword = ({
  findPassword,
  type,
  history,
  codeFindPass,
  resetData,
  isProcessing,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [dataSubmit, setDataSubmit] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (type === 'FIND_PASSWORD_SUCCESS' && codeFindPass === 200) {
      setIsShowSuccess(true);
      resetData();
    }
    if (type === 'FIND_PASSWORD_SUCCESS' && codeFindPass === 400) {
      setIsShow(true);
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, codeFindPass]);

  const handleChangeInput = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (!REGEX.EMAIL.test(dataSubmit.email)) {
      setIsShow(true);
    } else {
      findPassword({ name: dataSubmit.name, email: dataSubmit.email });
    }
  };
  const handleCheckBack = () => {
    history.push(ROUTERS.LOGIN);
  };
  return (
    <MainLayout
      customClass=""
      titleHeader="비밀번호 찾기"
      isShowHeader
      isLink
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      {isProcessing ? (
        <Loading />
      ) : (
        <div className="form-signup-page">
          <h1 className="form-signup-page__title">
            가입된 이름과 이메일을 입력하면 임시 비밀번호가 발급됩니다.
          </h1>
          <Input
            placeholder="제목을 입력해 주세요."
            type="text"
            label="이름"
            value={dataSubmit.name}
            onChange={(e) => {
              handleChangeInput(e.target.value, 'name');
            }}
          />
          <Input
            placeholder="이메일 입력"
            type="text"
            label="이메일"
            value={dataSubmit.email}
            onChange={(e) => {
              handleChangeInput(e.target.value, 'email');
            }}
          />

          <Button customClass="btn-submit" onClick={handleSubmit}>
            <p>임시 비밀번호 발급 받기</p>
          </Button>
        </div>
      )}

      <Modal
        isOpen={isShow}
        isShowFooter
        handleClose={() => {
          setIsShow(false);
        }}
        handleSubmit={() => {
          setIsShow(false);
        }}
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">이메일 및 이름을 다시 확인해주세요.</div>
      </Modal>
      <Modal
        isOpen={isShowSuccess}
        isShowFooter
        handleClose={() => {
          setIsShowSuccess(false);
          history.go(-1);
        }}
        handleSubmit={() => {
          setIsShowSuccess(false);
          history.go(-1);
        }}
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">임시 비밀번호가 발송되었습니다.</div>
      </Modal>
    </MainLayout>
  );
};

export default memo<Props>(FindPassword);
