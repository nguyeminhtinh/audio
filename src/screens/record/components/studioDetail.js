// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import Loading from 'components/Loading';
import IMAGES from 'themes/images';
import { Tabs, Tab } from 'react-bootstrap';
import Button from 'components/Button';
import Introduce from './itemTab/TabIntroduce';
import ItemSeries from './itemTab/TabSeries';
import {
  convertTime,
  toDoSetStudioMusicList,
  toDoSetLike,
  toDoGetCurrentAudio,
} from '../../../utils/Helpers';
import ModalReport from '../../playBook/components/modalReport';

type Props = {
  match: {
    params: {
      id: string,
    },
  },
  history: {
    push: Function,
  },
  getDetailPlayStudio: Function,
  likeCount: number,
  dataDetailPlayStudio: Object,
  getListReviewStudio: Function,
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
  saveReviewStudio: Function,
  type: string,
  infoUser: Object,
  isProcessing: boolean,
  resetDataRecord: Function,
  getListTypeReport: Function,
  listTypeReport: Array<{ id: number, report: string }>,
  deleteReviewStudio: Function,
  saveReport: Function,
  likeDetailStudio: Function,
  actionLike: Function,
  getListSeriesStudio: Function,
  listSeriesStudio: Function,
  setStatusPlayRecord: Function,
  isShowReviewStudio: boolean,
};

