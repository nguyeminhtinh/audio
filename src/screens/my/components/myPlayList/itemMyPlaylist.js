/* eslint-disable react/jsx-fragments */
// @flow
import listItem from 'constants/listItemPrivate';
import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';

type Props = {
  quantity: number,
  id: number,
  isPrivate: boolean,
  title: string,
  totalCount: number,
  onEdit: Function,
  handleClick: Function,
  likeCount: number,
  thumbnailUrl: any,
  nickName: string,
  dataList: Array<{
    id: number,
  }>,
};

const ItemMyPlaylist = ({
  quantity,
  id,
  isPrivate,
  title,
  totalCount,
  onEdit,
  handleClick,
  likeCount,
  thumbnailUrl,
  nickName,
  dataList,
}: Props) => {
  const data = {
    isPrivate,
    title,
    disclose: isPrivate ? listItem[0] : listItem[1],
    topic: dataList,
    nickName,
    id,
  };
  const [loadImage, setLoadImage] = useState(true);
  return (
    <div className="strawberry__listAudio__items bestFriend">
      <div
        className="d-flex box-left"
        onClick={() => handleClick(id)}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
      >
        {quantity === 1 && (
          <div className="strawberry__listAudio__items__left">
            {thumbnailUrl?.length > 0 ? (
              thumbnailUrl.map((items) => (
                <img
                  src={`https://down.wjthinkbig.com${items.thumbnailUrl}`}
                  alt=""
                  onError={(e) => {
                    if (loadImage) {
                      setLoadImage({
                        loadImage: false,
                      });
                      e.target.src = IMAGES.image_not_found;
                    }
                  }}
                />
              ))
            ) : (
              <img src={IMAGES.image_not_found} alt="" />
            )}
          </div>
        )}
        {quantity === 2 && (
          <div className="strawberry__listAudio__items__left items-left2">
            {thumbnailUrl &&
              thumbnailUrl.map((items) => (
                <img
                  src={`https://down.wjthinkbig.com${items.thumbnailUrl}`}
                  alt=""
                  onError={(e) => {
                    if (loadImage) {
                      setLoadImage({
                        loadImage: false,
                      });
                      e.target.src = IMAGES.image_not_found;
                    }
                  }}
                />
              ))}
          </div>
        )}
        {quantity === 3 && (
          <div className="strawberry__listAudio__items__left items-left3">
            {thumbnailUrl &&
              thumbnailUrl.map((items) => (
                <img
                  src={`https://down.wjthinkbig.com${items.thumbnailUrl}`}
                  alt=""
                  onError={(e) => {
                    if (loadImage) {
                      setLoadImage({
                        loadImage: false,
                      });
                      e.target.src = IMAGES.image_not_found;
                    }
                  }}
                />
              ))}
          </div>
        )}
        {quantity >= 4 && (
          <div className="strawberry__listAudio__items__left items-left4">
            {thumbnailUrl &&
              thumbnailUrl.map((items) => (
                <img
                  src={`https://down.wjthinkbig.com${items.thumbnailUrl}`}
                  alt=""
                  onError={(e) => {
                    if (loadImage) {
                      setLoadImage({
                        loadImage: false,
                      });
                      e.target.src = IMAGES.image_not_found;
                    }
                  }}
                />
              ))}
          </div>
        )}
        <div className="strawberry__listAudio__items__center playlist">
          <h3>
            {title}
            {isPrivate && <img src={IMAGES.icon_lock} alt="" />}
          </h3>
          <div className="strawberry__listAudio__items__center__status">
            <div className="strawberry__listAudio__items__center__status__description">
              <p>
                음원 <span>{totalCount.toLocaleString('en')}개</span>
              </p>
            </div>
            <div className="strawberry__listAudio__items__center__status__list-status list-playlist">
              {/* <div className="strawberry__listAudio__items__center__status__list-status--time view">
                <img src={IMAGES.iconPlayMini} alt="" />
                <p>{totalCount.toLocaleString('en')}</p>
              </div> */}
              <div className="strawberry__listAudio__items__center__status__list-status--time favorite">
                <img src={IMAGES.iconHeartMini} alt="" />
                <p>{likeCount.toLocaleString('en')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="strawberry__listAudio__items__right text-right">
        <img
          className="more-btn"
          src={IMAGES.icon_btn_more_b}
          alt=""
          role="presentation"
          onClick={() => onEdit(data, dataList)}
        />
      </div>
    </div>
  );
};

export default memo<Props>(ItemMyPlaylist);
