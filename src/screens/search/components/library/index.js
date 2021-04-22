// @flow

import React, { useState, memo, useEffect, useCallback } from 'react';
import MainLayout from 'layout/MainLayout';
import { Tabs, Tab, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import { listCategoryTabSeries } from 'constants/listDataCategory';
import ROUTERS from 'constants/router';
import NoData from 'components/NoData';
import Loading from 'components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  ageCategory: Array<{
    id: number,
    ageGroup: string,
  }>,
  isProcessing: boolean,
  resetData: Function,
  totalAudio: number,
  totalPlay: number,
  totalMusic: number,
  dataSearchCategoryVideo: Array<{
    groupId: number,
    thumbnailUrl: string,
    mediaTypeId: number,
    groupName: string,
  }>,
  dataSearchCategoryMusic: Array<{
    groupId: number,
    thumbnailUrl: string,
    mediaTypeId: number,
    groupName: string,
  }>,
  dataSearchCategoryAudio: Array<{
    groupId: number,
    thumbnailUrl: string,
    mediaTypeId: number,
    groupName: string,
  }>,
  getTabActiveSubject: Function,
  // tabActiveSubject: Object,
  type: string,
  getLibrary: Function,
  getAgeCategory: Function,
  getTabActiveSeries: Function,
  tabActiveSeries: Object,
  ageIdMain: number,
  listSettingUser: Object,
  infoUser: Object,
};

const ListLibrary = ({
  history,
  ageCategory,
  isProcessing,
  dataSearchCategoryVideo,
  resetData,
  totalAudio,
  totalPlay,
  totalMusic,
  dataSearchCategoryMusic,
  dataSearchCategoryAudio,
  getTabActiveSubject,
  // tabActiveSubject,
  type,
  getLibrary,
  getAgeCategory,
  getTabActiveSeries,
  tabActiveSeries,
  ageIdMain,
  listSettingUser,
  infoUser,
}: Props) => {
  const [page, setPage] = useState(0);
  const [isActiveTab, setIsActiveTab] = useState(
    (tabActiveSeries && tabActiveSeries.isActiveTab) || 0
  );
  const [activeTab, setActiveTab] = useState(
    ageIdMain || (ageCategory && ageCategory[0]?.id)
  );
  const [loadImage, setLoadImage] = useState(true);
  const total = totalPlay + totalAudio + totalMusic;
  const [dataSort, setDataSort] = useState(dataSearchCategoryAudio);
  const [dataSortVideo, setDataSortVideo] = useState(dataSearchCategoryVideo);
  const [dataSortMusic, setDataSortMusic] = useState(dataSearchCategoryMusic);
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

  // useEffect(() => {
  //   setActiveTab((tabActiveSubject && tabActiveSubject.activeTab) || ageIdMain);
  // }, [ageIdMain, tabActiveSubject]);

  // call api get age category
  const getListAgeCategory = useCallback(() => {
    getAgeCategory();
  }, [getAgeCategory]);

  useEffect(() => {
    getListAgeCategory();
  }, [getListAgeCategory]);

  // call api search category
  useEffect(() => {
    if (activeTab) {
      getLibrary({
        ageId: activeTab,
        mediaTypeId: isActiveTab,
        page,
      });
    }
  }, [getLibrary, isActiveTab, activeTab, page]);

  useEffect(() => {
    if (type === 'GET_LIBRARY_SUCCESS') {
      setDataSort(dataSearchCategoryAudio);
      setDataSortVideo(dataSearchCategoryVideo);
      setDataSortMusic(dataSearchCategoryMusic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (!listSettingUser.ageId) {
      history.push(ROUTERS.SETTING_INTEREST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render list data audio
  const renderStrawberry =
    dataSort?.length > 0 ? (
      dataSort &&
      dataSort.map((item) => {
        return (
          <div
            className="search-wrapper__list-music"
            key={item.groupId}
            onClick={() => {
              history.push({
                pathname: `${ROUTERS.LIBRARY}/${item?.groupId}`,
                state: {
                  groupName: item.groupName,
                },
              });
              getTabActiveSubject({ activeTab });
              getTabActiveSeries({ isActiveTab });
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
            className="search-wrapper__list-music"
            key={item.groupId}
            onClick={() => {
              history.push({
                pathname: `${ROUTERS.LIBRARY}/${item?.groupId}`,
                state: {
                  groupName: item.groupName,
                },
              });
              getTabActiveSubject({ activeTab });
              getTabActiveSeries({ isActiveTab });
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
          key={item.groupId}
          onClick={() => {
            history.push({
              pathname: `${ROUTERS.LIBRARY}/${item?.groupId}`,
              state: {
                groupName: item.groupName,
              },
            });
            getTabActiveSubject({ activeTab });
            getTabActiveSeries({ isActiveTab });
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
  };

  // active button when click title
  const handleTab = (e) => {
    setIsActiveTab(e);
    resetData();
    setPage(0);
  };

  const renderButton =
    listCategoryTabSeries.length > 0 &&
    listCategoryTabSeries.map((item) => {
      return (
        <Button
          customClass={`button--primary ${
            isActiveTab === item.category ? 'active' : ''
          }`}
          onClick={() => {
            setIsActiveTab(item.category);
            resetData();
            setPage(0);
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
      default:
        break;
    }
    return tab;
  };

  const renderTabForAge =
    ageCategory &&
    ageCategory.map((item) => (
      <Tab
        eventKey={item?.id}
        title={<p>{item?.ageGroup}</p>}
        id={item.id}
        key={item?.id}
        disabled={parseInt(activeTab, 10) === item.id}
        tabClassName="custom-tab"
      >
        <div className="search-wrapper__list-button">{renderButton}</div>
        <>
          {total > 0 && (
            <div className="strawberry__top search-wrapper__top">
              {renderTotal(isActiveTab)}
            </div>
          )}
          {(isActiveTab === 1 || isActiveTab === 0) && (
            <div className="search-wrapper__listVideo">
              <div className="strawberry__listAudio list-audio">
                {isActiveTab === 0 && (
                  <div
                    className={`search-wrapper__listVideo__total first-total ${
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
                <div className="search-wrapper__listVideo__items">
                  {renderStrawberry}
                </div>
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
      default:
        break;
    }
    return hasMoreScroll;
  };
  return (
    <MainLayout
      customClass="page-search-detail page-library"
      titleHeader="라이브러리"
      isShowHeader
      isLink={infoUser?.userType !== 'LOCAL'}
      isShowIcon
      isShowIconBackFunction
      iconBackFunction={() => {
        history.go(-1);
        getTabActiveSeries({ isActiveTab: 0 });
      }}
    >
      {isProcessing && page < 1 ? (
        <Loading />
      ) : (
        <>
          {isActiveTab !== 0 ? (
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
                  {renderTabForAge}
                </Tabs>
              </div>
            </InfiniteScroll>
          ) : (
            <div className="strawberry">
              <Tabs
                defaultActiveKey={activeTab}
                onSelect={(eventKey) => onSelect(eventKey)}
              >
                {renderTabForAge}
              </Tabs>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default memo<Props>(ListLibrary);
