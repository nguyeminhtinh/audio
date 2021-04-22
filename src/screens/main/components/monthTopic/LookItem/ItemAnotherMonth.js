// @flow

import React, { memo, useState } from 'react';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';

type Props = {
  itemObj: Object,
  history: {
    push: Function,
  },
};

const ItemAnotherMonth = ({ history, itemObj }: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  return (
    <div
      className="strawberry__titleThemes"
      onClick={() => history.push(`${ROUTERS.MONTH_TOPIC}/${itemObj.themeId}`)}
      tabIndex={0}
      role="button"
      onKeyDown={() => {}}
    >
      <div className="strawberry__titleThemes__left">
        <img
          src={
            `https://down.wjthinkbig.com${itemObj?.mainThumbnailUrl}` ||
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
        />
      </div>
      <div className="strawberry__titleThemes__right">
        <h2>{itemObj?.title}</h2>
        <p>{itemObj?.description}</p>
      </div>
    </div>
  );
};

export default memo<Props>(ItemAnotherMonth);
