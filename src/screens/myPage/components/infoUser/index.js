// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import Input from 'components/Input';
import ROUTERS from 'constants/router';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { isNumberKey } from '../../../../utils/Helpers';

type Props = {
  infoUser: Object,
  updatePhone: Function,
  type: string,
  resetData: Function,
  history: {
    go: Function,
    push: Function,
  },
  registerHistoryPage: Function,
};
const FormSignUp = ({
  infoUser,
  updatePhone,
  type,
  resetData,
  history,
  registerHistoryPage,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowError, setIsShowError] = useState({
    isOpen: false,
    content: '',
  });
  const [dataUpdate, setDataUpdate] = useState({
    phone: infoUser?.phone,
  });

  const handleChangeInput = (value, name) => {
    setDataUpdate({
      ...dataUpdate,
      [name]: value,
    });
  };

  useEffect(() => {
    registerHistoryPage('SG2');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTypeLogin = (item) => {
    let typeLogin = '';
    switch (item) {
      case null:
        typeLogin = '딸기콩';
        break;
      case 'FACEBOOK':
        typeLogin = '페이스북';
        break;
      case 'KAKAO':
        typeLogin = '카카오톡';
        break;
      case 'NAVER':
        typeLogin = '네이버';
        break;
      case 'APPLE':
        typeLogin = 'APPLE';
        break;
      default:
        break;
    }
    return typeLogin;
  };

  useEffect(() => {
    if (type === 'UPDATE_PHONE_SUCCESS') {
      setIsShow(true);
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleSubmit = () => {
    if (dataUpdate.phone.length >= 10 || dataUpdate.phone.length === 0) {
      updatePhone({
        phone: dataUpdate.phone,
      });
    }
    if (dataUpdate.phone.length >= 1 && dataUpdate.phone.length < 10) {
      setIsShowError({
        content: '휴대전화 번호를 다시 확인해주세요',
        isOpen: true,
      });
    }
  };

  // check back function
  const handleCheckBack = () => {
    history.push(ROUTERS.MY_PAGE);
  };
  return (
    <MainLayout
      customClass=""
      titleHeader="내 정보 수정"
      isShowHeader
      isLink
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      <div className="form-signup-page">
        <Input
          placeholder="이메일 입력"
          type="text"
          label="회원 유형"
          value={renderTypeLogin(infoUser?.snsType)}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'email');
          }}
          disabled
        />
        <Input
          placeholder=""
          type="text"
          label="E-mail"
          value={infoUser?.email}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'email');
          }}
          disabled
        />
        <Input
          placeholder=""
          type="text"
          label="이름"
          value={infoUser?.name}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'name');
          }}
          disabled
        />
        <Input
          placeholder=""
          type="text"
          label="생년월일"
          value={infoUser.birth}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'birth');
          }}
          disabled
        />
        <Input
          placeholder="휴대전화 번호를 입력해주세요"
          type="text"
          label="휴대폰 번호"
          value={dataUpdate.phone}
          onChange={(e) => {
            handleChangeInput(e.target.value, 'phone');
          }}
          pattern="[0-9]*"
          onKeyPress={(e) => isNumberKey(e)}
          inputMode="numeric"
          maxLength="11"
        />
        <Button customClass="btn-submit" onClick={handleSubmit}>
          <p>수정하기</p>
        </Button>
      </div>
      <Modal
        isOpen={isShow}
        isShowFooter
        handleClose={() => {
          setIsShow(false);
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

export default memo<Props>(FormSignUp);