const PlayBook = ({
  history,
  getDetailPlayStudio,
  match,
  likeCount,
  dataDetailPlayStudio,
  getListReviewStudio,
  listMyReview,
  totalReview,
  avgRate,
  listReview,
  saveReviewStudio,
  type,
  infoUser,
  isProcessing,
  resetDataRecord,
  getListTypeReport,
  listTypeReport,
  deleteReviewStudio,
  saveReport,
  likeDetailStudio,
  actionLike,
  getListSeriesStudio,
  listSeriesStudio,
  setStatusPlayRecord,
  isShowReviewStudio,
}: Props) => {
  const productId = match.params.id;
  const [loadImage, setLoadImage] = useState(true);
  const [activeTab, setActiveTab] = useState('introduce');
  const [pageScroll, setPageScroll] = useState(0);
  const [activeLike, setActiveLike] = useState(
    dataDetailPlayStudio?.studioBookDetail?.isLiked !== 'N' || false
  );
  const defaultOption = {
    listAudioSelective: [],
  };
  const [audioOption, setAudioOption] = useState(
    defaultOption?.listAudioSelective
  );
  const [listAudio, setListAudio] = useState([]);
  const activePlay =
    dataDetailPlayStudio?.studioBookDetail?.usable !== 'N' || false;
  const [isShowModalReport, setIsShowModalReport] = useState(false);

  useEffect(() => {
    if (type === 'GET_DETAIL_PLAY_STUDIO_SUCCESS') {
      if (dataDetailPlayStudio?.studioBookDetail?.userId !== null) {
        getListSeriesStudio(dataDetailPlayStudio?.studioBookDetail?.userId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, type]);

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetDataRecord();
      toDoGetCurrentAudio(productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get list type report
  useEffect(() => {
    getListTypeReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDetailPlayStudio(parseInt(productId, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    getListReviewStudio(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (
      type === 'SAVE_REVIEW_STUDIO_SUCCESS' ||
      type === 'DELETE_REVIEW_STUDIO_SUCCESS'
    ) {
      getListReviewStudio(productId);
      resetDataRecord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // action check plus like or minus like
  useEffect(() => {
    if (type === 'LIKE_DETAIL_STUDIO_SUCCESS') {
      setActiveLike(!activeLike);
    }
    if (type === 'LIKE_DETAIL_STUDIO_SUCCESS' && !activeLike) {
      actionLike('plus');
    }
    if (type === 'LIKE_DETAIL_STUDIO_SUCCESS' && activeLike) {
      actionLike('minus');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    setActiveLike(
      dataDetailPlayStudio?.studioBookDetail?.isLiked !== 'N' || false
    );
  }, [dataDetailPlayStudio, listReview]);

  // handle change when choose audio
  const handleChangeOption = (value, audio) => {
    let listAudioId = [];
    let listDataAudio = [];
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
  };

  const onSelect = (key) => {
    setActiveTab(key);
  };

  const handleSetActiveTab = () => {
    setActiveTab('introduce');
  };

  const handleLoadMore = (page) => {
    setPageScroll(page);
    getListReviewStudio(productId, { page });
  };

  const handlePlayAudio = (item) => {
    const listId = [];
    listId.push(item);
    toDoSetStudioMusicList(listId);
    setStatusPlayRecord({
      productId: listId,
      status: 'init',
    });
  };

  const listPlayerSelective = () => {
    toDoSetStudioMusicList(audioOption);
    setStatusPlayRecord({
      productId: audioOption,
      status: 'init',
    });
    setAudioOption([]);
    setListAudio([]);
  };

  const showPlayerAll = () => {
    const listIdProduct = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = listSeriesStudio.length; i < len; i++) {
      listIdProduct.push(listSeriesStudio[i].id);
    }
    toDoSetStudioMusicList(listIdProduct);
    setStatusPlayRecord({
      productId: listIdProduct,
      status: 'init',
    });
  };

  const showPlayerPlayNow = (item) => {
    const listId = [];
    listId.push(item);
    toDoSetStudioMusicList(listId);
    setStatusPlayRecord({
      productId: listId,
      status: 'init',
    });
  };

  const sendDataPopup = (dataReport) => {
    if (dataReport.content.length === 0) {
      setIsShowModalReport(false);
    } else {
      setIsShowModalReport(false);
      saveReport({
        contents: dataReport.content,
        tbReportCategoryId: dataReport.idReport,
        tbTargetId: productId,
        tbTypeId: 1,
      });
    }
  };

  return (
    <MainLayout
      customClass=""
      titleHeader="스튜디오북 상세"
      isShowHeader
      isLink
      isShowShare
      isShowIcon
      isShowIconHome
    >
      {isProcessing && pageScroll < 1 ? (
        <Loading />
      ) : (
        <div className="audioBook">
          <>
            <div className="audioBook__top align-items-center">
              <div
                className={`audioBook__top__image studio-image${
                  dataDetailPlayStudio?.studioBookDetail?.thumbnailUrl
                    ? ''
                    : 'bg-non-img'
                }`}
              >
                <img
                  src={
                    `https://down.wjthinkbig.com${dataDetailPlayStudio?.studioBookDetail?.thumbnailUrl}` ||
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
                <h2>{dataDetailPlayStudio?.studioBookDetail?.title}</h2>
                <p
                  className={`audioBook__top__content__writer ${
                    dataDetailPlayStudio?.studioBookDetail?.contentsName
                      ? ''
                      : 'none-border'
                  }`}
                >
                  <span>
                    {dataDetailPlayStudio?.studioBookDetail?.contentsName}
                  </span>
                </p>
                <div className="audioBook__top__content__list-status">
                  <div className="audioBook__top__content__list-status--time">
                    <img src={IMAGES.iconTime} alt="" />
                    <p>
                      {dataDetailPlayStudio &&
                        convertTime(
                          dataDetailPlayStudio?.studioBookDetail?.duration
                        )}
                    </p>
                  </div>
                  <div className="audioBook__top__content__list-status--time view">
                    <img src={IMAGES.iconPlayMini} alt="" />
                    <p>
                      {dataDetailPlayStudio &&
                        dataDetailPlayStudio.playCount &&
                        dataDetailPlayStudio.playCount.toLocaleString('en')}
                    </p>
                  </div>
                  {/* <div className="audioBook__top__content__list-status--time favorite">
                    <img src={IMAGES.iconHeartMini} alt="" />
                    <p>{likeCount && likeCount.toLocaleString('en')}</p>
                  </div> */}
                </div>
                <div
                  className="audioBook__top__content__list-status--time report-time"
                  onClick={setIsShowModalReport}
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  <img src={IMAGES.iconReport} alt="" />
                  <p>신고하기</p>
                </div>
              </div>
              <div className="audioBook__top__report">
                <div className="audioBook__top__report__img">
                  <img
                    src={
                      `https://down.wjthinkbig.com${dataDetailPlayStudio?.studioBookDetail?.userIcon}` ||
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
                <div className="audioBook__top__report__content">
                  <p>{dataDetailPlayStudio?.studioBookDetail?.nickName}</p>
                  <span>나레이션</span>
                </div>
              </div>
            </div>
            <div className="audioBook__group-button">
              <Button
                customClass={`button--primary ${
                  activeLike ? 'btn-active' : ''
                }`}
                onClick={() => {
                  likeDetailStudio(parseInt(productId, 10));
                  toDoSetLike(activeLike ? 'N' : 'Y', productId);
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
                onClick={() => showPlayerPlayNow(parseInt(productId, 10))}
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
            <Tabs
              defaultActiveKey={activeTab}
              onSelect={(eventKey) => onSelect(eventKey)}
              className="audioBook__tab"
            >
              <Tab eventKey="introduce" title="정보">
                <Introduce
                  dataDetailPlayStudio={dataDetailPlayStudio}
                  history={history}
                  avgRate={avgRate}
                  listReview={listReview}
                  listMyReview={listMyReview}
                  totalReview={totalReview}
                  saveReviewStudio={saveReviewStudio}
                  infoUser={infoUser}
                  handleLoadMore={handleLoadMore}
                  listItemReport={listTypeReport}
                  deleteReviewStudio={deleteReviewStudio}
                  saveReport={saveReport}
                  isShowReviewStudio={isShowReviewStudio}
                />
              </Tab>
              <Tab
                eventKey="series"
                title="녹음 더 보기 "
                // disabled={dataDetail?.audioBookDetail?.groupId === null}
              >
                <ItemSeries
                  dataStudioSeries={listSeriesStudio}
                  history={history}
                  handleSetActiveTab={handleSetActiveTab}
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
                  listPlayerSelective={listPlayerSelective}
                  handleShowPlayer={handlePlayAudio}
                />
              </Tab>
            </Tabs>
          </>
        </div>
      )}
      <ModalReport
        isShowModal={isShowModalReport}
        handleIsShowModal={sendDataPopup}
        listItemReport={listTypeReport}
        handleIsCloseModal={() => setIsShowModalReport(false)}
      />
    </MainLayout>
  );
};

export default memo<Props>(PlayBook);
