// @flow

import React, { memo, useState } from 'react';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';

type Props = {
  dataSlide: Array<{
    id: number,
    thumbnailUrl: string,
    materialName: string,
    flowType: string,
    mediaTypeId: number,
    productId: number,
  }>,
  history: {
    push: Function,
  },
  saveTypeReport: Function,
  setAutoPlay: Function,
};

const ItemSound = ({
  dataSlide,
  history,
  saveTypeReport,
  setAutoPlay,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const handleClickDetail = (item) => {
    history.push({
      pathname: `${ROUTERS.FLOW}/${item}`,
      state: {
        typeFlow: 2,
      },
    });
  };
  const switchPage = (data) => {
    if (data.mediaTypeId === 1) {
      history.push(`${ROUTERS.AUDIO_BOOK}/${data.productId}`);
      saveTypeReport(2);
    }
    if (data.mediaTypeId === 3) {
      history.push(`${ROUTERS.MUSIC}/${data.productId}`);
      saveTypeReport(2);
    }
    if (data.mediaTypeId === 2) {
      history.push(`${ROUTERS.PLAY_BOOK}/${data.productId}`);
      setAutoPlay(false);
      saveTypeReport(2);
    }
  };
  const renderListItem =
    dataSlide.length > 0 &&
    dataSlide.map((item) => {
      return (
        <div
          className={`item ${
            item?.flowType === 'BANNER' ? 'slide-banner' : ''
          }`}
        >
          <div
            className="group-action"
            onClick={() => {}}
            tabIndex={0}
            onKeyDown={() => {}}
            role="button"
          >
            <div className="item--image">
              <img
                src={
                  `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                  IMAGES.image_not_found
                }
                alt="img"
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
                onClick={() =>
                  item?.flowType === 'BANNER'
                    ? handleClickDetail(item.id)
                    : switchPage(item)
                }
                role="presentation"
              />
            </div>
            <div className="servies">{item.materialName}</div>
          </div>
        </div>
      );
    });
  return (
    <>
      {dataSlide?.length > 0 ? (
        <div className="list-item">{renderListItem}</div>
      ) : (
        <div className="no-data-play ml-0">
          <img src={IMAGES.image_none} alt="" className="image-none-slide" />
        </div>
      )}
    </>
  );
};

export default memo<Props>(ItemSound);
