// @flow
import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import NoData from 'components/NoData';
import Loading from 'components/Loading';
import { convertTime } from '../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  handleTab?: Function,
  isActiveTab: number,
  activeTabMy: Function,
  activeTab: string,
  handleShowPlayer: Function,
  totalAudio: number,
  dataCategoryAudio: Array<{
    productId: number,
    productName: string,
    duration: any,
    playCount: number,
    likeCount: number,
    keywords: any,
    thumbnailUrl: string,
  }>,
  eventKey: number,
  saveTypeReport: Function,
  isProcessing: boolean,
  page: number,
};
const ItemAudio = ({
  history,
  handleTab = () => {},
  isActiveTab,
  activeTabMy,
  activeTab,
  handleShowPlayer,
  totalAudio,
  dataCategoryAudio,
  eventKey,
  saveTypeReport,
  isProcessing,
  page,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  // render list data audio
  const renderListAudio =
    dataCategoryAudio &&
    dataCategoryAudio.map((item) => {
      return (
        <div
          className="strawberry__listAudio__items bestFriend"
          key={item.productId}
        >
          <div
            className="d-flex box-left"
            onClick={() => {
              history.push(`${ROUTERS.AUDIO_BOOK}/${item.productId}`);
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
                {eventKey !== 4 ? (
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
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          {eventKey !== 4 ? (
            <div className="strawberry__listAudio__items__right">
              <img
                src={IMAGES.iconAudio}
                alt=""
                onClick={() => handleShowPlayer(item)}
                role="presentation"
              />
            </div>
          ) : (
            <div className="strawberry__listAudio__items__right">
              <img
                src={IMAGES.btn_record}
                alt=""
                onClick={() => handleShowPlayer(item)}
                role="presentation"
              />
            </div>
          )}
        </div>
      );
    });
  return (
    <>
      {isProcessing && page < 1 ? (
        <Loading />
      ) : (
        <>
          {dataCategoryAudio?.length > 0 ? (
            <div>
              {isActiveTab === 0 && (
                <div className="wrapper-tab-my__box-audio">
                  <div
                    className="wrapper-number-count"
                    onClick={() => handleTab(1)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                  >
                    오디오북{' '}
                    <span>{totalAudio && totalAudio.toLocaleString('en')}</span>
                    <img src={IMAGES.icon_arrow_B} alt="" />
                  </div>
                  {renderListAudio}
                </div>
              )}
              {isActiveTab === 1 && <>{renderListAudio}</>}
            </div>
          ) : (
            <>
              {isActiveTab === 1 ? (
                <NoData text="해당 콘텐츠가 없습니다." />
              ) : (
                <div
                  className="wrapper-number-count"
                  onClick={() => handleTab(1)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                >
                  오디오북{' '}
                  <span>{totalAudio && totalAudio.toLocaleString('en')}</span>
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
