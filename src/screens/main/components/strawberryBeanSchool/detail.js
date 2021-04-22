// @flow

import React, { useState, memo, useEffect, useCallback } from 'react';
import MainLayout from 'layout/MainLayout';
import { toast, ToastContainer } from 'react-toastify';
import { Tabs, Tab } from 'react-bootstrap';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import Loading from 'components/Loading';
import NoData from 'components/NoData';
import ROUTERS from 'constants/router';
import Immutable from 'seamless-immutable';
import {
  toDoSetMusicList,
  toDoAudioPlay,
  convertTime,
  toDoHideMusicPlayer,
  toDoShowMusicPlayer,
} from '../../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  getDataThemeSchool: Function,
  dataThemeSchool: Object,
  ageCategory: Array<{
    id: number,
    ageGroup: string,
  }>,
  isProcessing: boolean,
  getAgeCategory: Function,
  setAutoPlay: Function,
  setStatusPlay: Function,
  ageIdMain: number,
  saveTypeReport: Function,
};

const StrawberryBeanSchoolDetail = ({
  history,
  getDataThemeSchool,
  dataThemeSchool,
  ageCategory,
  isProcessing,
  getAgeCategory,
  setAutoPlay,
  setStatusPlay,
  ageIdMain,
  saveTypeReport,
}: Props) => {
  const defaultOption = {
    listAudioSelective: [],
  };
  const [audioOption, setAudioOption] = useState(
    defaultOption?.listAudioSelective
  );
  const [isSelective, setIsSelective] = useState(false);
  const [listAudio, setListAudio] = useState([]);
  const [activeTab, setActiveTab] = useState(
    ageIdMain || (ageCategory && ageCategory[0]?.id)
  );
  const [loadImage, setLoadImage] = useState(true);
  const notify = () => toast.error('비디오북은 선택 듣기가 불가능합니다');
  const notifyAdd = () => toast.error('1개의 음원을 재생목록에 추가했습니다.');

  useEffect(() => {
    setActiveTab(ageIdMain || (ageCategory && ageCategory[0]?.id));
  }, [ageIdMain, ageCategory]);

  // call api get age category
  const getListAgeCategory = useCallback(() => {
    getAgeCategory();
  }, [getAgeCategory]);

  useEffect(() => {
    getListAgeCategory();
  }, [getListAgeCategory]);

  useEffect(() => {
    if (activeTab) {
      getDataThemeSchool(parseInt(activeTab, 10));
    }
  }, [activeTab, getDataThemeSchool]);

  // handle change when choose audio
  const handleChangeOption = (value, audio) => {
    let listAudioId = [];
    let listDataAudio = [];
    if (audio.mediaType === '플레이북' || audio.contentsUrl === null) {
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
        title: items.materialName,
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
        saveTypeReport(2);
      }
      if (data.mediaType === '뮤직') {
        history.push(`${ROUTERS.MUSIC}/${data.productId}`);
        saveTypeReport(2);
      }
      if (data.mediaType === '플레이북') {
        history.push(`${ROUTERS.PLAY_BOOK}/${data.productId}`);
        setAutoPlay(false);
        saveTypeReport(2);
      }
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
        title: value.materialName,
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
        title: items.materialName,
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
    dataThemeSchool?.peers?.length > 0 ? (
      dataThemeSchool &&
      dataThemeSchool.peers &&
      dataThemeSchool.peers.map((item, index) => {
        const idActive = audioOption.filter(
          (items) => items === item.productId
        );
        return (
          <div
            className={`strawberry__listAudio__items bestFriend ${
              idActive && idActive[0] === item.productId ? 'active' : ''
            }`}
            key={item.productId}
            onClick={() =>
              isSelective &&
              handleChangeOption(item.productId, dataThemeSchool?.peers[index])
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
                <h2>{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</h2>
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
                <h3>{item.materialName}</h3>
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
                  onClick={() => {
                    !isSelective &&
                      history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
                    !isSelective && setAutoPlay(true);
                    saveTypeReport(2);
                  }}
                />
              ) : (
                <img
                  src={IMAGES.iconAudio}
                  alt=""
                  onClick={() => {
                    handleShowPlayer(item);
                    notifyAdd();
                  }}
                  role="presentation"
                />
              )}
            </div>
          </div>
        );
      })
    ) : (
      <NoData text="준비 중입니다." />
    );

  const onSelect = (key) => {
    setActiveTab(key);
    setIsSelective(false);
    setAudioOption([]);
    setListAudio([]);
  };

  const renderButtonKey =
    dataThemeSchool &&
    dataThemeSchool.keywords &&
    dataThemeSchool.keywords.map((item) => (
      <Button onClick={() => {}}>
        <p>{item.name}</p>
      </Button>
    ));

  const renderTabForAge =
    ageCategory &&
    ageCategory.map((item) => (
      <Tab
        eventKey={item?.id}
        title={<p>{item?.ageGroup}</p>}
        id={item.id}
        tabClassName="custom-tab"
      >
        {isProcessing ? (
          <Loading />
        ) : (
          <>
            {dataThemeSchool?.peers?.length > 0 && (
              <>
                <div className="group-button-key">{renderButtonKey}</div>
                <div className="strawberry__top">
                  <div className="strawberry__top__total">
                    총{' '}
                    {dataThemeSchool &&
                      dataThemeSchool.peers &&
                      dataThemeSchool.peers.length.toLocaleString('en')}
                    개
                  </div>
                  <div className="strawberry__top__chooseOption">
                    <p
                      onClick={() => {
                        getListAudio(
                          dataThemeSchool &&
                            dataThemeSchool.peers &&
                            Immutable.asMutable(dataThemeSchool.peers)
                        );
                        setListAudio([]);
                        setIsSelective(false);
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
              </>
            )}
            <div className="strawberry__listAudio">{renderStrawberry}</div>
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
      </Tab>
    ));
  return (
    <MainLayout
      customClass=""
      titleHeader="쏙쏙 딸기콩 스쿨"
      isShowHeader
      isLink
      isShowIcon
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
      <div className="strawberry">
        <Tabs
          defaultActiveKey={activeTab}
          onSelect={(eventKey) => onSelect(eventKey)}
        >
          {renderTabForAge}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default memo<Props>(StrawberryBeanSchoolDetail);
