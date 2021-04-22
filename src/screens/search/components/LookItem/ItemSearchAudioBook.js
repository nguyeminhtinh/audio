// @flow

import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import { convertTime } from '../../../../utils/Helpers';

type Props = {
  itemAudio: Array<{
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
  handleShowPlayer: Function,
  getKeySearch: Function,
  keySearch: string,
  saveTypeReport: Function,
  isShowSuccess: boolean,
};

const ItemSearchAudioBook = ({
  itemAudio,
  history,
  handleShowPlayer,
  getKeySearch,
  keySearch,
  saveTypeReport,
  isShowSuccess,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const renderAudio =
    itemAudio &&
    itemAudio.map((item) => {
      return (
        <div className="strawberry__listAudio__items " key={item?.productId}>
          <div
            className="d-flex box-left"
            onClick={() => {
              history.push(`${ROUTERS.AUDIO_BOOK}/${item?.productId}`);
              getKeySearch({ keySearch, isShowSuccess });
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
              <h3>{item?.productName}</h3>
              <div className="strawberry__listAudio__items__center__status">
                <div className="strawberry__listAudio__items__center__status__list-status">
                  <div className="strawberry__listAudio__items__center__status__list-status--time">
                    <img src={IMAGES.iconTime} alt="" />
                    <p>{item && convertTime(item?.duration)}</p>
                  </div>
                  <div className="strawberry__listAudio__items__center__status__list-status--time view">
                    <img src={IMAGES.iconPlayMini} alt="" />
                    <p>
                      {item && item.playCount
                        ? item.playCount.toLocaleString('en')
                        : 0}
                    </p>
                  </div>
                  <div className="strawberry__listAudio__items__center__status__list-status--time favorite">
                    <img src={IMAGES.iconHeartMini} alt="" />
                    <p>
                      {item &&
                        item.likeCount &&
                        item.likeCount.toLocaleString('en')}
                    </p>
                  </div>
                </div>
                <div className="strawberry__listAudio__items__center__status__list-category">
                  {item.keywords &&
                    item.keywords.map((items) => {
                      return (
                        <div
                          className="strawberry__listAudio__items__center__status__list-category--category"
                          key={items?.keywordId}
                        >
                          #{items?.name}
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
    });
  return <>{renderAudio}</>;
};

export default memo<Props>(ItemSearchAudioBook);
