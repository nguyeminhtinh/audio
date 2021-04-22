// @flow

import React, { memo } from 'react';
import IMAGES from 'themes/images';
import NoData from 'components/NoData';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ROUTERS from 'constants/router';
import ItemSearchAudioBook from './LookItem/ItemSearchAudioBook';
import ItemSearchVideo from './LookItem/ItemSearchVideo';
import ItemSearchMusic from './LookItem/ItemSearchMusic';
import ItemSearchSeries from './LookItem/ItemSearchSeries';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type Props = {
  handleOpenSelect: Function,
  itemSelect: string,
  isActiveTab: number,
  history: {
    push: Function,
  },
  topKeywords: Array<{
    id: number,
    name: string,
  }>,
  handleTab: Function,
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
  dataSearchCategorySeries: Array<{
    groupId: number,
    thumbnailUrl: string,
    mediaTypeId: number,
    groupName: string,
  }>,
  getPage: Function,
  handleShowPlayer: Function,
  handleSwitchPlay: Function,
  searchForKey: Function,
  getKeySearch: Function,
  keySearch: string,
  dataSearchEmpty: Array<{
    thumbnailUrl: string,
    materialName: string,
    mediaTypeId: number,
    productId: number,
  }>,
  totalSeries: number,
  saveTypeReport: Function,
  isShowSuccess: boolean,
};

const ItemSearchSuccess = ({
  handleOpenSelect,
  itemSelect,
  isActiveTab,
  history,
  topKeywords,
  handleTab,
  dataSearchCategoryVideo,
  totalAudio,
  totalPlay,
  totalMusic,
  dataSearchCategoryMusic,
  dataSearchCategoryAudio,
  getPage,
  handleShowPlayer,
  handleSwitchPlay,
  searchForKey,
  getKeySearch,
  keySearch,
  dataSearchEmpty,
  totalSeries,
  dataSearchCategorySeries,
  saveTypeReport,
  isShowSuccess,
}: Props) => {
  const total = totalPlay + totalAudio + totalMusic + totalSeries;

  const renderTotal = (tab) => {
    switch (tab) {
      case 0:
        return <span>총 {total}개</span>;
      case 1:
        return <span>총 {totalAudio}개</span>;
      case 2:
        return <span>총 {totalPlay}개</span>;
      case 3:
        return <span>총 {totalMusic}개</span>;
      case 4:
        return <span>총 {totalSeries}개</span>;
      default:
        break;
    }
    return tab;
  };
  const switchPage = (data) => {
    if (data.mediaTypeId === 0) {
      history.push(`${ROUTERS.AUDIO_BOOK}/${data.productId}`);
      saveTypeReport(2);
    }
    if (data.mediaTypeId === 1) {
      history.push(`${ROUTERS.MUSIC}/${data.productId}`);
      saveTypeReport(2);
    }
    if (data.mediaTypeId === 2) {
      history.push(`${ROUTERS.PLAY_BOOK}/${data.productId}`);
      handleSwitchPlay();
      saveTypeReport(2);
    }
  };

  const renderListItem =
    dataSearchEmpty &&
    dataSearchEmpty.length > 0 &&
    dataSearchEmpty.map((item) => (
      <SwiperSlide key={item.productId}>
        <div
          className=""
          key={item.productId}
          onClick={() => {
            switchPage(item);
            getKeySearch({ keySearch, isShowSuccess });
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
                e.target.src = IMAGES.image_not_found;
              }}
            />
          </div>
          <div className="item--title">{item.materialName}</div>
        </div>
      </SwiperSlide>
    ));

  return (
    <>
      {total > 0 ? (
        <>
          {total > 0 && (
            <h4 className="search-wrapper__total-search">
              {renderTotal(isActiveTab)}
              {isActiveTab !== 0 && isActiveTab !== 4 && (
                <div
                  className="search-wrapper__total-search__right"
                  onClick={handleOpenSelect}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                >
                  <p>{itemSelect}</p>
                  <img src={IMAGES.icon_arrow_down} alt="" />
                </div>
              )}
            </h4>
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
                  itemSeries={dataSearchCategorySeries}
                  history={history}
                  isActiveTab={isActiveTab}
                  getKeySearch={getKeySearch}
                  keySearch={keySearch}
                  saveTypeReport={saveTypeReport}
                  isShowSuccess={isShowSuccess}
                />
              </div>
            </div>
          )}
          {(isActiveTab === 1 || isActiveTab === 0) && (
            <div className="search-wrapper__listVideo">
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
                    <span>{totalAudio && totalAudio.toLocaleString('en')}</span>
                  </h2>
                  <img src={IMAGES.iconArrowMiniB} alt="" />
                </div>
              )}
              <div className="strawberry__listAudio">
                <ItemSearchAudioBook
                  itemAudio={dataSearchCategoryAudio}
                  history={history}
                  totalAudio={totalAudio}
                  isActiveTab={isActiveTab}
                  getPage={getPage}
                  handleShowPlayer={handleShowPlayer}
                  getKeySearch={getKeySearch}
                  keySearch={keySearch}
                  saveTypeReport={saveTypeReport}
                  isShowSuccess={isShowSuccess}
                />
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
                    플레이북{' '}
                    <span>{totalPlay && totalPlay.toLocaleString('en')}</span>
                  </h2>
                  <img src={IMAGES.iconArrowMiniB} alt="" />
                </div>
              )}
              <div className="search-wrapper__listVideo__items">
                <ItemSearchVideo
                  itemPlay={dataSearchCategoryVideo}
                  history={history}
                  totalPlay={totalPlay}
                  isActiveTab={isActiveTab}
                  getPage={getPage}
                  handleSwitchPlay={handleSwitchPlay}
                  getKeySearch={getKeySearch}
                  keySearch={keySearch}
                  saveTypeReport={saveTypeReport}
                  isShowSuccess={isShowSuccess}
                />
              </div>
            </div>
          )}
          {(isActiveTab === 3 || isActiveTab === 0) && (
            <div className="search-wrapper__listVideo">
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
                    뮤직{' '}
                    <span>{totalMusic && totalMusic.toLocaleString('en')}</span>
                  </h2>
                  <img src={IMAGES.iconArrowMiniB} alt="" />
                </div>
              )}
              <div className="search-wrapper__listVideo__items">
                <ItemSearchMusic
                  itemMusic={dataSearchCategoryMusic}
                  history={history}
                  totalMusic={totalMusic}
                  isActiveTab={isActiveTab}
                  getPage={getPage}
                  getKeySearch={getKeySearch}
                  keySearch={keySearch}
                  saveTypeReport={saveTypeReport}
                  isShowSuccess={isShowSuccess}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="search-wrapper__list-history">
          <p>인기 검색어</p>
          <div className="search-wrapper__list-history__items">
            {topKeywords &&
              topKeywords.map((item) => {
                return (
                  <p
                    key={item.id}
                    onClick={() => searchForKey(item)}
                    role="presentation"
                  >
                    #{item.name}
                  </p>
                );
              })}
          </div>
          <NoData text="해당 콘텐츠가 없습니다" />
          <div className="audioBook__tab__related__list-audio">
            <div className="audioBook__tab__related__list-audio__wrapper d-flex justify-content-between align-items-center p-0">
              <div className="audioBook__tab__related__list-audio__wrapper__title">
                이런 콘텐츠는 어떠세요?
              </div>
            </div>
            <div className="audioBook__tab__related__list-audio__wrapper__content pl-0 pr-0">
              <Swiper slidesPerView="auto" spaceBetween={9}>
                {renderListItem}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo<Props>(ItemSearchSuccess);
