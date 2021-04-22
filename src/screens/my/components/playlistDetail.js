// @flow

import React, { useState, useEffect, memo } from 'react';
import MainLayout from 'layout/MainLayout';
import Immutable from 'seamless-immutable';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import NoData from 'components/NoData';
import Loading from 'components/Loading';
import ROUTERS from 'constants/router';
import { getClassName } from 'constants/getClassNameImg';
import {
  convertTime,
  toDoHideMusicPlayer,
  toDoShowMusicPlayer,
  toDoSetMusicList,
  toDoAudioPlay,
} from '../../../utils/Helpers';

type Props = {
  getListPlayStudioDetail: Function,
  match: {
    params: {
      id: string,
    },
  },
  listPlayStudioDetail: Object,
  isProcessing: boolean,
  history: {
    push: Function,
  },
  saveTypeReport: Function,
  setAutoPlay: Function,
  setStatusPlay: Function,
};

const PlaylistDetail = ({
  match,
  getListPlayStudioDetail,
  listPlayStudioDetail,
  isProcessing,
  history,
  saveTypeReport,
  setAutoPlay,
  setStatusPlay,
}: Props) => {
  const studioId = match.params.id;
  const defaultOption = {
    listAudioSelective: [],
  };
  const [audioOption, setAudioOption] = useState(
    defaultOption?.listAudioSelective
  );
  const [isSelective, setIsSelective] = useState(false);
  const [listAudio, setListAudio] = useState([]);
  const [loadImage, setLoadImage] = useState(true);
  const notify = () => toast.error('비디오북은 선택 듣기가 불가능합니다');

  useEffect(() => {
    getListPlayStudioDetail(studioId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studioId]);

  // handle change when choose audio
  const handleChangeOption = (value, audio) => {
    let listAudioId = [];
    let listDataAudio = [];
    if (audio?.mediaType === '플레이북' || audio?.contentsUrl === null) {
      notify();
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

  useEffect(() => {
    if (!isSelective) {
      toDoShowMusicPlayer();
    } else {
      toDoHideMusicPlayer();
    }
  }, [isSelective]);

  const switchPage = (data) => {
    if (!isSelective) {
      if (data.mediaType === '오디오북') {
        history.push(`${ROUTERS.AUDIO_BOOK}/${data.productId}`);
        saveTypeReport(3);
      }
      if (data.mediaType === '뮤직') {
        history.push(`${ROUTERS.MUSIC}/${data.productId}`);
        saveTypeReport(3);
      }
      if (data.mediaType === '플레이북') {
        history.push(`${ROUTERS.PLAY_BOOK}/${data.productId}`);
        setAutoPlay(false);
        saveTypeReport(3);
      }
    }
  };

  // get list audio when click 전체듣기
  const getListAudio = (value) => {
    let listAudioId = [];
    const listIdProduct = [];
    listAudioId = value.filter(
      (item) => item.mediaType !== '플레이북' && item.contentsUrl !== null
    );
    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = listAudioId.length; i < len; i++) {
      listIdProduct.push(listAudioId[i].productId);
    }

    const mapToDataPlayer =
      listAudioId &&
      listAudioId.map((items) => ({
        seq: items.productId,
        title: items.productName,
        thumbnail:
          items.thumbnailUrl ||
          'https://down.wjthinkbig.com//DDALGICONG/CONTENTS/THUMBNAIL/DEFAULT/BEAN.PNG',
        audioFile: items.contentsUrl,
        introTime: 0,
      }));
    if (listAudioId?.length > 0) {
      setStatusPlay({
        productId: listIdProduct,
        status: 'init',
      });
      toDoSetMusicList(JSON.stringify(mapToDataPlayer));
      toDoAudioPlay();
    }
  };

  const handleShowPlayer = (value) => {
    if (!isSelective && value.contentsUrl !== null) {
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
    }
  };

  const handleSetPlayer = () => {
    setStatusPlay({
      productId: audioOption,
      status: 'init',
    });
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
    toDoSetMusicList(JSON.stringify(mapToDataPlayer));
    toDoAudioPlay();
    setAudioOption([]);
    setListAudio([]);
  };

  // render list data strawberry
  const renderStrawberry =
    listPlayStudioDetail &&
    listPlayStudioDetail.products &&
    listPlayStudioDetail.products.length > 0 ? (
      listPlayStudioDetail.products.map((item, index) => {
        const idActive = audioOption.filter(
          (items) => items === item.productId
        );

        return (
          <div
            className={`strawberry__listAudio__items ${
              idActive && idActive[0] === item.productId ? 'active' : ''
            }`}
            key={item.productId}
            onClick={() =>
              isSelective &&
              handleChangeOption(
                item.productId,
                listPlayStudioDetail &&
                  listPlayStudioDetail.products &&
                  listPlayStudioDetail.products[index] &&
                  listPlayStudioDetail.products[index]
              )
            }
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div
              className="d-flex box-left"
              onClick={() => switchPage(item)}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <div
                className={`strawberry__listAudio__items__left ${
                  item.thumbnailUrl ? '' : 'bg-non-img'
                }`}
              >
                <img
                  src={
                    `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
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
              </div>
              <div className="strawberry__listAudio__items__center">
                <h3>{item.productName}</h3>
                <div className="strawberry__listAudio__items__center__status">
                  <div className="strawberry__listAudio__items__center__status__list-status">
                    <div className="strawberry__listAudio__items__center__status__list-status--time">
                      <img src={IMAGES.iconTime} alt="" />
                      <p>{item && convertTime(item.duration)}</p>
                    </div>
                    <div className="strawberry__listAudio__items__center__status__list-status--time view">
                      <img src={IMAGES.iconPlayMini} alt="" />
                      <p>{item && item.playCount.toLocaleString('en')}</p>
                    </div>
                    <div className="strawberry__listAudio__items__center__status__list-status--time favorite">
                      <img src={IMAGES.iconHeartMini} alt="" />
                      <p>{item && item.likeCount.toLocaleString('en')}</p>
                    </div>
                  </div>
                  <div className="strawberry__listAudio__items__center__status__list-category">
                    {item.keywords.map((items) => {
                      return (
                        <div
                          className="strawberry__listAudio__items__center__status__list-category--category"
                          key={items.keywordsId}
                        >
                          #{items.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="strawberry__listAudio__items__right">
              {item.mediaType === '플레이북' ? (
                <img
                  src={IMAGES.iconVideo}
                  alt=""
                  role="presentation"
                  onClick={() => {}}
                />
              ) : (
                <img
                  src={IMAGES.iconAudio}
                  alt=""
                  onClick={() => handleShowPlayer(item)}
                  role="presentation"
                />
              )}
            </div>
          </div>
        );
      })
    ) : (
      <NoData text="음원을 추가해주세요." />
    );

  return (
    <MainLayout customClass="" titleHeader="플레이스튜디오" isShowHeader isLink>
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
      {isProcessing ? (
        <Loading />
      ) : (
        <>
          <div className="play-studio">
            {listPlayStudioDetail &&
              listPlayStudioDetail.products &&
              listPlayStudioDetail.products.length > 0 && (
                <div className="play-studio__top group-image">
                  <div
                    className={getClassName(
                      listPlayStudioDetail?.thumbnailUrl?.length
                    )}
                  >
                    {listPlayStudioDetail.thumbnailUrl &&
                      listPlayStudioDetail.thumbnailUrl.map((items) => (
                        <img
                          src={`https://down.wjthinkbig.com${items.thumbnailUrl}`}
                          alt=""
                          onError={(e) => {
                            if (loadImage) {
                              setLoadImage({
                                loadImage: false,
                              });
                              e.target.src = IMAGES.image_not_found;
                            }
                          }}
                          className="thumbnail-page"
                        />
                      ))}
                  </div>
                  <div className="play-studio__top--right">
                    <div className="play-studio__top--right__title">
                      <h1>
                        {listPlayStudioDetail.groupName}
                        {listPlayStudioDetail?.visible === 'N' && (
                          <img src={IMAGES.icon_lock} alt="" />
                        )}
                      </h1>
                    </div>
                    <p className="play-studio__top--right__username">
                      {listPlayStudioDetail.nickName}
                    </p>
                    <div className="play-studio__top--right__favorite">
                      <img src={IMAGES.iconHeartMini} alt="" />
                      <p>
                        {listPlayStudioDetail &&
                          listPlayStudioDetail.likeCount &&
                          listPlayStudioDetail.likeCount.toLocaleString('en')}
                      </p>
                    </div>
                    {/* <div className="play-studio__top--right__download">
                  <Button customClass="button--download" onClick={() => {}}>
                    <img src={IMAGES.icon_download_mini} alt="" />
                    <p>전체 저장</p>
                  </Button>
                </div> */}
                  </div>
                </div>
              )}
            {listPlayStudioDetail &&
              listPlayStudioDetail.products &&
              listPlayStudioDetail.products.length > 0 && (
                <div className="strawberry__top strawberry-dj-top">
                  <div className="strawberry__top__total">
                    총{' '}
                    {listPlayStudioDetail &&
                      listPlayStudioDetail.productCount &&
                      listPlayStudioDetail.productCount.toLocaleString(
                        'en'
                      )}{' '}
                    개
                  </div>
                  <div className="strawberry__top__chooseOption">
                    <p
                      onClick={() => {
                        setListAudio([]);
                        setIsSelective(false);
                        getListAudio(
                          listPlayStudioDetail &&
                            listPlayStudioDetail.products &&
                            Immutable.asMutable(listPlayStudioDetail.products)
                        );
                        setAudioOption([]);
                      }}
                      role="presentation"
                    >
                      전체 듣기
                    </p>
                    <p
                      onClick={() => {
                        setIsSelective(!isSelective);
                        setAudioOption([]);
                        setListAudio([]);
                      }}
                      role="presentation"
                    >
                      {isSelective ? '취소' : '선택 듣기'}
                    </p>
                  </div>
                </div>
              )}

            {renderStrawberry}
          </div>
          {listAudio.length > 0 && (
            <div className="strawberry__btn-play">
              <Button
                customClass="button--primary"
                onClick={() => {
                  handleSetPlayer();
                  toDoShowMusicPlayer();
                  setIsSelective(false);
                }}
              >
                <p>선택 듣기</p>
                <img src={IMAGES.iconPlayNormal} alt="" />
              </Button>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default memo<Props>(PlaylistDetail);
