// @flow

import React, { memo, useState } from 'react';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ROUTERS from 'constants/router';
import images from 'themes/images';

type Props = {
  history: {
    push: Function,
  },
  listBanners: Array<{
    tbProductId: number,
    id: number,
    bannerType: string,
    thumbnailUrl: string,
    linkUrl: string,
    type: string,
    imgUrl: string,
    tbGroupId: number,
    title: string,
  }>,
  setAutoPlay: Function,
  toDoExternal: Function,
  saveHistoryBanner: Function,
  saveTypeReport: Function,
  infoUser: Object,
  toDoOpenUrl: Function,
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const SliderComponent = ({
  history,
  listBanners,
  setAutoPlay,
  toDoExternal,
  saveHistoryBanner,
  saveTypeReport,
  infoUser,
  toDoOpenUrl,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const switchPage = (typeBanner) => {
    saveHistoryBanner(typeBanner?.id);
    if (typeBanner?.bannerType === '오디오북') {
      if (typeBanner.type === '상품') {
        history.push(`${ROUTERS.AUDIO_BOOK}/${typeBanner?.tbProductId}`);
        saveTypeReport(2);
      }
      if (typeBanner.type === '전집') {
        history.push({
          pathname: `${ROUTERS.LIBRARY}/${typeBanner?.tbGroupId}`,
          state: {
            groupName: typeBanner.title,
          },
        });
      }
    }
    if (typeBanner?.bannerType === '뮤직') {
      if (typeBanner.type === '상품') {
        history.push(`${ROUTERS.MUSIC}/${typeBanner?.tbProductId}`);
        saveTypeReport(2);
      }
      if (typeBanner.type === '전집') {
        history.push(`${ROUTERS.LIBRARY}/${typeBanner?.tbProductId}`);
      }
    }
    if (typeBanner?.bannerType === '플레이북') {
      if (typeBanner.type === '상품') {
        history.push(`${ROUTERS.PLAY_BOOK}/${typeBanner?.tbProductId}`);
        setAutoPlay(false);
        saveTypeReport(2);
      }
      if (typeBanner.type === '전집') {
        history.push(`${ROUTERS.LIBRARY}/${typeBanner?.tbProductId}`);
      }
    }
    if (typeBanner?.bannerType === '라운지 URL') {
      if (infoUser?.userType === 'LOUNGE') {
        toDoExternal(typeBanner?.linkUrl, 'N', 'Y');
      } else {
        toDoOpenUrl(typeBanner?.linkUrl);
      }
    }
    if (typeBanner?.bannerType === '외부 URL') {
      if (infoUser?.userType === 'LOUNGE') {
        toDoExternal(typeBanner?.linkUrl, 'Y', 'N');
      } else {
        toDoOpenUrl(typeBanner?.linkUrl);
      }
    }
    if (typeBanner?.bannerType === '딸기콩 URL') {
      history.push({
        pathname: `${ROUTERS.EVENT}/${typeBanner?.id}`,
        state: {
          imageEvent: `https://down.wjthinkbig.com${typeBanner?.imgUrl}`,
        },
      });
    }
  };

  const renderListItem =
    listBanners &&
    listBanners.map((item) => (
      <SwiperSlide key={item.id}>
        <div
          className={`item ${item.thumbnailUrl ? '' : 'banner-none'}`}
          onClick={() => switchPage(item)}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <img
            src={
              `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
              images.image_not_found
            }
            alt=""
            onError={(e) => {
              if (loadImage) {
                setLoadImage({
                  loadImage: false,
                });
                e.target.src = images.image_not_found;
              }
            }}
          />
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="wrapper-home--slide">
      {listBanners?.length > 0 ? (
        <Swiper
          pagination={{ clickable: true }}
          loop
          slidesPerView="auto"
          spaceBetween={0}
          centeredSlides
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          className="MainPage__loopSlide__container"
        >
          {renderListItem}
        </Swiper>
      ) : (
        <div className="no-data-play">
          <img src={images.none03} alt="" className="image-none-slide" />
        </div>
      )}
    </div>
  );
};

export default memo<Props>(SliderComponent);
