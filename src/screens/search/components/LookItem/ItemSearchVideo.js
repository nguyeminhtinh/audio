// @flow

import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import { convertTime } from '../../../../utils/Helpers';

type Props = {
  itemPlay: Array<{
    productId: number,
    thumbnailUrl: string,
    productName: string,
    duration: number,
    playCount: number,
    likeCount: number,
    keywords: any,
  }>,
  history: {
    push: Function,
  },
  handleSwitchPlay: Function,
  getKeySearch: Function,
  keySearch: string,
  saveTypeReport: Function,
  isShowSuccess: boolean,
};

const ItemSearchVideo = ({
  itemPlay,
  history,
  handleSwitchPlay,
  getKeySearch,
  keySearch,
  saveTypeReport,
  isShowSuccess,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const renderVideo =
    itemPlay &&
    itemPlay.map((item) => {
      return (
        <div
          className="search-wrapper__listVideo__items__video"
          key={item?.productId}
        >
          <img
            src={
              `https://down.wjthinkbig.com${item?.thumbnailUrl}` ||
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
          <div
            className="search-wrapper__listVideo__items__video__icon-play"
            onClick={() => {
              history.push(`${ROUTERS.PLAY_BOOK}/${item?.productId}`);
              handleSwitchPlay();
              getKeySearch({ keySearch, isShowSuccess });
              saveTypeReport(2);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            <img src={IMAGES.icon_play} alt="" />
          </div>
          <h2>{item?.productName}</h2>
          <div className="search-wrapper__listVideo__items__video__list-status">
            <div className="search-wrapper__listVideo__items__video__list-status--time">
              <img src={IMAGES.iconTime} alt="" />
              <p>{item && convertTime(item?.duration)}</p>
            </div>
            <div className="search-wrapper__listVideo__items__video__list-status--time view">
              <img src={IMAGES.iconPlayMini} alt="" />
              <p>
                {item && item.likeCount && item.likeCount.toLocaleString('en')}
              </p>
            </div>
            <div className="search-wrapper__listVideo__items__video__list-status--time favorite">
              <img src={IMAGES.iconHeartMini} alt="" />
              <p>
                {item && item.playCount
                  ? item.playCount.toLocaleString('en')
                  : 0}
              </p>
            </div>
          </div>
          <div className="search-wrapper__listVideo__items__video__list-category">
            {item &&
              item.keywords &&
              item.keywords.map((items) => {
                return (
                  <div
                    className="search-wrapper__listVideo__items__video__list-category--category"
                    key={items?.keywordId}
                  >
                    {items?.name}
                  </div>
                );
              })}
          </div>
        </div>
      );
    });
  return <>{renderVideo}</>;
};

export default memo<Props>(ItemSearchVideo);
