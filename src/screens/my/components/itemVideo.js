// @flow
import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import NoData from 'components/NoData';
import Loading from 'components/Loading';
import { convertTime } from '../../../utils/Helpers';

type Props = {
  dataCategoryVideo: Array<{
    productId: number,
    productName: string,
    duration: any,
    playCount: number,
    likeCount: number,
    keywords: any,
    thumbnailUrl: string,
  }>,
  history: {
    push: Function,
  },
  handleTab?: Function,
  isActiveTab: number,
  activeTabMy: Function,
  activeTab: string,
  setAutoPlay: Function,
  totalPlay: number,
  saveTypeReport: Function,
  isProcessing: boolean,
  page: number,
};
const ItemAudio = ({
  dataCategoryVideo,
  history,
  handleTab = () => {},
  isActiveTab,
  activeTabMy,
  activeTab,
  setAutoPlay,
  totalPlay,
  saveTypeReport,
  isProcessing,
  page,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  // render list video data search
  const renderVideoSearch =
    dataCategoryVideo &&
    dataCategoryVideo.map((item) => {
      return (
        <div
          className="search-wrapper__listVideo__items__video"
          key={item.productId}
          onClick={() => {
            history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
            activeTabMy(activeTab);
            setAutoPlay(false);
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
              <p>{item && item.playCount.toLocaleString('en')}</p>
            </div>
            <div className="search-wrapper__listVideo__items__video__list-status--time favorite">
              <img src={IMAGES.iconHeartMini} alt="" />
              <p>{item && item.likeCount.toLocaleString('en')}</p>
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
    });
  return (
    <>
      {isProcessing && page < 1 ? (
        <Loading />
      ) : (
        <>
          {dataCategoryVideo?.length > 0 ? (
            <div>
              {isActiveTab === 0 && (
                <>
                  <div
                    className="wrapper-number-count"
                    onClick={() => handleTab(2)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                  >
                    플레이북{' '}
                    <span>{totalPlay && totalPlay.toLocaleString('en')}</span>
                    <img src={IMAGES.icon_arrow_B} alt="" />
                  </div>
                  <div className="search-wrapper__listVideo__items">
                    {renderVideoSearch}
                  </div>
                </>
              )}
              <div className="wrapper-tab-my__custom-scroll">
                {isActiveTab === 2 && <>{renderVideoSearch}</>}
              </div>
            </div>
          ) : (
            <>
              {isActiveTab === 2 ? (
                <NoData text="해당 콘텐츠가 없습니다." />
              ) : (
                <div
                  className="wrapper-number-count"
                  onClick={() => handleTab(2)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                >
                  플레이북{' '}
                  <span>{totalPlay && totalPlay.toLocaleString('en')}</span>
                  <img src={IMAGES.icon_arrow_B} alt="" />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
ItemAudio.defaultProps = {
  handleTab: () => {},
};
export default memo<Props>(ItemAudio);
