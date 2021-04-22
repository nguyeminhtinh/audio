// @flow
import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import NoData from 'components/NoData';
import Loading from 'components/Loading';
import { convertTime } from '../../../utils/Helpers';

type Props = {
  dataCategoryMusic: Array<{
    productId: number,
    productName: string,
    thumbnailUrl: string,
    keywords: any,
    likeCount: number,
    duration: number,
    playCount: number,
  }>,
  history: {
    push: Function,
  },
  handleTab?: Function,
  isActiveTab: number,
  activeTabMy: Function,
  activeTab: string,
  handleShowPlayer: Function,
  totalMusic: number,
  saveTypeReport: Function,
  isProcessing: boolean,
  page: number,
};
const ItemAudio = ({
  dataCategoryMusic,
  history,
  handleTab = () => {},
  isActiveTab,
  activeTabMy,
  activeTab,
  handleShowPlayer,
  totalMusic,
  saveTypeReport,
  isProcessing,
  page,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  // render list item Music
  const renderListItem =
    dataCategoryMusic &&
    dataCategoryMusic.map((item) => (
      <div
        className="strawberry__listAudio__items bestFriend item-music"
        key={item.productId}
      >
        <div
          className="d-flex box-left"
          onClick={() => {
            history.push(`${ROUTERS.MUSIC}/${item.productId}`);
            activeTabMy(activeTab);
            saveTypeReport(2);
          }}
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
        >
          <div className="strawberry__listAudio__items__left">
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
    ));
  return (
    <>
      {isProcessing && page < 1 ? (
        <Loading />
      ) : (
        <>
          {dataCategoryMusic?.length > 0 ? (
            <div>
              {isActiveTab === 0 && (
                <>
                  <div
                    className="wrapper-number-count"
                    onClick={() => handleTab(3)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                  >
                    뮤직{' '}
                    <span>{totalMusic && totalMusic.toLocaleString('en')}</span>
                    <img src={IMAGES.icon_arrow_B} alt="" />
                  </div>
                  <div className="search-wrapper__listVideo__items">
                    {renderListItem}
                  </div>
                </>
              )}
              <div className="wrapper-tab-my__custom-scroll">
                {isActiveTab === 3 && <>{renderListItem}</>}
              </div>
            </div>
          ) : (
            <>
              {isActiveTab === 3 ? (
                <NoData text="해당 콘텐츠가 없습니다." />
              ) : (
                <div
                  className="wrapper-number-count"
                  onClick={() => handleTab(3)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                >
                  뮤직{' '}
                  <span>{totalMusic && totalMusic.toLocaleString('en')}</span>
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
