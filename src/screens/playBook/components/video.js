/* eslint-disable import/no-named-as-default-member */
// @flow

import React, { useState, memo, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Player, Shortcut } from 'video-react';
import MainLayout from 'layout/MainLayout';
import ROUTERS from 'constants/router';
import Button from 'components/Button';
import Loading from 'components/Loading';
import NoData from 'components/NoData';
import ModalPopup from 'components/Modal';
import IMAGES from 'themes/images';
import { Tabs, Tab } from 'react-bootstrap';
import Lottie from 'react-lottie';
import series from '../../../assets/json/icon_series.json';
import Introduce from './introduce';
import ItemSeries from './itemSeries';
import {
  toDoHideMusicPlayer,
  toDoShowMusicPlayer,
  toDoExternal,
  convertTime,
  toDoPurchase,
  toDoPlayVideo,
  toDoOpenUrl,
  toDoShowPayment,
  checkPlatform,
} from '../../../utils/Helpers';
import PopupSubscription from './popupSubscription';

const gifSeries = {
  loop: false,
  autoplay: true,
  animationData: series,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

type Props = {
  match: {
    params: {
      id: string,
    },
  },
  getDataAudioBook: Function,
  dataAudioBookDetail: Object,
  history: {
    push: Function,
    go: Function,
  },
  isProcessing: boolean,
  getAudioBookSeries: Function,
  dataAudioBookSeries: Array<{
    productId: number,
    materialName: string,
    thumbnailUrl: string,
  }>,
  isProcessingSeries: boolean,
  type: string,
  likePlayer: Function,
  autoPlay: boolean,
  setStatusPlay: Function,
  actionLike: Function,
  likeCount: number,
  getContentVideo: Function,
  contentsVideoUrl: string,
  setAutoPlay: Function,
  getKeySearchDetail: Function,
  checkPlay: Function,
  statusVideo: string,
  getListReview: Function,
  avgRate: number,
  listReview: Array<{
    id: number,
    name: string,
    rate: number,
    iconImg: string,
    comment: string,
    reviewId: number,
    createdAt: string,
    userId: number,
  }>,
  saveReview: Function,
  getListTypeReport: Function,
  listTypeReport: Array<{ id: number, report: string }>,
  saveReport: Function,
  infoUser: Object,
  typeReport: number,
  listMyReview: Array<{
    id: number,
    name: string,
    rate: number,
    iconImg: string,
    comment: string,
    reviewId: number,
    createdAt: string,
    userId: number,
  }>,
  totalReview: number,
  resetData: Function,
  deleteReview: Function,
  checkAudioPlayerValid: Function,
  dataDetailVideo: Object,
  isShowReview: boolean,
};

const PlayBook = ({
  match,
  getDataAudioBook,
  dataAudioBookDetail,
  history,
  isProcessing,
  getAudioBookSeries,
  dataAudioBookSeries,
  isProcessingSeries,
  type,
  likePlayer,
  autoPlay,
  actionLike,
  likeCount,
  setStatusPlay,
  getContentVideo,
  contentsVideoUrl,
  setAutoPlay,
  getKeySearchDetail,
  checkPlay,
  statusVideo,
  getListReview,
  avgRate,
  listReview,
  saveReview,
  getListTypeReport,
  listTypeReport,
  saveReport,
  infoUser,
  typeReport,
  listMyReview,
  totalReview,
  resetData,
  deleteReview,
  checkAudioPlayerValid,
  dataDetailVideo,
  isShowReview,
}: Props) => {
  const productId = match.params.id;
  const playerRef = useRef({});
  const [activeLike, setActiveLike] = useState(
    dataAudioBookDetail?.audioBookDetail?.isLiked !== 'N' || false
  );
  const activePlay =
    dataAudioBookDetail?.audioBookDetail?.usable !== 'N' || false;
  const [statusPlayVideo, setStatusPlayVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('introduce');
  const [isPause, setIsPause] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataDetail, setDataDetail] = useState(dataAudioBookDetail || []);
  const [dataSeries, setDataSeries] = useState(dataAudioBookSeries);
  const [sequenceVideo, setSequenceVideo] = useState(0);
  const [hasStart, setHasStart] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalWiFi, setIsShowModalWiFi] = useState(false);
  const notifyUrl = () => toast.error('준비 중인 콘텐츠입니다.');
  const notifyReport = () => toast.error('신고가 접수 되었습니다. 감사합니다.');
  const [pageScroll, setPageScroll] = useState(0);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const currentOS = checkPlatform();

  useEffect(() => {
    const handleOrientationChange = () =>
      window.addEventListener('orientationchange', handleOrientationChange);
    return () =>
      window.removeEventListener('orientationchange', handleOrientationChange);
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
  // play video when click button play
  const handlePlayVideo = () => {
    if (dataDetail?.audioBookDetail?.contentsUrl !== null) {
      if (
        statusVideo === 'N' &&
        !statusPlayVideo &&
        infoUser?.onlyWifi === 'N'
      ) {
        setIsShowModal(true);
      } else if (statusVideo === 'N' && statusPlayVideo) {
        setIsShowModal(false);
      }
      if (infoUser.onlyWifi === 'Y') {
        setIsShowModalWiFi(true);
      }
      if (statusPlayVideo || statusVideo === 'Y') {
        if (isPause && infoUser.onlyWifi === 'N') {
          console.log(1);
          const player =
            playerRef && playerRef.current ? playerRef.current : null;
          player && player.play();
          if (infoUser.userType !== 'LOUNGE') {
            toDoPlayVideo(true);
          }
        }
      }
    } else {
      notifyUrl();
    }
  };

  // handle load video when next video
  const handleLoadVideo = () => {
    if (dataDetail?.audioBookDetail?.contentsUrl !== null) {
      if (isPause) {
        const player =
          playerRef && playerRef.current ? playerRef.current : null;
        player && player.load();
      }
    } else {
      notifyUrl();
    }
  };

  // call api get data video
  useEffect(() => {
    getDataAudioBook(productId);
  }, [getDataAudioBook, productId]);

  // call api get list review
  useEffect(() => {
    resetData();
    getListReview(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // call api get list type report
  useEffect(() => {
    getListTypeReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get list series video
  useEffect(() => {
    if (type === 'GET_DATA_AUDIO_BOOK_SUCCESS') {
      if (dataAudioBookDetail?.audioBookDetail?.groupId !== null) {
        getAudioBookSeries(
          dataAudioBookDetail?.audioBookDetail?.groupId,
          dataAudioBookDetail?.audioBookDetail?.mediaTypeId
        );
      }
      checkAudioPlayerValid({
        productId: [productId],
        serviceTypeId: dataAudioBookDetail?.audioBookDetail?.serviceTypeId,
      });
    }
    if (type === 'SAVE_REVIEW_SUCCESS' || type === 'SAVE_REPORT_SUCCESS') {
      getListReview(productId);
      getDataAudioBook(productId);
      resetData();
    }
    if (type === 'SAVE_REPORT_SUCCESS') {
      notifyReport();
      resetData();
    }
    if (type === 'DELETE_REVIEW_SUCCESS') {
      getDataAudioBook(productId);
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // call api check video
  useEffect(() => {
    checkPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set data when call api success
  useEffect(() => {
    setActiveLike(
      dataAudioBookDetail?.audioBookDetail?.isLiked !== 'N' || false
    );
    setDataDetail(dataAudioBookDetail);
  }, [dataAudioBookDetail, dataAudioBookSeries]);

  useEffect(() => {
    setDataSeries(dataAudioBookSeries);
  }, [dataAudioBookSeries]);

  useEffect(() => {
    if (type === 'LIKE_PLAYER_SUCCESS') {
      setActiveLike(!activeLike);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // action check plus like or minus like
  useEffect(() => {
    if (type === 'LIKE_PLAYER_SUCCESS' && activeLike === false) {
      actionLike('plus');
    }
    if (type === 'LIKE_PLAYER_SUCCESS' && activeLike) {
      actionLike('minus');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  // call api get content video
  useEffect(() => {
    if (dataDetailVideo?.contentsUrl !== null) {
      getContentVideo({
        contentsUrl: dataDetailVideo?.contentsUrl,
      });
    }
  }, [dataDetailVideo, getContentVideo]);

  useEffect(() => {
    if (infoUser.userType !== 'LOUNGE') {
      if (!isPause) {
        toDoPlayVideo(true);
      } else {
        toDoPlayVideo(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPause]);

  // custom action video of library react player
  const handleStateChange = (state) => {
    setIsPause(state.paused);
    setHasStart(state.hasStarted);
    setIsFullScreen(state.isFullscreen);
    setPlayTime(Math.floor(state.currentTime));
  };

  // switch hide or show when fullscreen
  useEffect(() => {
    if (isFullScreen === false) {
      toDoShowMusicPlayer();
    } else {
      toDoHideMusicPlayer();
    }
  }, [isFullScreen]);

  // call function play when click 재생 of popup
  useEffect(() => {
    if (statusPlayVideo) {
      handlePlayVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPlayVideo]);

  // show popup when status play = true and statusVideo = N
  useEffect(() => {
    if (statusVideo === 'N' && autoPlay) {
      setIsShowModal(true);
    }
    if (autoPlay && infoUser.onlyWifi === 'N') {
      setIsPause(false);
      handlePlayVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, statusVideo]);

  // call api count views when play video
  useEffect(() => {
    if (hasStart && infoUser.onlyWifi === 'N') {
      setStatusPlay({
        productId: [parseInt(productId, 10)],
        status: 'init',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStart, productId]);

  // handle run library player
  useEffect(() => {
    const player = playerRef && playerRef.current ? playerRef.current : null;
    player && player.subscribeToStateChange(handleStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRef]);

  const onSelect = (key) => {
    setActiveTab(key);
  };
  // filter video active in list series video
  useEffect(() => {
    if (dataSeries?.length > 0) {
      const ArrayActive =
        dataSeries &&
        dataSeries.filter(
          (items) => items.productId === dataDetail?.audioBookDetail?.productId
        );

      const indexVideo = dataSeries && dataSeries.indexOf(ArrayActive[0]);
      setSequenceVideo(indexVideo);
    }
  }, [dataDetail, dataSeries]);

  // next or prev video when click button
  const handleActionPlayVideo = (item) => {
    const idVideo = dataSeries && dataSeries[item].productId;
    history.push(`${ROUTERS.PLAY_BOOK}/${idVideo}`);
    handleLoadVideo();
    setAutoPlay(false);
  };

  // switch page when click btn 전집 시리즈 구매하기
  const handleRouterBuy = (linkUrl) => {
    if (infoUser.userType === 'LOUNGE') {
      toDoExternal(linkUrl, 'N', 'Y');
    } else {
      toDoOpenUrl(linkUrl);
    }
  };

  const handleSetActiveTab = () => {
    setActiveTab('introduce');
    setAutoPlay(false);
  };

  const handleLoadMore = (page) => {
    setPageScroll(page);
    getListReview(productId, { page });
  };

  const handleClosePopup = () => {
    setIsShowPopup(false);
  };

  const handlePayment = () => {
    const data = {
      beanId: dataAudioBookDetail?.audioBookDetail?.productId,
      inAppPurchaseId:
        dataAudioBookDetail.audioBookDetail.contentsPrice === 1200
          ? 'product_1200'
          : 'product_2500',
    };
    toDoPurchase(JSON.stringify(data));
  };

  const handleSubmitForm = () => {
    setIsShowPopup(false);
    const data = {
      beanId: 0,
      inAppPurchaseId: 'subscription_7900',
    };
    toDoPurchase(JSON.stringify(data));
  };

  const showTermService = () => {
    history.push(ROUTERS.TERMS);
  };

  const handleCheckBack = () => {
    if (infoUser.userType !== 'LOUNGE') {
      toDoPlayVideo(false);
    }
    history.go(-1);
  };

  useEffect(() => {
    if (dataDetailVideo?.playable === 'N' && playTime >= 30) {
      const player = playerRef && playerRef.current ? playerRef.current : null;
      player && player.pause();
      player && player.load();
      setAutoPlay(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playTime]);

  useEffect(() => {
    if (!isFullScreen) {
      window.scrollTo(-100, 0);
    }
  }, [isFullScreen]);

  const handleCheckPlay = () => {
    setIsPause(false);
    handlePlayVideo();
    setAutoPlay(true);
  };

  return (
    <MainLayout
      customClass=""
      titleHeader="플레이북 상세"
      isShowHeader
      isLink
      isShowShare
      isShowIcon
      isShowIconHome
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      <div
        className={`player-box ${dataDetail?.audioBookDetail ? '' : 'd-none'} ${
          infoUser.onlyWifi === 'Y' ? 'disable-play' : ''
        }`}
      >
        <Player
          // playsInline
          poster={`https://down.wjthinkbig.com${dataDetail?.audioBookDetail?.thumbnailUrl}`}
          ref={playerRef}
          src={contentsVideoUrl}
          aspectRatio={`${isFullScreen ? '9:16' : '16:9'}`}
          fluid="true"
          autoPlay={statusVideo === 'Y' && autoPlay}
        >
          {isFullScreen && (
            <div
              className={`action-player${
                isFullScreen && isPause ? '--full-screen' : ' d-none'
              }`}
            >
              <img
                src={IMAGES.icon_prev_video}
                alt=""
                className={`action-player__prev ${
                  sequenceVideo === 0 ? 'd-none' : ''
                }`}
                onClick={() => handleActionPlayVideo(sequenceVideo - 1)}
                role="presentation"
              />
              <img
                src={IMAGES.icon_player}
                alt=""
                className="action-player__play"
                onClick={
                  !(
                    dataDetailVideo?.playable === 'N' &&
                    playTime === 30 &&
                    infoUser.onlyWifi === 'N'
                  ) && handlePlayVideo
                }
                role="presentation"
              />
              <img
                src={IMAGES.icon_next_video}
                alt=""
                className={`action-player__next ${
                  sequenceVideo + 1 === dataSeries?.length ? 'd-none' : ''
                }`}
                onClick={() => handleActionPlayVideo(sequenceVideo + 1)}
                role="presentation"
              />
              <Shortcut clickable dblclickable={false} />
            </div>
          )}
        </Player>
        <div className={`action-player  ${isPause ? '' : 'd-none'}`}>
          <img
            src={IMAGES.icon_prev_video}
            alt=""
            className={`action-player__prev ${
              sequenceVideo === 0 ? 'd-none' : ''
            }`}
            onClick={() => handleActionPlayVideo(sequenceVideo - 1)}
            role="presentation"
          />
          <img
            src={IMAGES.icon_player}
            alt=""
            className="action-player__play"
            onClick={
              !(
                dataDetailVideo?.playable === 'N' &&
                playTime === 30 &&
                infoUser.onlyWifi === 'N'
              ) && handleCheckPlay
            }
            role="presentation"
          />
          <img
            src={IMAGES.icon_next_video}
            alt=""
            className={`action-player__next ${
              sequenceVideo + 1 === dataSeries?.length ? 'd-none' : ''
            }`}
            onClick={() => handleActionPlayVideo(sequenceVideo + 1)}
            role="presentation"
          />
        </div>
      </div>
      {isProcessing && pageScroll < 1 ? (
        <Loading />
      ) : (
        <div className="playBook">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {dataDetail?.audioBookDetail ? (
            <>
              <div className="wrapper-content">
                <div className="info">
                  <div className="info--title">
                    {/* <span>[5~6권]</span> */}
                    {dataDetail?.audioBookDetail?.materialName}
                  </div>
                  <div className="info--group-name">
                    {dataDetail?.audioBookDetail?.groupName}
                  </div>
                  <div className="info--sub">
                    <ul>
                      <li
                        className={`${
                          dataDetail?.audioBookDetail?.writer
                            ? ''
                            : 'none-border'
                        }`}
                      >
                        {dataDetail?.audioBookDetail?.writer
                          ? `글 ${dataDetail?.audioBookDetail?.writer} `
                          : ''}
                      </li>
                      <li
                        className={`${
                          dataDetail?.audioBookDetail?.writer
                            ? ''
                            : 'none-border'
                        }`}
                      >
                        {dataDetail?.audioBookDetail?.painter
                          ? `그림 ${dataDetail?.audioBookDetail?.painter}`
                          : ''}
                      </li>
                      <li>{dataDetail?.audioBookDetail?.publisher}</li>
                    </ul>
                  </div>
                </div>

                <div className="info-follow d-flex flex-column">
                  <div className="info-follow--count">
                    <ul className="d-flex align-items-center">
                      <li className="d-flex align-items-center">
                        <img src={IMAGES.iconTime} alt="" />
                        {convertTime(
                          dataAudioBookDetail?.audioBookDetail?.duration
                        )}
                      </li>
                      <li className="d-flex align-items-center">
                        <img src={IMAGES.iconPlayMini} alt="" />
                        {dataDetail &&
                          dataDetail.playCount.toLocaleString('en')}
                      </li>
                      {/* <li className="d-flex align-items-center">
                        <img src={IMAGES.iconHeartMini} alt="" />
                        {likeCount && likeCount.toLocaleString('en')}
                      </li> */}
                    </ul>
                  </div>
                  {infoUser.userType === 'LOCAL' &&
                    dataDetail?.audioBookDetail?.bookclubUrl && (
                      <div
                        className="audioBook__top__content__getAll"
                        onClick={() =>
                          handleRouterBuy(
                            dataDetail?.audioBookDetail?.bookclubUrl
                          )
                        }
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={0}
                      >
                        <p>이 시리즈 구매하기</p>
                        <Lottie
                          options={gifSeries}
                          isStopped={false}
                          isPaused={false}
                        />
                        <img src={IMAGES.iconArrowMini} alt="" />
                      </div>
                    )}
                  {infoUser.userType === 'LOUNGE' &&
                    dataDetail?.audioBookDetail?.buyingUrl && (
                      <div
                        className="audioBook__top__content__getAll wongin-link"
                        onClick={() =>
                          handleRouterBuy(
                            dataDetail?.audioBookDetail?.buyingUrl
                          )
                        }
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={0}
                      >
                        <p>시리즈 구매하기</p>
                        <img
                          src={IMAGES.icon_wongin}
                          alt=""
                          className="icon-series"
                        />
                        <img src={IMAGES.iconArrowMini} alt="" />
                      </div>
                    )}
                </div>
                <div className="audioBook__group-button d-flex align-items-center pl-0 pr-0">
                  <Button
                    customClass={`button--primary ${
                      activeLike ? 'btn-active' : ''
                    }`}
                    onClick={() => likePlayer(productId)}
                  >
                    <img
                      src={
                        activeLike ? IMAGES.iconHeartOn : IMAGES.iconHeartOff
                      }
                      alt=""
                    />
                    <p>{likeCount && likeCount.toLocaleString('en')}</p>
                  </Button>
                  <Button
                    customClass={`button--primary ${
                      activePlay ? 'active-play' : ''
                    }`}
                    onClick={() => {
                      handlePlayVideo();
                    }}
                    isDisabled={!activePlay}
                  >
                    <img
                      src={
                        activePlay
                          ? IMAGES.iconPlayActive
                          : IMAGES.iconPlayRMini
                      }
                      alt=""
                    />
                    <p>바로보기</p>
                  </Button>
                </div>
              </div>
              {infoUser.userType !== 'LOUNGE' &&
                ((dataAudioBookDetail?.audioBookDetail?.playable === 'Y' &&
                  dataAudioBookDetail?.audioBookDetail?.serviceTypeId === 3) ||
                  (dataAudioBookDetail?.audioBookDetail?.serviceTypeId === 2 &&
                    infoUser?.subscribe === 'NONE' &&
                    dataAudioBookDetail?.audioBookDetail?.playable === 'Y' && (
                      <p className="expiration">
                        * 대여 만료일:{' '}
                        {dataAudioBookDetail?.audioBookDetail?.expiredDate}
                      </p>
                    )))}
              {infoUser.userType !== 'LOUNGE' &&
                dataAudioBookDetail?.audioBookDetail?.playable === 'N' && (
                  <div className="group-box-payment">
                    {dataAudioBookDetail?.audioBookDetail?.serviceTypeId !==
                      1 &&
                      infoUser?.subscribe === 'NONE' && (
                        <div
                          className="group-box-payment__item box-custom"
                          onClick={handlePayment}
                          role="button"
                          tabIndex={0}
                          onKeyDown={() => {}}
                        >
                          <div className="group-box-payment__item__left">
                            <h3>대여</h3>
                            <p>
                              <span className="delete">W</span>
                              {dataAudioBookDetail &&
                                dataAudioBookDetail.audioBookDetail &&
                                dataAudioBookDetail.audioBookDetail
                                  .contentsPrice &&
                                dataAudioBookDetail.audioBookDetail.contentsPrice.toLocaleString(
                                  'en'
                                )}
                            </p>
                          </div>
                          <div className="group-box-payment__item__right">
                            <img src={IMAGES.icon_arrow_payment} alt="" />
                          </div>
                        </div>
                      )}
                    {dataAudioBookDetail?.audioBookDetail?.serviceTypeId ===
                      3 &&
                      infoUser?.subscribe === 'SUBSCRIPTION' && (
                        <div
                          className="group-box-payment__item box-custom"
                          onClick={handlePayment}
                          role="button"
                          tabIndex={0}
                          onKeyDown={() => {}}
                        >
                          <div className="group-box-payment__item__left">
                            <h3>대여</h3>
                            <p>
                              <span className="delete">W</span>
                              {dataAudioBookDetail &&
                                dataAudioBookDetail.audioBookDetail &&
                                dataAudioBookDetail.audioBookDetail
                                  .contentsPrice &&
                                dataAudioBookDetail.audioBookDetail.contentsPrice.toLocaleString(
                                  'en'
                                )}
                            </p>
                          </div>
                          <div className="group-box-payment__item__right">
                            <img src={IMAGES.icon_arrow_payment} alt="" />
                          </div>
                        </div>
                      )}

                    {dataAudioBookDetail?.audioBookDetail?.serviceTypeId ===
                      2 &&
                      infoUser?.subscribe === 'NONE' && (
                        <div
                          className="group-box-payment__item"
                          onClick={() =>
                            currentOS.iphone
                              ? toDoShowPayment()
                              : setIsShowPopup(true)
                          }
                          role="button"
                          tabIndex={0}
                          onKeyDown={() => {}}
                        >
                          <div className="group-box-payment__item__free">
                            첫 달 구독료 무료!
                          </div>
                          <div className="group-box-payment__item__left">
                            <h3>딸기콩 회원 대여</h3>
                            <div className="d-flex align-items-center">
                              <p className="underline">
                                <span className="delete">W</span>
                                9,900
                              </p>
                              <img
                                className="icon-next"
                                src={IMAGES.iconArrowMiniRed}
                                alt=""
                              />
                              <p>
                                <span className="delete">W</span>0
                              </p>
                            </div>
                          </div>
                          <div className="group-box-payment__item__right">
                            <img src={IMAGES.iconArrowMiniRed} alt="" />
                          </div>
                        </div>
                      )}
                  </div>
                )}

              <div className="wrapper-tab">
                <Tabs
                  defaultActiveKey={activeTab}
                  onSelect={(eventKey) => onSelect(eventKey)}
                >
                  {(dataDetail?.audioBookDetail?.description ||
                    (dataDetail?.keywords?.length > 0 &&
                      dataDetail?.linkeds?.length > 0)) && (
                    <Tab eventKey="introduce" title="정보">
                      <Introduce
                        dataAudioBookDetail={dataDetail}
                        history={history}
                        getKeySearchDetail={getKeySearchDetail}
                        listItemReport={listTypeReport}
                        avgRate={avgRate}
                        listReview={listReview}
                        saveReview={saveReview}
                        saveReport={saveReport}
                        infoUser={infoUser}
                        typeReport={typeReport}
                        listMyReview={listMyReview}
                        totalReview={totalReview}
                        handleLoadMore={handleLoadMore}
                        deleteReview={deleteReview}
                        type={type}
                        getListReview={getListReview}
                        resetData={resetData}
                        isShowReview={isShowReview}
                      />
                    </Tab>
                  )}
                  <Tab
                    // eventKey="series"
                    eventKey={
                      dataDetail?.audioBookDetail?.description ||
                      (dataDetail?.keywords?.length > 0 &&
                        dataDetail?.linkeds?.length > 0)
                        ? 'series'
                        : 'introduce'
                    }
                    title={`시리즈(${
                      dataDetail?.audioBookDetail?.groupId === null ||
                      dataAudioBookSeries?.length === undefined
                        ? 0
                        : dataAudioBookSeries &&
                          dataAudioBookSeries.length.toLocaleString('en')
                    })`}
                    disabled={dataDetail?.audioBookDetail?.groupId === null}
                    tabClassName={
                      dataAudioBookDetail?.audioBookDetail?.description ||
                      (dataAudioBookDetail?.keywords?.length > 0 &&
                        dataAudioBookDetail?.linkeds?.length > 0)
                        ? ''
                        : 'w-100'
                    }
                  >
                    {isProcessingSeries ? (
                      <Loading />
                    ) : (
                      <ItemSeries
                        dataVideo={dataAudioBookSeries}
                        history={history}
                        handleSetActiveTab={handleSetActiveTab}
                      />
                    )}
                  </Tab>
                </Tabs>
                <PopupSubscription
                  isShowPopup={isShowPopup}
                  onClose={handleClosePopup}
                  handleSubmitForm={handleSubmitForm}
                  showTermService={showTermService}
                />
              </div>
            </>
          ) : (
            <NoData text="공지사항이 없습니다." />
          )}
        </div>
      )}

      <ModalPopup
        isOpen={isShowModal}
        isShowFooter
        handleClose={() => setIsShowModal(false)}
        handleSubmit={() => {
          setStatusPlayVideo(true);
          setIsShowModal(false);
        }}
        customClassButton="w-100"
        isShowTwoBtn
        textBtnRight="재생"
        textBtnLeft="취소"
        isShowHeader
        title="알림"
      >
        <div className="title-content">
          모바일 데이터 사용시
          <br />
          과도한 요금이 부과될 수 있습니다.
          <br />
          그래도 재생하시겠습니까?
          <br />
          (Wi-Fi 사용을 권장 드립니다.)
        </div>
      </ModalPopup>
      <ModalPopup
        isOpen={isShowModalWiFi}
        isShowFooter
        handleClose={() => setIsShowModalWiFi(false)}
        handleSubmit={() => {
          setIsShowModalWiFi(false);
        }}
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">
          Wi-Fi 연결 시에만 플레이북 재생을 하도록 <br /> 설정하게 되어있습니다.
          <p
            className="link-setting"
            onClick={() => {
              history.push(ROUTERS.MY_PAGE);
              window.localStorage.removeItem('showWiFi');
            }}
            role="presentation"
          >
            재설정하러 가기
          </p>
        </div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(PlayBook);
