// @flow

import React, { memo, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type Props = {
  history: {
    push: Function,
  },
  dataStrawberryBeanDj: Array<{
    themeId: number,
    mainThumbnailUrl: string,
  }>,
};
const ItemStrawberryBean = ({ history, dataStrawberryBeanDj }: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const renderListItem =
    dataStrawberryBeanDj &&
    dataStrawberryBeanDj.map((item) => (
      <SwiperSlide
        key={item.themeId}
        onClick={() =>
          history.push(`${ROUTERS.STRAWBERRY_BEANS_DJ}/${item.themeId}`)
        }
        tabIndex={0}
        role="button"
        onKeyDown={() => {}}
      >
        <div className="strawTb">
          <img
            src={
              `https://down.wjthinkbig.com${item.mainThumbnailUrl}` ||
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
      </SwiperSlide>
    ));
  return (
    <>
      {dataStrawberryBeanDj?.length > 0 ? (
        <Swiper
          // loop
          slidesPerView="auto"
          spaceBetween={10}
          centeredSlides
          className="MainPage__playNow__container"
          pagination={{
            dynamicBullets: true,
          }}
        >
          {renderListItem}
        </Swiper>
      ) : (
        <div className="no-data-play mb-4">
          <img src={IMAGES.image_none} alt="" className="image-none-slide" />
        </div>
      )}
    </>
  );
};

export default memo<Props>(ItemStrawberryBean);
