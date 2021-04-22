/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
// @flow
import React from 'react';
import { ModalPopup } from 'components/Modal';
import listOptionSubscription from 'constants/listOptionSubscription';
import images from 'themes/images';
// eslint-disable-next-line no-unused-vars

type Props = {
  isShowPopup: boolean,
  onClose: Function,
  handleSubmitForm: Function,
  showTermService: Function,
};

const PopupSubscription = ({
  isShowPopup,
  onClose,
  handleSubmitForm,
  showTermService,
}: Props) => {
  const renderItem =
    listOptionSubscription &&
    listOptionSubscription.map((item) => (
      <div className="content-popup" key={item.id}>
        <img src={item.img} alt="" />
        <div className="content-popup__title">
          <p>{item.title}</p>
          <p>{item.label}</p>
        </div>
      </div>
    ));

  return (
    <ModalPopup
      isOpen={isShowPopup}
      handleClose={() => onClose()}
      handleSubmit={handleSubmitForm}
      customClass="w-100 modal-report modal-filter modal-subscription"
      isShowIconFilter
      isShowFooter
      textBtnRight={
        <div className="btn-payment-strawberry">
          <p>특별 할인 혜택으로 구독하기</p>
          <p>
            <span>월 9,900원</span>{' '}
            <img src={images.icon_nextpage} className="icon-nextpage" alt="" />{' '}
            월 7,500원
          </p>
        </div>
      }
      profile={images.icon_popup_payment}
    >
      <h3 className="title-filter title-left">딸기콩 멤버십 구독</h3>
      {renderItem}
      <div className="content-text">
        <div className="content-text__underline d-flex">
          <p>- </p>
          <span>무료 체험 기간 내 해지 시 요금은 청구되지 않습니다.</span>
        </div>
        <div className="content-text__underline d-flex">
          <p>- </p>
          <span>
            딸기콩 멤버십 정기 구독 비용은 월 9,900원이며 1개월 무료 이용
            이후부터 스토어에 등록된 결제수단으로 자동 결제됩니다.
          </span>
        </div>

        <div className="content-text__underline d-flex">
          <p>- </p>
          <span>해지를 원하실 경우 언제든 자동 갱신을 해지할 수 있습니다.</span>
        </div>
      </div>
      <div className="content-link">
        <span>딸기콩 멤버십 이용약관에 동의합니다.</span>
        <span onClick={showTermService} role="presentation">
          자세히 보기
        </span>
      </div>
    </ModalPopup>
  );
};

export default PopupSubscription;
