// @flow

import React, { memo, useState } from 'react';
import NoData from 'components/NoData';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';

type Props = {
  dataVideo: Array<{
    productId: number,
    materialName: string,
    thumbnailUrl: string,
  }>,
  history: {
    push: Function,
  },
  handleSetActiveTab: Function,
};
const ItemSeries = ({ dataVideo, history, handleSetActiveTab }: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const renderListVideo =
    dataVideo?.length > 0 ? (
      dataVideo.map((item) => (
        <div className="item" key={item.productId}>
          <div
            className="item--image"
            onClick={() => {
              handleSetActiveTab();
              history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
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
            <img src={IMAGES.icon_play_T} alt="" className="icon-play" />
          </div>
          <div className="title">
            {/* <span>{item.materialName}</span>  */}
            {item.materialName}
          </div>
        </div>
      ))
    ) : (
      <NoData text="공지사항이 없습니다." />
    );
  return <div className="wrapper-video list-video">{renderListVideo}</div>;
};

export default memo<Props>(ItemSeries);
