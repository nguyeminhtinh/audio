// @flow

import React, { useState, memo, useRef, useCallback, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import Immutable from 'seamless-immutable';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import ROUTERS from 'constants/router';
import Input from 'components/Input';
import IMAGES from 'themes/images';
import Loading from 'components/Loading';
import { listCategoryTab, listSelect } from 'constants/listDataCategory';
import Button from 'components/Button';
import NoData from 'components/NoData';
import ModalPopup from 'components/Modal';
import ItemSearchSuccess from './itemSearchSuccess';
import ItemAgeOption from './LookItem/ItemAgeOption';
import ItemCategoryOption from './LookItem/ItemCategoryOption';
import ItemStrawberry from './LookItem/ItemStrawberry';
import HashTab from './LookItem/HashTab';
import ModalPopupItem from './ModalPopup';
import ItemSearchAutoComplete from './LookItem/itemSearchAutoComplete';
import { toDoSetMusicList, toDoAudioPlay } from '../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  subjectCategory: Array<{
    id: number,
    image: any,
    subject: string,
  }>,
  getKeySearchAutoComplete: Function,
  isProcessing: boolean,
  isProcessingSearch: boolean,
  listAudioBookAutoComplete: Array<{ id: number }>,
  listPlayBookAutoComplete: Array<{
    id: number,
  }>,
  listMusicAutoComplete: Array<{ id: number }>,
  getDataSearchDetail: Function,
  getCondition: Function,
  listCondition: Object,
  topKeywords: Array<{
    id: number,
    name: string,
  }>,
  ageCategorySearch: Array<{
    id: number,
  }>,
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
  }>,
  getPage: Function,
  pageActive: number,
  setAutoPlay: Function,
  getTabActive: Function,
  getTabActiveSubject: Function,
  getKeySearch: Function,
  keySearchPre: Object,
  setStatusPlay: Function,
  type: string,
  dataSearchEmpty: Array<{
    thumbnailUrl: string,
    materialName: string,
    mediaTypeId: number,
    productId: number,
  }>,
  listSeriesAutoComplete: Array<{ id: number }>,
  totalSeries: number,
  dataSearchCategorySeries: Array<{
    groupId: number,
    thumbnailUrl: string,
    mediaTypeId: number,
    groupName: string,
  }>,
  saveTypeReport: Function,
  listSettingUser: Object,
  infoUser: Object,
  saveHistorySearchDetail: Function,
};

