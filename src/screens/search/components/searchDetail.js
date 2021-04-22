// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import Immutable from 'seamless-immutable';
import { Tabs, Tab, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import { listCategoryTab, listSelect } from 'constants/listDataCategory';
import ROUTERS from 'constants/router';
import ModalPopup from 'components/Modal';
import NoData from 'components/NoData';
import Loading from 'components/Loading';
import ItemSearchSeries from './LookItem/ItemSearchSeries';
import {
  renderNameAge,
  toDoSetMusicList,
  toDoAudioPlay,
  convertTime,
} from '../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  ageCategorySearch: Array<{
    id: number,
    ageFrom: number,
  }>,
  searchCategory: Function,
  match: {
    params: {
      id: number,
    },
  },
  subjectCategory: Array<{
    id: number,
    subject: string,
  }>,
  isProcessing: boolean,
  resetData: Function,
  totalAudio: number,
  totalPlay: number,
  totalMusic: number,
  dataSearchCategoryVideo: Array<{
    productId: number,
    thumbnailUrl: string,
    productName: string,
    duration: number,
    playCount: number,
    likeCount: number,
    keywords: any,
  }>,
  dataSearchCategoryMusic: Array<{
    productId: number,
    thumbnailUrl: string,
    productName: string,
  }>,
  dataSearchCategoryAudio: Array<{
    productId: number,
    thumbnailUrl: string,
    productName: string,
    duration: number,
    playCount: number,
    likeCount: number,
    keywords: any,
    contentsUrl: string,
  }>,
  setAutoPlay: Function,
  getTabActive: Function,
  tabActive: Object,
  setStatusPlay: Function,
  type: string,
  dataSearchCategorySeries: Array<{
    groupId: number,
    thumbnailUrl: string,
    mediaTypeId: number,
    groupName: string,
  }>,
  totalSeries: number,
  saveTypeReport: Function,
};

