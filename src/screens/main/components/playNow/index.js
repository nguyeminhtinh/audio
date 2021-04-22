// @flow

import React, { memo, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import IMAGES from 'themes/images';
import Loading from 'components/Loading';
import ROUTERS from 'constants/router';
import { toast, ToastContainer } from 'react-toastify';

type Props = {
  history: {
    push: Function,
  },
  dataPlay: Array<{
    tbProductId: number,
    materialName: string,
    groupName: string,
    thumbnailUrl: string,
    id: number,
    mediaType: string,
  }>,
  activeSlide: number,
  handleShowPlayer: Function,
  setAutoPlay: Function,
  saveTypeReport: Function,
  isProcessing: boolean,
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const PlayNow = ({
  history,
  dataPlay,
  activeSlide,
  handleShowPlayer,
  setAutoPlay,
  saveTypeReport,
  isProcessing,
}: Props) => {
  const notify = () => toast.error('1개의 음원을 재생목록에 추가했습니다.');
  const [loadImage, setLoadImage] = useState(true);
  const switchPage = (data) => {
    if (data.mediaType === '오디오북') {
      history.push(`${ROUTERS.AUDIO_BOOK}/${data.tbProductId}`);
      saveTypeReport(2);
    }
    if (data.mediaType === '뮤직') {
      history.push(`${ROUTERS.MUSIC}/${data.tbProductId}`);
      saveTypeReport(2);
    }
    if (data.mediaType === '플레이북') {
      history.push(`${ROUTERS.PLAY_BOOK}/${data.tbProductId}`);
      setAutoPlay(false);
      saveTypeReport(2);
    }
  };

  const handleCheckPlayer = (item) => {
    if (item.mediaType === '플레이북') {
      history.push(`${ROUTERS.PLAY_BOOK}/${item.tbProductId}`);
      setAutoPlay(true);
    } else {
      handleShowPlayer(item);
      notify();
    }
  };

  const renderListItem =
    dataPlay?.length > 0 ? (
      dataPlay &&
      dataPlay.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="item d-flex align-items-start align-items-center">
            <div
              className="group-action"
              onClick={() => switchPage(item)}
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
              <div className="item--content">
                <div className="title-item">{item.materialName}</div>
                <div className="series">{item.groupName}</div>
              </div>
            </div>
            <div
              className="item--icon-play"
              onClick={() => handleCheckPlayer(item)}
              tabIndex={0}
              onKeyDown={() => {}}
              role="button"
            >
              <img src={IMAGES.iconPlay} alt="play" />
            </div>
          </div>
        </SwiperSlide>
      ))
    ) : (
      <div className="box-none-play">
        <img src={IMAGES.image_none} alt="" />
      </div>
    );
  return (
    <div className="wrapper-home--playNow">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isProcessing ? (
        <Loading />
      ) : (
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          centeredSlides
          initialSlide={activeSlide}
          className="MainPage__playNow__container custom-padding"
        >
          {renderListItem}
        </Swiper>
      )}
    </div>
  );
};

export default memo<Props>(PlayNow);
