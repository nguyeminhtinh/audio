// @flow

import React, { memo, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ROUTERS from 'constants/router';
import images from 'themes/images';
import Loading from 'components/Loading';
import { toast, ToastContainer } from 'react-toastify';

type Props = {
  history: {
    push: Function,
  },
  listProposedToday: Array<{
    materialName: string,
    tbProductId: number,
    mediaType: string,
    thumbnailUrl: string,
    groupName: string,
  }>,
  setAutoPlay: Function,
  handleShowPlayer: Function,
  isProcessing: boolean,
  saveTypeReport: Function,
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ProposedToday = ({
  history,
  listProposedToday,
  setAutoPlay,
  handleShowPlayer,
  isProcessing,
  saveTypeReport,
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
  const renderListItem =
    listProposedToday?.length > 0 ? (
      listProposedToday.map((item) => (
        <SwiperSlide key={item.tbProductId}>
          <div className="item">
            <div className="play">
              {item.mediaType === '플레이북' ? (
                <img
                  src={images.iconVideo}
                  alt=""
                  role="presentation"
                  onClick={() => {
                    history.push(`${ROUTERS.PLAY_BOOK}/${item.tbProductId}`);
                    setAutoPlay(true);
                    saveTypeReport(2);
                  }}
                />
              ) : (
                <img
                  src={images.iconAudio}
                  alt=""
                  role="presentation"
                  onClick={() => {
                    notify();
                    handleShowPlayer(item);
                  }}
                />
              )}
            </div>
            <div
              className="item--image border-img"
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
                alt="img"
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
            <div className="item--title">{item.materialName}</div>
            <div className="item--title-sub">{item.groupName}</div>
          </div>
        </SwiperSlide>
      ))
    ) : (
      <>
        <SwiperSlide>
          <div className="item">
            <div className="item--image box-none-slide">
              <img
                src={images.character01}
                alt=""
                className="image-none-slide"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="item--image box-none-slide">
              <img
                src={images.character01}
                alt=""
                className="image-none-slide"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <div className="item--image box-none-slide">
              <img
                src={images.character01}
                alt=""
                className="image-none-slide"
              />
            </div>
          </div>
        </SwiperSlide>
      </>
    );
  return (
    <div className="wrapper-home--today">
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
        <>
          {listProposedToday?.length > 0 ? (
            <Swiper
              loop
              slidesPerView="3"
              spaceBetween={10}
              className="MainPage__today__container"
              centeredSlides
            >
              {renderListItem}
            </Swiper>
          ) : (
            <Swiper
              // loop
              slidesPerView={3}
              spaceBetween={10}
              className="MainPage__today__container"
              centeredSlides
              initialSlide={1}
              noSwiping={false}
              allowSlidePrev={false}
              allowSlideNext={false}
            >
              {renderListItem}
            </Swiper>
          )}
        </>
      )}
    </div>
  );
};

export default memo<Props>(ProposedToday);
