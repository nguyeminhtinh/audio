/* eslint-disable jsx-a11y/control-has-associated-label */
// @flow

import React, { useState, useEffect, memo } from 'react';
import MainLayout from 'layout/MainLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import IMAGES from 'themes/images';
import Button from 'components/Button';
// import ReactRecord from 'react-record';
import ModalPopup from 'components/Modal';
import SelectDropdown from 'components/Select';
import Input from 'components/Input';
import Loading from 'components/Loading';
import {
  toDoStartRecord,
  toDoPauseRecord,
  toDoStopRecord,
  toDoUploadRecord,
  toDoCheckRecordAuth,
  toDoAuthCheckPopup,
  toDoHideMusicPlayer,
  toDoShowMusicPlayer,
} from '../../../utils/Helpers';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type Props = {
  history: {
    go: Function,
  },
  match: {
    params: {
      id: string,
    },
  },
  getDetailRecordStudio: Function,
  dataDetailRecordStudio: Object,
  isProcessing: boolean,
  infoUser: Object,
};
const RecordStudio = ({
  history,
  match,
  getDetailRecordStudio,
  dataDetailRecordStudio,
  isProcessing,
  infoUser,
}: Props) => {
  const contentId = match.params.id;
  // const [loadImage, setLoadImage] = useState(true);
  const [isShowRecord, setIsShowRecord] = useState(false);
  const [isShowConfirmBack, setIsShowConfirmBack] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  // const [isShowLoading, setIsShowLoading] = useState(false);
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [counter, setCounter] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [status, setStatus] = useState('');
  const listItem = [
    { id: 1, value: 'Y', label: '공개' },
    { id: 2, value: 'N', label: '비공개' },
  ];

  const [dataSubmit, setDataSubmit] = useState({
    title: dataDetailRecordStudio?.contentsName,
    disclose: listItem && listItem[0],
    name: infoUser?.name,
  });

  const handleChange = (name, value) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  useEffect(() => {
    setDataSubmit({
      title: dataDetailRecordStudio?.contentsName,
      disclose: listItem && listItem[0],
      name: infoUser?.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetailRecordStudio]);

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
    if (document) {
      setTimeout(() => {
        setStatus(
          document &&
            (document.getElementById('valueRecord'): window.HTMLElement)
              .innerText
        );
      }, 1000);
    }
  }, [isCheck]);

  useEffect(() => {
    getDetailRecordStudio({ contentId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId]);

  const handleCheckRecord = () => {
    if (status === 'Y' && isCheck) {
      setIsShowRecord(true);
      setIsActive(true);
      toDoStartRecord();
    } else if (status === 'N') {
      setIsShowRecord(false);
      setIsActive(false);
      toDoAuthCheckPopup();
    }
  };

  useEffect(() => {
    handleCheckRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isCheck]);

  const dataSlide =
    dataDetailRecordStudio &&
    dataDetailRecordStudio.scenario &&
    dataDetailRecordStudio.scenario.split('||');

  const renderListSlide =
    dataSlide &&
    dataSlide.map((item, index) => {
      const styleBackground = {
        backgroundImage: `url(https://down.wjthinkbig.com${dataDetailRecordStudio.backgroundImg})`,
      };
      return (
        // eslint-disable-next-line react/no-array-index-key
        <SwiperSlide key={index}>
          <div
            className="box-slide"
            onClick={() => {}}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            style={styleBackground}
          >
            <div className="box-slide__title">{item}</div>
            {/* <div className="box-slide__image">
              <img
                src={
                  `https://down.wjthinkbig.com${dataDetailRecordStudio.backgroundImg}` ||
                  IMAGES.image_not_found
                }
                alt="Images"
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
              />
            </div> */}
          </div>
        </SwiperSlide>
      );
    });

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counters) => counters + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const handleSubmit = () => {
    const dataSaveRecord = {
      title: dataSubmit.title,
      usable: dataSubmit?.disclose?.value,
      nickName: dataSubmit.name,
      contentId,
    };
    toDoUploadRecord(JSON.stringify(dataSaveRecord));
    setIsShowModal(false);
    setIsShowRecord(false);
    setIsActive(false);
    setSecond('00');
    setMinute('00');
    setCounter(0);
  };
  // check back function
  const handleCheckBack = () => {
    if (isActive) {
      setIsActive(!isActive);
      setIsShowConfirmBack(true);
      toDoPauseRecord();
    } else {
      history.go(-1);
      toDoShowMusicPlayer();
    }
  };

  const handleCheckPause = () => {
    if (!isActive) {
      toDoStartRecord();
    } else {
      toDoPauseRecord();
    }
  };

  const handleCheckSave = () => {
    if (counter > 0) {
      setIsActive(false);
      toDoPauseRecord();
      setIsShowModal(true);
    }
  };

  return (
    <MainLayout
      customClass="record"
      titleHeader={dataDetailRecordStudio?.contentsName}
      isShowHeader
      isLink
      isShowIcon
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      {isProcessing ? (
        <Loading />
      ) : (
        <>
          <Swiper
            slidesPerView="auto"
            spaceBetween={9}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet(index, className) {
                return `<span class="${className}">${
                  index > 8 ? `${index + 1}` : `0${index + 1}`
                }</span>`;
              },
            }}
          >
            {renderListSlide}
          </Swiper>
          <div className="form-record">
            {isShowRecord ? (
              <Button
                customClass={`button-play-record ${isActive ? '' : 'stop'}`}
                onClick={() => {}}
              >
                <img
                  src={IMAGES.icon_save_record}
                  alt=""
                  className="icon-save"
                  onClick={() => handleCheckSave()}
                  role="presentation"
                />
                <div
                  className="time"
                  onClick={() => {
                    setIsActive(!isActive);
                    handleCheckPause();
                  }}
                  role="presentation"
                >
                  <span className="minute">{minute}</span>
                  <span>:</span>
                  <span className="second">{second}</span>
                </div>
                <div
                  className="button-close"
                  onClick={() => {
                    setIsShowRecord(false);
                    setIsActive(false);
                    setSecond('00');
                    setMinute('00');
                    setCounter(0);
                    toDoStopRecord();
                    // setIsShowLoading(false);
                  }}
                  role="presentation"
                >
                  <img
                    src={IMAGES.icon_close_record}
                    alt=""
                    className="icon-micro"
                  />
                </div>
              </Button>
            ) : (
              <Button
                customClass="button-record"
                onClick={() => {
                  setIsCheck(true);
                  toDoCheckRecordAuth();
                  handleCheckRecord();
                  // setIsShowLoading(true);
                }}
              >
                {/* {!isShowLoading && ( */}
                <img src={IMAGES.icon_micro} alt="" className="icon-micro" />
                {/* )} */}
                <p>녹음하기</p>
              </Button>
            )}
          </div>
        </>
      )}

      <ModalPopup
        isOpen={isShowModal}
        isShowFooter
        handleClose={() => setIsShowModal(false)}
        handleSubmit={handleSubmit}
        customClassButton="w-100"
        textBtnRight="완료"
        textBtnLeft="취소"
        isShowHeader
        isShowTwoBtn
        title="스튜디오북 녹음 저장하기"
      >
        <form className="popup-my">
          <div className="popup-group">
            <Input
              placeholder="오브레인 예술놀이 그림"
              type="text"
              label="제목"
              positionIcon="left"
              onChange={(e) => handleChange('title', e.target.value)}
              value={dataSubmit.title}
            />
          </div>
          <div className="popup-group">
            <SelectDropdown
              placeholder="공개"
              label="공개 여부"
              listItem={listItem}
              onChange={(e) => handleChange('disclose', e)}
              option={dataSubmit.disclose}
              isHideIconLock={false}
              isShowIconLock={
                dataSubmit.disclose && dataSubmit.disclose.value === 'Y'
                  ? // eslint-disable-next-line no-unneeded-ternary
                    true
                  : false
              }
            />
          </div>
          <div className="popup-group">
            <Input
              placeholder="딸기가 좋아"
              type="text"
              label="닉네임 설정"
              positionIcon="left"
              onChange={(e) => handleChange('name', e.target.value)}
              value={dataSubmit.name}
            />
          </div>
        </form>
      </ModalPopup>
      <ModalPopup
        isOpen={isShowConfirmBack}
        isShowFooter
        handleClose={() => {
          setIsShowConfirmBack(false);
          setIsActive(true);
          toDoPauseRecord();
        }}
        handleSubmit={() => {
          window.history.go(-1);
          toDoStopRecord();
        }}
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
          뒤로가기 시 녹음한 내용이 사라집니다.
          <br />
          정말 취소하시겠습니까?
        </div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(RecordStudio);
