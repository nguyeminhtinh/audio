// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import Input from 'components/Input';
import Button from 'components/Button';
import Modal from 'components/Modal';

type Props = {
  registerCoupon: Function,
  codeRegisterCoupon: string,
  type: string,
  resetData: Function,
  registerHistoryPage: Function,
};
const CouponBox = ({
  registerCoupon,
  codeRegisterCoupon,
  type,
  resetData,
  registerHistoryPage,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowError, setIsShowError] = useState({
    isOpen: false,
    content: '',
  });
  const [dataUpdate, setDataUpdate] = useState({
    coupon: '',
  });
  const handleChangeInput = (value, name) => {
    setDataUpdate({
      ...dataUpdate,
      [name]: value,
    });
  };

  useEffect(() => {
    registerHistoryPage('SG6');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'REGISTER_COUPON_SUCCESS' && codeRegisterCoupon === 'CP01') {
      setIsShowError({
        isOpen: true,
        content: '정기 결제자는 쿠폰 사용이 불가합니다.',
      });
    }
    if (type === 'REGISTER_COUPON_SUCCESS' && codeRegisterCoupon === 'CP02') {
      setIsShowError({
        isOpen: true,
        content: '등록되어 있지 않은 쿠폰입니다',
      });
    }
    if (type === 'REGISTER_COUPON_SUCCESS' && codeRegisterCoupon === 'CP03') {
      setIsShowError({
        isOpen: true,
        content: '이미 사용한 쿠폰입니다.',
      });
    }
    if (type === 'REGISTER_COUPON_SUCCESS' && codeRegisterCoupon === 'CP04') {
      setIsShowError({
        isOpen: true,
        content: '이미 쿠폰을 사용중입니다.',
      });
    }
    if (
      type === 'REGISTER_COUPON_SUCCESS' &&
      codeRegisterCoupon === 'success'
    ) {
      setIsShowError({
        isOpen: true,
        content: '쿠폰이 적용되었습니다.',
      });
    }
  }, [codeRegisterCoupon, type]);

  const handleSubmit = () => {
    registerCoupon({
      code: dataUpdate.coupon,
    });
  };

  return (
    <MainLayout customClass="" titleHeader="쿠폰함" isShowHeader isLink>
      <div className="form-signup-page coupon">
        <h1>쿠폰 번호를 입력해주세요.</h1>
        <div className="form-signup-page__box-email box-coupon">
          <Input
            placeholder="대소문자 구분없이 입력해주세요"
            type="text"
            label=""
            maxLength="8"
            value={dataUpdate.coupon}
            onChange={(e) => {
              handleChangeInput(e.target.value, 'coupon');
            }}
          />
          <p className="note-coupon">
            * 정기 결제를 진행하고 있는 고객은 쿠폰 사용이 불가능합니다.
          </p>
          <Button
            customClass="btn check-email check-coupon"
            onClick={handleSubmit}
            isDisabled={dataUpdate?.coupon?.length < 8}
          >
            <p className="text-check-email">등록</p>
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isShow}
        isShowFooter
        handleClose={() => {
          setIsShow(false);
        }}
        handleSubmit={() => {
          setIsShow(false);
          window.history.go(-1);
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
          resetData();
        }}
        handleSubmit={() => {
          setIsShowError({
            ...isShowError,
            isOpen: false,
          });
          resetData();
        }}
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

export default memo<Props>(CouponBox);
