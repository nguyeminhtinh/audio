// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import { toast, ToastContainer } from 'react-toastify';
import { Tabs, Tab } from 'react-bootstrap';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import Loading from 'components/Loading';
import NoData from 'components/NoData';
import ModalPopup from 'components/Modal';
import Lottie from 'react-lottie';
import ROUTERS from 'constants/router';
import series from '../../../assets/json/icon_series.json';
import {
  toDoSetMusicList,
  toDoAudioPlay,
  convertTime,
  toDoExternal,
  toDoShowMusicPlayer,
  toDoPurchase,
  toDoSetLike,
  toDoGetCurrentAudio,
  toDoOpenUrl,
  toDoShowPayment,
  checkPlatform,
} from '../../../utils/Helpers';
import TabDescriptionMusic from './tabDescriptionMusic';
import TabSeriesMusic from './tabSeriesMusic';
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
  getDataAudioBook: Function,
  match: {
    params: {
      id: string,
    },
  },
  dataAudioBookDetail: Object,
  getAudioBookSeries: Function,
  dataAudioBookSeries: Array<{
    productId: number,
    mediaType: any,
    productName: string,
    thumbnailUrl: string,
    duration: number,
    contentsUrl: string,
  }>,
  isProcessing: boolean,
  isProcessingSeries: boolean,
  history: {
    push: Function,
  },
  dataPlayerSeries: Array<{
    audioFile: string,
    seq: number,
  }>,
  type: string,
  likePlayer: Function,
  dataPlayers: Object,
  likeCount: number,
  actionLike: Function,
  setStatusPlay: Function,
  getKeySearchDetail: Function,
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
  isShowReview: boolean,
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Music = ({
  getDataAudioBook,
  match,
  dataAudioBookDetail,
  getAudioBookSeries,
  dataAudioBookSeries,
  isProcessing,
  isProcessingSeries,
  history,
  dataPlayerSeries,
  type,
  likePlayer,
  dataPlayers,
  likeCount,
  actionLike,
  setStatusPlay,
  getKeySearchDetail,
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
  isShowReview,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const productId = match.params.id;
  const defaultOption = {
    listAudioSelective: [],
  };
  const [audioOption, setAudioOption] = useState(
    defaultOption?.listAudioSelective
  );

  const [listAudio, setListAudio] = useState([]);
  const [activeLike, setActiveLike] = useState(
    dataAudioBookDetail?.audioBookDetail?.isLiked !== 'N' || false
  );
  const activePlay =
    dataAudioBookDetail?.audioBookDetail?.usable !== 'N' || false;
  const [activeTab, setActiveTab] = useState('tab1');
  const notify = () => toast.error('비디오북은 선택 듣기가 불가능합니다');
  const notifyUrl = () => toast.error('준비 중인 콘텐츠입니다.');
  const notifyReport = () => toast.error('신고가 접수 되었습니다. 감사합니다.');
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [pageScroll, setPageScroll] = useState(0);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const currentOS = checkPlatform();

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetData();
      if (infoUser.userType !== 'LOUNGE') {
        toDoGetCurrentAudio(productId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataAudioBook(productId);
    setActiveTab('tab1');
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

  // call api get list series music
  useEffect(() => {
    if (type === 'GET_DATA_AUDIO_BOOK_SUCCESS') {
      if (dataAudioBookDetail?.audioBookDetail?.groupId !== null) {
        getAudioBookSeries(
          dataAudioBookDetail?.audioBookDetail?.groupId,
          dataAudioBookDetail?.audioBookDetail?.mediaTypeId
        );
      }
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

  useEffect(() => {
    setActiveLike(
      dataAudioBookDetail?.audioBookDetail?.isLiked !== 'N' || false
    );
  }, [dataAudioBookDetail]);

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

  const handleShowPlayer = (value) => {
    if (value.contentsUrl !== null) {
      setStatusPlay({
        productId: [parseInt(value.productId, 10)],
        status: 'init',
      });
      const audioList = [];
      const data = {
        seq: value.productId,
        title: value.productName,
        thumbnail:
          value.thumbnailUrl ||
          'https://down.wjthinkbig.com//DDALGICONG/CONTENTS/THUMBNAIL/DEFAULT/BEAN.PNG',
        audioFile: value.contentsUrl,
        introTime: 0,
      };
      audioList.push(data);
      toDoSetMusicList(JSON.stringify(audioList));
      toDoAudioPlay();
    } else {
      notifyUrl();
    }
  };

  // handle change when choose audio
  const handleChangeOption = (value, audio) => {
    let listAudioId = [];
    let listDataAudio = [];
    if (audio.mediaType === '플레이북') {
      notify();
    } else if (audio.contentsUrl === null) {
      notifyUrl();
    } else {
      if (audioOption.length > 0 && audioOption.includes(value)) {
        listAudioId = audioOption.filter((item) => item !== value);
        listDataAudio = listAudio.filter((item) => item !== audio);
      } else if (!audioOption.includes(value)) {
        listAudioId = [...audioOption, value];
        listDataAudio = [...listAudio, audio];
      } else {
        listAudioId = audioOption;
        listDataAudio = listAudio;
      }
      setAudioOption(listAudioId);
      setListAudio(listDataAudio);
    }
  };

  const onSelect = (key) => {
    setActiveTab(key);
  };
  // switch page when click btn 전집 시리즈 구매하기
  const handleRouterBuy = (linkUrl) => {
    if (infoUser.userType === 'LOUNGE') {
      toDoExternal(linkUrl, 'N', 'Y');
    } else {
      toDoOpenUrl(linkUrl);
    }
  };

  const mapToDataPlayer =
    listAudio &&
    listAudio.map((items) => ({
      seq: items.productId,
      title: items.productName,
      thumbnail:
        items.thumbnailUrl ||
        'https://down.wjthinkbig.com//DDALGICONG/CONTENTS/THUMBNAIL/DEFAULT/BEAN.PNG',
      audioFile: items.contentsUrl,
      introTime: 0,
    }));

  // handle when click 선택 듣기
  const listPlayerSelective = () => {
    setStatusPlay({
      productId: audioOption,
      status: 'init',
    });
    toDoSetMusicList(JSON.stringify(mapToDataPlayer));
    toDoShowMusicPlayer();
    toDoAudioPlay();
    setAudioOption([]);
    setListAudio([]);
  };

  // handle when click 전체듣기
  const showPlayerAll = () => {
    let listAudioId = [];
    listAudioId = dataPlayerSeries.filter((item) => item.audioFile !== null);
    const listIdProduct = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = listAudioId.length; i < len; i++) {
      listIdProduct.push(listAudioId[i].seq);
    }
    if (listAudioId.length > 0) {
      toDoSetMusicList(JSON.stringify(dataPlayerSeries));
      toDoAudioPlay();
      setStatusPlay({
        productId: listIdProduct,
        status: 'init',
      });
    }
  };

  // handle when click 바로듣기
  const showPlayerPlayNow = () => {
    if (dataPlayers.audioFile !== null) {
      toDoSetMusicList(JSON.stringify([dataPlayers]));
      toDoAudioPlay();
      setStatusPlay({
        productId: [parseInt(productId, 10)],
        status: 'init',
      });
    } else {
      notifyUrl();
    }
  };

  const handleSetActiveTab = () => {
    setActiveTab('tab1');
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

  const handleCheckLike = () => {
    toDoSetLike(activeLike ? 'N' : 'Y', productId);
  };

  return (
    <MainLayout
      customClass=""
      titleHeader="뮤직"
      isShowHeader
      isLink
      isShowIcon
      isShowShare
      isShowIconHome
    >
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
      {isProcessing && pageScroll < 1 ? (
        <Loading />
      ) : (
        <div className="audioBook">
          {dataAudioBookDetail?.audioBookDetail ? (
            <>
              <div className="audioBook__top">
                <div
                  className={`audioBook__top__image ${
                    dataAudioBookDetail?.audioBookDetail?.thumbnailUrl
                      ? ''
                      : 'bg-non-img'
                  }`}
                >
                  <img
                    src={
                      `https://down.wjthinkbig.com${dataAudioBookDetail?.audioBookDetail?.thumbnailUrl}` ||
                      IMAGES.image_not_found
                    }
                    alt="img"
                    onError={(e) => {
                      if (loadImage) {
                        setLoadImage({
                          loadImage: false,
                        });
                        e.target.src = IMAGES.image_not_found;
                      }
                    }}
                  />
                </div>

                <div className="audioBook__top__content">
                  <h2>
                    {dataAudioBookDetail?.audioBookDetail?.productName}{' '}
                    {infoUser.userType !== 'LOUNGE' &&
                      dataAudioBookDetail?.audioBookDetail?.playable === 'Y' &&
                      dataAudioBookDetail?.audioBookDetail?.serviceTypeId !==
                        1 && <span>대여중</span>}
                  </h2>
                  <h3>{dataAudioBookDetail?.audioBookDetail?.groupName}</h3>
                  <p
                    className={`audioBook__top__content__writer ${
                      dataAudioBookDetail?.audioBookDetail?.artist
                        ? ''
                        : 'none-border'
                    }`}
                  >
                    {dataAudioBookDetail?.audioBookDetail?.artist
                      ? `아티스트 ${dataAudioBookDetail?.audioBookDetail?.artist}`
                      : ''}{' '}
                    {dataAudioBookDetail?.audioBookDetail?.label && (
                      <span>
                        {dataAudioBookDetail?.audioBookDetail?.label
                          ? `레이블 ${dataAudioBookDetail?.audioBookDetail?.label}`
                          : ''}
                      </span>
                    )}
                  </p>
                  <p className="audioBook__top__content__bookClub">
                    {dataAudioBookDetail?.audioBookDetail?.distributor}
                  </p>
                  <div className="audioBook__top__content__list-status">
                    <div className="audioBook__top__content__list-status--time">
                      <img src={IMAGES.iconTime} alt="" />
                      <p>
                        {dataAudioBookDetail &&
                          convertTime(
                            dataAudioBookDetail?.audioBookDetail?.duration
                          )}
                      </p>
                    </div>
                    <div className="audioBook__top__content__list-status--time view">
                      <img src={IMAGES.iconPlayMini} alt="" />
                      <p>
                        {dataAudioBookDetail &&
                          dataAudioBookDetail.playCount.toLocaleString('en')}
                      </p>
                    </div>
                    {/* <div className="audioBook__top__content__list-status--time favorite">
                      <img src={IMAGES.iconHeartMini} alt="" />
                      <p>{likeCount && likeCount.toLocaleString('en')}</p>
                    </div> */}
                  </div>
                  {infoUser.userType === 'LOCAL' &&
                    dataAudioBookDetail?.audioBookDetail?.bookclubUrl && (
                      <div
                        className="audioBook__top__content__getAll"
                        onClick={() =>
                          handleRouterBuy(
                            dataAudioBookDetail?.audioBookDetail?.bookclubUrl
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
                    dataAudioBookDetail?.audioBookDetail?.buyingUrl && (
                      <div
                        className="audioBook__top__content__getAll wongin-link"
                        onClick={() =>
                          handleRouterBuy(
                            dataAudioBookDetail?.audioBookDetail?.buyingUrl
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
              </div>
              <div className="audioBook__group-button">
                <Button
                  customClass={`button--primary ${
                    activeLike ? 'btn-active' : ''
                  }`}
                  onClick={() => {
                    likePlayer(productId);
                    handleCheckLike();
                  }}
                >
                  <img
                    src={activeLike ? IMAGES.iconHeartOn : IMAGES.iconHeartOff}
                    alt=""
                  />
                  <p>{likeCount && likeCount.toLocaleString('en')}</p>
                </Button>
                <Button
                  customClass={`button--primary ${
                    activePlay ? 'active-play' : ''
                  }`}
                  onClick={showPlayerPlayNow}
                >
                  <img
                    src={
                      activePlay ? IMAGES.iconPlayActive : IMAGES.iconPlayRMini
                    }
                    alt=""
                  />
                  <p>바로 듣기</p>
                </Button>
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

              <Tabs
                defaultActiveKey={activeTab}
                className="audioBook__tab"
                onSelect={(eventKey) => onSelect(eventKey)}
              >
                {(dataAudioBookDetail?.audioBookDetail?.description ||
                  (dataAudioBookDetail?.keywords?.length > 0 &&
                    dataAudioBookDetail?.linkeds?.length > 0)) && (
                  <Tab eventKey="tab1" title="정보">
                    <TabDescriptionMusic
                      listAudioBook={dataAudioBookDetail?.linkeds}
                      dataAudioBookDetail={dataAudioBookDetail}
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
                  eventKey={
                    dataAudioBookDetail?.audioBookDetail?.description ||
                    (dataAudioBookDetail?.keywords?.length > 0 &&
                      dataAudioBookDetail?.linkeds?.length > 0)
                      ? 'tab2'
                      : 'tab1'
                  }
                  title="시리즈"
                  disabled={
                    dataAudioBookDetail?.audioBookDetail?.groupId === null
                  }
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
                    <TabSeriesMusic
                      dataAudioBookSeries={dataAudioBookSeries}
                      handleChangeOption={handleChangeOption}
                      audioOption={audioOption}
                      handleSetAudio={() => {
                        setAudioOption([]);
                        setListAudio([]);
                      }}
                      listAudio={listAudio}
                      handleSetAudioAll={() => {
                        setListAudio([]);
                        showPlayerAll();
                        setAudioOption([]);
                      }}
                      history={history}
                      handleSetActiveTab={handleSetActiveTab}
                      listPlayerSelective={listPlayerSelective}
                      handleShowPlayer={handleShowPlayer}
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
            </>
          ) : (
            <NoData text="공지사항이 없습니다." />
          )}
        </div>
      )}
      <ModalPopup
        isOpen={isShowConfirm}
        handleClose={() => setIsShowConfirm(false)}
        handleSubmit={() => setIsShowConfirm(false)}
        customClass="w-100"
        isShowFooter
        isShowTwoBtn
        customClassButton="w-100"
        textBtnRight="확인"
        textBtnLeft="취소"
      >
        신고사유와 내용을 모두 입력해주세요
      </ModalPopup>
      <ModalPopup
        isOpen={isShowDelete}
        handleClose={() => setIsShowDelete(false)}
        handleSubmit={() => setIsShowDelete(false)}
        customClass="w-100"
        isShowFooter
        // isShowTwoBtn
        customClassButton="w-100"
        textBtnRight="확인"
        textBtnLeft="취소"
      >
        등록하신 리뷰를 삭제하시겠습니까?
      </ModalPopup>
    </MainLayout>
  );
};
export default memo<Props>(Music);