const SearchDetail = ({
  history,
  ageCategorySearch,
  searchCategory,
  match,
  subjectCategory,
  isProcessing,
  dataSearchCategoryVideo,
  resetData,
  totalAudio,
  totalPlay,
  totalMusic,
  dataSearchCategoryMusic,
  dataSearchCategoryAudio,
  setAutoPlay,
  getTabActive,
  tabActive,
  setStatusPlay,
  type,
  dataSearchCategorySeries,
  totalSeries,
  saveTypeReport,
}: Props) => {
  const ageId = match.params.id;
  const [page, setPage] = useState(0);
  const [isActiveTab, setIsActiveTab] = useState(0);
  const [activeTab, setActiveTab] = useState(
    (tabActive && tabActive.activeTab) || '3'
  );
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [defaultSelect, setDefaultSelect] = useState(listSelect[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState(
    (tabActive && tabActive.categorySearch) || ageCategorySearch[ageId]
  );
  const [loadImage, setLoadImage] = useState(true);
  const total = totalPlay + totalAudio + totalMusic + totalSeries;
  const [dataSort, setDataSort] = useState(dataSearchCategoryAudio);
  const [dataSortVideo, setDataSortVideo] = useState(dataSearchCategoryVideo);
  const [dataSortMusic, setDataSortMusic] = useState(dataSearchCategoryMusic);
  const [dataSortSeries, setDataSortSeries] = useState(
    dataSearchCategorySeries
  );
  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetData();
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // call api search category
  useEffect(() => {
    searchCategory({
      ageId: categorySearch?.id,
      subjectId: activeTab,
      mediaTypeId: isActiveTab,
      page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveTab, activeTab, categorySearch, page]);

  useEffect(() => {
    if (type === 'SEARCH_CATEGORY_SUCCESS') {
      setDataSort(dataSearchCategoryAudio);
      setDataSortVideo(dataSearchCategoryVideo);
      setDataSortMusic(dataSearchCategoryMusic);
      setDataSortSeries(dataSearchCategorySeries);
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
    }
  };
  const handleSort = (e, types) => {
    const result = Immutable.asMutable(e);
    const resultVideo =
      dataSearchCategoryVideo && Immutable.asMutable(dataSearchCategoryVideo);
    const resultMusic =
      dataSearchCategoryMusic && Immutable.asMutable(dataSearchCategoryMusic);
    const resultSeries =
      dataSearchCategorySeries && Immutable.asMutable(dataSearchCategorySeries);

    switch (isActiveTab) {
      case 1:
        switch (types) {
          case 0:
            result.sort((dataFirst, dataLast) => {
              return dataFirst.createdAt.localeCompare(dataLast.createdAt) * -1;
            });
            break;
          case 1:
            result.sort((dataFirst, dataLast) => {
              return (
                dataFirst.productName.localeCompare(dataLast.productName) * -1
              );
            });
            break;
          case 2:
            result.sort((dataFirst, dataLast) => {
              return dataLast.playCount - dataFirst.playCount;
            });
            break;
          default:
            break;
        }
        break;
      case 2:
        switch (types) {
          case 0:
            resultVideo.sort((dataFirst, dataLast) => {
              return dataFirst.createdAt.localeCompare(dataLast.createdAt) * -1;
            });
            break;
          case 1:
            resultVideo.sort((dataFirst, dataLast) => {
              return (
                dataFirst.productName.localeCompare(dataLast.productName) * -1
              );
            });
            break;
          case 2:
            resultVideo.sort((dataFirst, dataLast) => {
              return dataLast.playCount - dataFirst.playCount;
            });
            break;
          default:
            break;
        }
        break;
      case 3:
        switch (types) {
          case 0:
            resultMusic.sort((dataFirst, dataLast) => {
              return dataFirst.createdAt.localeCompare(dataLast.createdAt) * -1;
            });
            break;
          case 1:
            resultMusic.sort((dataFirst, dataLast) => {
              return (
                dataFirst.productName.localeCompare(dataLast.productName) * -1
              );
            });
            break;
          case 2:
            resultMusic.sort((dataFirst, dataLast) => {
              return dataLast.playCount - dataFirst.playCount;
            });
            break;
          default:
            break;
        }
        break;
      case 4:
        switch (types) {
          case 0:
            resultSeries.sort((dataFirst, dataLast) => {
              return dataFirst.createdAt.localeCompare(dataLast.createdAt) * -1;
            });
            break;
          case 1:
            resultSeries.sort((dataFirst, dataLast) => {
              return (
                dataFirst.productName.localeCompare(dataLast.productName) * -1
              );
            });
            break;
          case 2:
            resultSeries.sort((dataFirst, dataLast) => {
              return dataLast.playCount - dataFirst.playCount;
            });
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    setDataSort(result);
    setDataSortVideo(resultVideo);
    setDataSortMusic(resultMusic);
    setDataSortSeries(resultSeries);
  };

  // render list data audio
  const renderStrawberry =
    dataSort?.length > 0 ? (
      dataSort &&
      dataSort.map((item, index) => {
        return (
          <div
            className="strawberry__listAudio__items bestFriend"
            key={item.productId}
          >
            <div
              className="d-flex box-left"
              onClick={() => {
                history.push(`${ROUTERS.AUDIO_BOOK}/${item.productId}`);
                getTabActive({ activeTab, categorySearch });
                saveTypeReport(2);
              }}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <div className="strawberry__listAudio__items__left">
                {isActiveTab === 0 && (
                  <h2>{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</h2>
                )}
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
                          key={items.keywordId}
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
              <img
                src={IMAGES.iconAudio}
                alt=""
                onClick={() => handleShowPlayer(item)}
                role="presentation"
              />
            </div>
          </div>
        );
      })
    ) : (
      <>
        {isActiveTab === 1 ? <NoData text="해당 콘텐츠가 없습니다." /> : <></>}
      </>
    );

  // render list video data search
  const renderVideoSearch =
    dataSortVideo?.length > 0 ? (
      dataSortVideo &&
      dataSortVideo.map((item) => {
        return (
          <div
            className="search-wrapper__listVideo__items__video"
            key={item.productId}
            onClick={() => {
              history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
              setAutoPlay(false);
              getTabActive({ activeTab, categorySearch });
              saveTypeReport(2);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
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
            <div className="search-wrapper__listVideo__items__video__icon-play">
              <img src={IMAGES.icon_play} alt="" />
            </div>
            <h2>{item.productName}</h2>
            <div className="search-wrapper__listVideo__items__video__list-status">
              <div className="search-wrapper__listVideo__items__video__list-status--time">
                <img src={IMAGES.iconTime} alt="" />
                <p>{item && convertTime(item.duration)}</p>
              </div>
              <div className="search-wrapper__listVideo__items__video__list-status--time view">
                <img src={IMAGES.iconPlayMini} alt="" />
                <p>{item.playCount}</p>
              </div>
              <div className="search-wrapper__listVideo__items__video__list-status--time favorite">
                <img src={IMAGES.iconHeartMini} alt="" />
                <p>{item.likeCount}</p>
              </div>
            </div>
            <div className="search-wrapper__listVideo__items__video__list-category">
              {item.keywords.map((items) => {
                return (
                  <div
                    className="search-wrapper__listVideo__items__video__list-category--category"
                    key={items.keywordId}
                  >
                    {items.name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })
    ) : (
      <>
        {isActiveTab === 2 ? <NoData text="해당 콘텐츠가 없습니다." /> : <></>}
      </>
    );

  // render list item Music
  const renderListItem =
    dataSortMusic?.length > 0 ? (
      dataSortMusic &&
      dataSortMusic.map((item) => (
        <div
          className="search-wrapper__list-music"
          key={item.productId}
          onClick={() => {
            history.push(`${ROUTERS.MUSIC}/${item.productId}`);
            getTabActive({ activeTab, categorySearch });
            saveTypeReport(2);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <div className="item--image">
            <img
              src={
                `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
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
          <div className="item--title">{item.productName}</div>
        </div>
      ))
    ) : (
      <>
        {isActiveTab === 3 ? <NoData text="해당 콘텐츠가 없습니다." /> : <></>}
      </>
    );

  const onSelect = (key) => {
    setActiveTab(key);
    resetData();
    setPage(0);
    setIsActiveTab(0);
    setDefaultSelect(listSelect[0]);
  };
  const renderButton =
    listCategoryTab.length > 0 &&
    listCategoryTab.map((item) => {
      return (
        <Button
          customClass={`button--primary ${
            isActiveTab === item.category ? 'active' : ''
          }`}
          onClick={() => {
            setIsActiveTab(item.category);
            resetData();
            setPage(0);
            setDefaultSelect(listSelect[0]);
          }}
          key={item.id}
          isDisabled={isActiveTab === item.category}
        >
          <p>{item.name}</p>
        </Button>
      );
    });
  const renderTotal = (tab) => {
    switch (tab) {
      case 0:
        return (
          <div className="strawberry__top__total">
            총 {total && total.toLocaleString('en')}개
          </div>
        );
      case 1:
        return (
          <div className="strawberry__top__total">
            총 {totalAudio && totalAudio.toLocaleString('en')}개
          </div>
        );
      case 2:
        return (
          <div className="strawberry__top__total">
            총 {totalPlay && totalPlay.toLocaleString('en')}개
          </div>
        );
      case 3:
        return (
          <div className="strawberry__top__total">
            총 {totalMusic && totalMusic.toLocaleString('en')}개
          </div>
        );
      case 4:
        return (
          <div className="strawberry__top__total">
            총 {totalSeries && totalSeries.toLocaleString('en')}개
          </div>
        );
      default:
        break;
    }
    return tab;
  };

  const renderContentSort = () => {
    let dataContentSort = '';
    switch (isActiveTab) {
      case 1:
        dataContentSort = dataSearchCategoryAudio;
        break;
      case 2:
        dataContentSort = dataSearchCategoryVideo;
        break;
      case 3:
        dataContentSort = dataSearchCategoryMusic;
        break;
      case 4:
        dataContentSort = dataSearchCategorySeries;
        break;
      default:
        break;
    }
    return dataContentSort;
  };
  // active button when click title
  const handleTab = (e) => {
    setIsActiveTab(e);
    resetData();
    setTimeout(() => {
      setPage(0);
    }, 100);
  };
  const renderTabAge =
    subjectCategory &&
    subjectCategory.map((item) => (
      <Tab
        eventKey={item.id}
        title={<p>{item?.subject}</p>}
        key={item.id}
        disabled={parseInt(activeTab, 10) === item.id}
      >
        {isProcessing && page < 1 ? (
          <Loading />
        ) : (
          <>
            <div className="search-wrapper__list-button">{renderButton}</div>
            <>
              {total > 0 && (
                <div
                  className={`strawberry__top strawberry-dj-top ${
                    isActiveTab !== 3 ? 'pb-0' : ''
                  }`}
                >
                  {renderTotal(isActiveTab)}
                  {isActiveTab !== 0 && isActiveTab !== 4 && (
                    <div
                      className="search-wrapper__searchOption"
                      onClick={() => setIsShowSelect(true)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => {}}
                    >
                      <p>{defaultSelect.value}</p>
                      <img src={IMAGES.iconArrowMini} alt="" />
                    </div>
                  )}
                </div>
              )}
              {(isActiveTab === 4 || isActiveTab === 0) && (
                <div className="search-wrapper__listVideo">
                  {isActiveTab === 0 && (
                    <div
                      className={`search-wrapper__listVideo__total pb-0 ${
                        isActiveTab === 4 ? 'disable-div' : ''
                      }`}
                      onClick={() => handleTab(4)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                    >
                      <h2>
                        시리즈
                        <span>
                          {totalSeries && totalSeries.toLocaleString('en')}
                        </span>
                      </h2>
                      <img src={IMAGES.iconArrowMiniB} alt="" />
                    </div>
                  )}
                  <div className="strawberry__listAudio search-series">
                    <ItemSearchSeries
                      itemSeries={dataSortSeries}
                      history={history}
                      isActiveTab={isActiveTab}
                    />
                  </div>
                </div>
              )}
              {(isActiveTab === 1 || isActiveTab === 0) && (
                <div className="search-wrapper__listVideo">
                  <div className="strawberry__listAudio">
                    {isActiveTab === 0 && (
                      <div
                        className={`search-wrapper__listVideo__total pb-0 ${
                          isActiveTab === 1 ? 'disable-div' : ''
                        }`}
                        onClick={() => handleTab(1)}
                        tabIndex={0}
                        role="button"
                        onKeyDown={() => {}}
                      >
                        <h2>
                          오디오북
                          <span>{totalAudio}</span>
                        </h2>
                        <img src={IMAGES.iconArrowMiniB} alt="" />
                      </div>
                    )}
                    {renderStrawberry}
                  </div>
                </div>
              )}
              {(isActiveTab === 2 || isActiveTab === 0) && (
                <div className="search-wrapper__listVideo">
                  {isActiveTab === 0 && (
                    <div
                      className={`search-wrapper__listVideo__total pb-0 ${
                        isActiveTab === 2 ? 'disable-div' : ''
                      }`}
                      onClick={() => handleTab(2)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                    >
                      <h2>
                        플레이북 <span>{totalPlay}</span>
                      </h2>
                      <img src={IMAGES.iconArrowMiniB} alt="" />
                    </div>
                  )}
                  <div className="search-wrapper__listVideo__items">
                    {renderVideoSearch}
                  </div>
                </div>
              )}
              {(isActiveTab === 3 || isActiveTab === 0) && (
                <>
                  {isActiveTab === 0 && (
                    <div
                      className={`search-wrapper__listVideo__total ${
                        isActiveTab === 3 ? 'disable-div' : ''
                      }`}
                      onClick={() => handleTab(3)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                    >
                      <h2>
                        뮤직 <span>{totalMusic}</span>
                      </h2>
                      <img src={IMAGES.iconArrowMiniB} alt="" />
                    </div>
                  )}
                  <div className="search-wrapper__listVideo__items">
                    {renderListItem}
                  </div>
                </>
              )}
            </>
          </>
        )}
      </Tab>
    ));
  const renderLengthScroll = () => {
    let lengthScroll = '';
    switch (isActiveTab) {
      case 0:
        lengthScroll = 0;
        break;
      case 1:
        lengthScroll =
          (dataSearchCategoryAudio && dataSearchCategoryAudio.length) || 0;
        break;
      case 2:
        lengthScroll =
          (dataSearchCategoryVideo && dataSearchCategoryVideo.length) || 0;
        break;
      case 3:
        lengthScroll =
          (dataSearchCategoryMusic && dataSearchCategoryMusic.length) || 0;
        break;
      case 4:
        lengthScroll =
          (dataSearchCategorySeries && dataSearchCategorySeries.length) || 0;
        break;
      default:
        break;
    }
    return lengthScroll;
  };

  const renderHasMoreScroll = () => {
    let hasMoreScroll = false;
    switch (isActiveTab) {
      case 0:
        hasMoreScroll = false;
        break;
      case 1:
        hasMoreScroll =
          dataSearchCategoryAudio &&
          dataSearchCategoryAudio.length < totalAudio;
        break;
      case 2:
        hasMoreScroll =
          dataSearchCategoryVideo && dataSearchCategoryVideo.length < totalPlay;
        break;
      case 3:
        hasMoreScroll =
          dataSearchCategoryMusic &&
          dataSearchCategoryMusic.length < totalMusic;
        break;
      case 4:
        hasMoreScroll =
          dataSearchCategorySeries &&
          dataSearchCategorySeries.length < totalSeries;
        break;
      default:
        break;
    }
    return hasMoreScroll;
  };
  return (
    <MainLayout
      customClass="page-search-detail"
      titleHeader={renderNameAge(categorySearch?.ageFrom)}
      isShowHeader
      isLink
      isShowIcon
      isShowPen
      handleEdit={() => setIsOpen(true)}
    >
      <>
        <InfiniteScroll
          dataLength={renderLengthScroll()}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={renderHasMoreScroll()}
          height={500}
          loader={
            <div className="d-flex justify-content-center pt-20">
              <Spinner animation="border" variant="success" />
            </div>
          }
        >
          <div className="strawberry">
            <Tabs
              defaultActiveKey={activeTab}
              onSelect={(eventKey) => onSelect(eventKey)}
            >
              {renderTabAge}
            </Tabs>
          </div>
        </InfiniteScroll>
      </>

      <ModalPopup
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        customClass="w-100 modal-edit"
      >
        <div className="title-content">
          {ageCategorySearch &&
            ageCategorySearch.map((item) => {
              return (
                <p
                  className={`item-edit ${
                    categorySearch?.id === item.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    setCategorySearch(item);
                    resetData();
                    setPage(0);
                    setIsActiveTab(0);
                    setActiveTab('3');
                    setDefaultSelect(listSelect[0]);
                  }}
                  role="presentation"
                  key={item.id}
                >
                  {renderNameAge(item.ageFrom)}
                </p>
              );
            })}
        </div>
      </ModalPopup>
      <ModalPopup
        isOpen={isShowSelect}
        handleClose={() => {
          setIsShowSelect(false);
        }}
        customClass="w-100 modal-edit"
      >
        <div className="title-content">
          {listSelect &&
            listSelect.map((item) => {
              return (
                <p
                  className={`item-edit ${
                    defaultSelect.value === item.value ? 'active' : ''
                  }`}
                  onClick={() => {
                    setIsShowSelect(false);
                    setDefaultSelect(item);
                    handleSort(renderContentSort(), item.id);
                  }}
                  role="presentation"
                  key={item.id}
                >
                  {item.value}
                </p>
              );
            })}
        </div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(SearchDetail);
