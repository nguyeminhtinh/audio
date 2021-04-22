// @flow

import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';
import { convertTime } from '../../../../utils/Helpers';

type Props = {
  itemObj: Object,
  switchPage: Function,
  no: number,
  handleShowPlayer: Function,
  handleSwitchPlay: Function,
};

const ItemStrawberry = ({
  switchPage,
  itemObj,
  no,
  handleShowPlayer,
  handleSwitchPlay,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  return (
    <div className="strawberry__listAudio__items pl-0 mr-0 ml-0">
      <div
        className="d-flex box-left"
        onClick={() => switchPage(itemObj)}
        tabIndex={0}
        role="button"
        onKeyDown={() => {}}
      >
        <div className="strawberry__listAudio__items__left">
          <h2>{no < 10 ? `0${no}` : `${no}`}</h2>
          <img
            src={
              `https://down.wjthinkbig.com${itemObj?.thumbnailUrl}` ||
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
          <h3>{itemObj?.materialName}</h3>
          <p className="strawberry__listAudio__items__center__name-book">
            {itemObj?.groupName}
          </p>
          <div className="strawberry__listAudio__items__center__status">
            <div className="strawberry__listAudio__items__center__status__list-status mb-0 pb-0">
              <div className="strawberry__listAudio__items__center__status__list-status--time">
                <img src={IMAGES.iconTime} alt="" />
                <p>{itemObj && convertTime(itemObj.duration)}</p>
              </div>
              <div className="strawberry__listAudio__items__center__status__list-status--time view">
                <img src={IMAGES.iconPlayMini} alt="" />
                <p>
                  {itemObj &&
                    itemObj.playCount &&
                    itemObj.playCount.toLocaleString('en')}
                </p>
              </div>
              <div className="strawberry__listAudio__items__center__status__list-status--time favorite">
                <img src={IMAGES.iconHeartMini} alt="" />
                <p>{itemObj && itemObj.likeCount.toLocaleString('en')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="strawberry__listAudio__items__right">
        {itemObj.mediaType === '플레이북' ? (
          <img
            src={IMAGES.iconVideo}
            alt=""
            role="presentation"
            onClick={() => handleSwitchPlay(itemObj?.productId)}
          />
        ) : (
          <img
            src={IMAGES.iconAudio}
            alt=""
            onClick={() => handleShowPlayer(itemObj)}
            role="presentation"
          />
        )}
      </div>
    </div>
  );
};

export default memo<Props>(ItemStrawberry);