const Search = ({
  history,
  subjectCategory,
  getKeySearchAutoComplete,
  isProcessing,
  listAudioBookAutoComplete,
  listPlayBookAutoComplete,
  listMusicAutoComplete,
  getDataSearchDetail,
  getCondition,
  listCondition,
  topKeywords,
  isProcessingSearch,
  ageCategorySearch,
  dataSearchCategoryVideo,
  resetData,
  totalAudio,
  totalPlay,
  totalMusic,
  dataSearchCategoryMusic,
  dataSearchCategoryAudio,
  getPage,
  pageActive,
  setAutoPlay,
  getTabActive,
  getTabActiveSubject,
  getKeySearch,
  keySearchPre,
  setStatusPlay,
  type,
  dataSearchEmpty,
  listSeriesAutoComplete,
  totalSeries,
  dataSearchCategorySeries,
  saveTypeReport,
  listSettingUser,
  infoUser,
  saveHistorySearchDetail,
}: Props) => {
  const typingTimeoutRef = useRef(null);
  const [isShow, setIsShow] = useState(
    (keySearchPre && keySearchPre.isShowSuccess) || false
  );
  const [isShowModal, setIsShowModal] = useState(false);
  const [keySearch, setKeySearch] = useState(
    (keySearchPre && keySearchPre.keySearch) || ''
  );
  const [isActiveTab, setIsActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [defaultSelect, setDefaultSelect] = useState(listSelect[0]);
  const [page, setPage] = useState(0);
  const listPeers = listCondition && listCondition.peers;
  const [dataSort, setDataSort] = useState(dataSearchCategoryAudio);
  const [dataSortVideo, setDataSortVideo] = useState(dataSearchCategoryVideo);
  const [dataSortMusic, setDataSortMusic] = useState(dataSearchCategoryMusic);
  const [dataSortSeries, setDataSortSeries] = useState(
    dataSearchCategorySeries
  );
  const [methodSearch, setMethodSearch] = useState('NL');
  const total = totalAudio + totalMusic + totalPlay + totalSeries;
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
    if (!listSettingUser.ageId) {
      history.push(ROUTERS.SETTING_INTEREST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveTypeSearch = (value) => {
    setMethodSearch(value);
  };

  useEffect(() => {
    if (type === 'GET_DATA_SEARCH_DETAIL_SUCCESS') {
      setDataSort(dataSearchCategoryAudio);
      setDataSortVideo(dataSearchCategoryVideo);
      setDataSortMusic(dataSearchCategoryMusic);
      setDataSortSeries(dataSearchCategorySeries);
      saveHistorySearchDetail({
        cookie: 'test1',
        inputValue: keySearch,
        method: methodSearch,
        resultDsc: {
          AUDIO: totalAudio,
          PLAYBOOK: totalPlay,
          MUSIC: totalMusic,
        },
        resultTot: totalAudio + totalMusic + totalPlay,
        svcType: `${
          infoUser?.userType === 'LOCAL' ? 'DDALGICONG' : 'LOUNGE_DDALGICONG'
        }`,
        sysType: 'MOBILE',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, methodSearch]);

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

  // call api get condition
  const getListCondition = useCallback(() => {
    getCondition();
  }, [getCondition]);

  useEffect(() => {
    getListCondition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getListCondition]);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (keySearch) {
        getKeySearchAutoComplete(keySearch);
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySearch]);

  const handleChange = (e) => {
    if (e.length === 0) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
    setKeySearch(e);
  };

  const handleIsShowSelect = (boolean) => {
    setIsOpen(boolean);
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

  // setDefaultSelect
  const handleSetDefaultSelect = (itemDefault) => {
    setDefaultSelect(itemDefault);
    handleSort(renderContentSort(), itemDefault.id);
  };

  // call api search detail when click icon search
  useEffect(() => {
    if (keySearch.length > 0) {
      getDataSearchDetail(keySearch, {
        mediaTypeId: isActiveTab,
        page,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDataSearchDetail, isActiveTab, page]);

  const handleCheckSearch = () => {
    if (keySearch.length >= 2) {
      setIsShow(true);
      resetData();
      setIsActiveTab(0);
      getDataSearchDetail(keySearch, {
        mediaTypeId: 0,
        page: 0,
      });
    }
  };

  // handle search when click enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheckSearch();
    }
  };

  const switchPage = (data) => {
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
  };

  // render list age options
  const AgeOptions =
    ageCategorySearch &&
    ageCategorySearch.map((item) => {
      return (
        <ItemAgeOption
          itemObj={item}
          history={history}
          key={item.id}
          getTabActive={getTabActive}
        />
      );
    });

  // render list category options
  const categoryOptions =
    subjectCategory &&
    subjectCategory.map((item) => {
      return (
        <ItemCategoryOption
          itemObj={item}
          key={item.id}
          history={history}
          getTabActiveSubject={getTabActiveSubject}
        />
      );
    });

  const handlePlayAudio = (value) => {
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

  const handlePlayAudioBestFriend = (value) => {
    if (value.contentsUrl !== null) {
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

  const handleSwitchPlay = (productId) => {
    history.push(`${ROUTERS.PLAY_BOOK}/${productId}`);
    setAutoPlay(true);
  };

  // render list data strawberry
  const renderStrawberry =
    listPeers?.length > 0 ? (
      listPeers &&
      listPeers.map((item, index) => {
        return (
          <ItemStrawberry
            itemObj={item}
            key={item.productId}
            switchPage={switchPage}
            no={index + 1}
            handleShowPlayer={handlePlayAudioBestFriend}
            handleSwitchPlay={handleSwitchPlay}
          />
        );
      })
    ) : (
      <NoData text="준비 중입니다." />
    );

  const handleChangeButton = (item) => {
    setIsActiveTab(item.category);
    setPage(0);
    if (item.category === 0) {
      getDataSearchDetail(keySearch, {
        mediaTypeId: 0,
        page,
      });
    }
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
            handleChangeButton(item);
            resetData();
            setDefaultSelect(listSelect[0]);
          }}
          key={item.id}
          isDisabled={isActiveTab === item.category}
        >
          <p>{item.name}</p>
        </Button>
      );
    });

  const searchForKey = (item) => {
    setKeySearch(item.name);
    setIsShow(true);
    resetData();
    setPage(0);
    getDataSearchDetail(item.name, {
      mediaTypeId: isActiveTab,
      page,
    });
  };

  // List auto complete
  const renderListAudioBookAutoComplete =
    listAudioBookAutoComplete &&
    listAudioBookAutoComplete.map((item) => (
      <ItemSearchAutoComplete
        itemObj={item}
        key={item.id}
        keyCategory="audioBook"
        history={history}
        keySearch={keySearch}
        getKeySearch={getKeySearch}
        saveTypeReport={saveTypeReport}
        isShowSuccess={isShow}
        searchForKey={searchForKey}
        saveTypeSearch={saveTypeSearch}
      />
    ));

  const renderListPlayBookAutoComplete =
    listPlayBookAutoComplete &&
    listPlayBookAutoComplete.map((item) => (
      <ItemSearchAutoComplete
        itemObj={item}
        key={item.id}
        keyCategory="playBook"
        history={history}
        keySearch={keySearch}
        getKeySearch={getKeySearch}
        saveTypeReport={saveTypeReport}
        isShowSuccess={isShow}
        searchForKey={searchForKey}
        saveTypeSearch={saveTypeSearch}
      />
    ));

  const renderListMusicAutoComplete =
    listMusicAutoComplete &&
    listMusicAutoComplete.map((item) => (
      <ItemSearchAutoComplete
        itemObj={item}
        key={item.id}
        keyCategory="music"
        history={history}
        keySearch={keySearch}
        getKeySearch={getKeySearch}
        saveTypeReport={saveTypeReport}
        isShowSuccess={isShow}
        searchForKey={searchForKey}
        saveTypeSearch={saveTypeSearch}
      />
    ));

  const renderListSeriesAutoComplete =
    listSeriesAutoComplete &&
    listSeriesAutoComplete.map((item) => (
      <ItemSearchAutoComplete
        itemObj={item}
        key={item.id}
        keyCategory="series"
        history={history}
        keySearch={keySearch}
        getKeySearch={getKeySearch}
        saveTypeReport={saveTypeReport}
        isShowSuccess={isShow}
        searchForKey={searchForKey}
        saveTypeSearch={saveTypeSearch}
      />
    ));

  // active button when click title
  const handleTab = (e) => {
    setIsActiveTab(e);
    resetData();
  };
  const handleCheckBack = () => {
    if (keySearch.length > 0) {
      setKeySearch('');
      getKeySearch({ keySearch: '', isShowSuccess: false });
    } else {
      history.go(-1);
      getKeySearch({ keySearch: '', isShowSuccess: false });
    }
  };

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
      customClass=""
      titleHeader="검색"
      isShowHeader
      isLink={infoUser?.userType !== 'LOCAL'}
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      <div className="search-wrapper input-border-none">
        <Input
          type="text"
          value={keySearch}
          isShowIcon
          handleSearch={handleCheckSearch}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="검색어를 입력하세요."
          onKeyPress={(e) => handleKeyPress(e)}
        />

        {/* Modal list search auto complete */}
        {!isShow && keySearch.length > 0 && (
          <div>
            {isProcessingSearch ? (
              <Loading />
            ) : (
              <div>
                {listAudioBookAutoComplete?.length > 0 && (
                  <div className="search-wrapper__list-item search-audioBook">
                    <h3>오디오북</h3>
                    {renderListAudioBookAutoComplete}
                  </div>
                )}
                {listPlayBookAutoComplete?.length > 0 && (
                  <div className="search-wrapper__list-item search-playBook">
                    <h3>플레이북</h3>
                    {renderListPlayBookAutoComplete}
                  </div>
                )}
                {listMusicAutoComplete?.length > 0 && (
                  <div className="search-wrapper__list-item search-music">
                    <h3>뮤직</h3>
                    {renderListMusicAutoComplete}
                  </div>
                )}
                {listSeriesAutoComplete?.length > 0 && (
                  <div className="search-wrapper__list-item search-music">
                    <h3>시리즈</h3>
                    {renderListSeriesAutoComplete}
                  </div>
                )}
                {/* Nodata search auto complete */}
                {listAudioBookAutoComplete?.length === 0 &&
                  listPlayBookAutoComplete?.length === 0 &&
                  listMusicAutoComplete?.length === 0 &&
                  listSeriesAutoComplete?.length === 0 && (
                    <NoData text="해당 콘텐츠가 없습니다." />
                  )}
              </div>
            )}
          </div>
        )}

        {isShow && keySearch.length > 0 && (
          <div className="search-success">
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
                    <>
                      <div className="search-wrapper__list-button pb-15">
                        {renderButton}
                      </div>
                      <ItemSearchSuccess
                        history={history}
                        handleOpenSelect={() => setIsOpen(true)}
                        itemSelect={defaultSelect?.value}
                        isActiveTab={isActiveTab}
                        topKeywords={topKeywords}
                        handleTab={handleTab}
                        totalAudio={totalAudio}
                        totalMusic={totalMusic}
                        totalPlay={totalPlay}
                        dataSearchCategoryVideo={dataSortVideo}
                        dataSearchCategoryMusic={dataSortMusic}
                        dataSearchCategoryAudio={dataSort}
                        dataSearchCategorySeries={dataSortSeries}
                        dataSearchEmpty={dataSearchEmpty}
                        getPage={getPage}
                        pageActive={pageActive}
                        handleShowPlayer={handlePlayAudio}
                        handleSwitchPlay={() => setAutoPlay(false)}
                        searchForKey={searchForKey}
                        getKeySearch={getKeySearch}
                        keySearch={keySearch}
                        totalSeries={totalSeries}
                        saveTypeReport={saveTypeReport}
                        isShowSuccess={isShow}
                      />
                    </>
                  </InfiniteScroll>
                ) : (
                  <>
                    {total > 0 && isActiveTab === 0 && (
                      <div className="search-wrapper__list-button pb-15">
                        {renderButton}
                      </div>
                    )}

                    <ItemSearchSuccess
                      history={history}
                      handleOpenSelect={() => setIsOpen(true)}
                      itemSelect={defaultSelect?.value}
                      isActiveTab={isActiveTab}
                      topKeywords={topKeywords}
                      handleTab={handleTab}
                      totalAudio={totalAudio}
                      totalMusic={totalMusic}
                      totalPlay={totalPlay}
                      dataSearchCategoryVideo={dataSortVideo}
                      dataSearchCategoryMusic={dataSortMusic}
                      dataSearchCategoryAudio={dataSort}
                      dataSearchCategorySeries={dataSortSeries}
                      dataSearchEmpty={dataSearchEmpty}
                      getPage={getPage}
                      pageActive={pageActive}
                      handleShowPlayer={handlePlayAudio}
                      handleSwitchPlay={() => setAutoPlay(false)}
                      searchForKey={searchForKey}
                      getKeySearch={getKeySearch}
                      keySearch={keySearch}
                      totalSeries={totalSeries}
                      saveTypeReport={saveTypeReport}
                      isShowSuccess={isShow}
                    />
                  </>
                )}
              </>
            )}
          </div>
        )}
        {keySearch.length === 0 && (
          <>
            {isProcessing ? (
              <Loading />
            ) : (
              <>
                <HashTab
                  topKeywords={topKeywords}
                  history={history}
                  searchForKey={searchForKey}
                  saveTypeSearch={saveTypeSearch}
                />
                <h2 className="search-wrapper__title-age">연령별 찾기</h2>
                <div className="search-wrapper__age">{AgeOptions}</div>
                <h2 className="search-wrapper__title-age custom-title-age">
                  분야별 찾기
                </h2>
                <div className="search-wrapper__chooseInterest__list">
                  {categoryOptions}
                </div>
                <div className="search-wrapper__best-friend">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="search-wrapper__best-friend__title">
                      또래 친구 베스트
                    </div>
                    <div
                      className="action"
                      onClick={() => history.push(ROUTERS.BEST_FRIENDS_DETAIL)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                    >
                      <img src={IMAGES.btnDetail} alt="" />
                    </div>
                  </div>
                  {renderStrawberry}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Modal Popup */}
      <ModalPopupItem
        listSelect={listSelect}
        defaultSelect={defaultSelect}
        isShowSelect={isOpen}
        handleIsShowSelect={handleIsShowSelect}
        handleSetDefaultSelect={handleSetDefaultSelect}
        handleChangeItem={() => {}}
      />
      <ModalPopup
        isOpen={isShowModal}
        isShowFooter
        handleClose={() => setIsShowModal(false)}
        handleSubmit={() => setIsShowModal(false)}
        customClassButton="w-100"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">
          검색어는 2자 이상 입력해 주시기 바랍니다.
        </div>
      </ModalPopup>
    </MainLayout>
  );
};
export default memo<Props>(Search);
