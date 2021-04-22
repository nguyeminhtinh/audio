// @flow

import React, { memo, useState } from 'react';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';

type Props = {
  itemMusic: Array<{
    productId: number,
    thumbnailUrl: string,
    productName: string,
  }>,
  history: {
    push: Function,
  },
  getKeySearch: Function,
  keySearch: string,
  saveTypeReport: Function,
  isShowSuccess: boolean,
};

const ItemSearchMusic = ({
  itemMusic,
  history,
  getKeySearch,
  keySearch,
  saveTypeReport,
  isShowSuccess,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const renderMusic =
    itemMusic &&
    itemMusic.map((item) => {
      return (
        <div
          className="search-wrapper__list-music"
          onClick={() => {
            history.push(`${ROUTERS.MUSIC}/${item.productId}`);
            getKeySearch({ keySearch, isShowSuccess });
            saveTypeReport(2);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          key={item.productId}
        >
          <div className="item--image">
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
          </div>
          <div className="item--title">{item.productName}</div>
        </div>
      );
    });
  return <>{renderMusic}</>;
};

export default memo<Props>(ItemSearchMusic);
