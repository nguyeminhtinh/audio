// @flow

import React, { memo, useState } from 'react';
import IMAGES from 'themes/images';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ROUTERS from 'constants/router';
import { toast, ToastContainer } from 'react-toastify';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type Props = {
  history: {
    push: Function,
  },
  listBestFriends: Array<{
    productId: number,
    materialName: string,
    groupName: string,
    mediaType: string,
    thumbnailUrl: string,
  }>,
  handleShowPlayer: Function,
  setAutoPlay: Function,
  saveTypeReport: Function,
};

const BestFriends = ({
  history,
  listBestFriends,
  handleShowPlayer,
  setAutoPlay,
  saveTypeReport,
}: Props) => {
  const notify = () => toast.error('1개의 음원을 재생목록에 추가했습니다.');
  const [loadImage, setLoadImage] = useState(true);
  const switchPage = (data) => {
    if (data.mediaType === '오디오북') {
      history.push(`${ROUTERS.AUDIO_BOOK}/${data.productId}`);
      saveTypeReport(2);
    }
    if (data.mediaType === '뮤직') {
      history.push(`${ROUTERS.MUSIC}/${data.productId}`);
      saveTypeReport(2);
    }
    if (data.mediaType === '플레이북') {
      history.push(`${ROUTERS.PLAY_BOOK}/${data.productId}`);
      setAutoPlay(false);
      saveTypeReport(2);
    }
  };

  const renderListItem =
    listBestFriends?.length > 0 &&
    listBestFriends.slice(0, 2).map((item, index) => (
      <div className="list-item-bestFriend__item" key={item.productId}>
        <div className="wrapper-content align-items-center justify-content-between">
          <div
            className="d-flex wrapper-content__best-friends align-items-start"
            onClick={() => switchPage(item)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div className="list-item-bestFriend__item__left">
              <img
                src={
                  `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                  IMAGES.image_not_found
                }
                alt=""
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
                className="list-item-bestFriend__item__left__thumbnail"
              />
              <div className="play">
                {item.mediaType === '플레이북' ? (
                  <img
                    src={IMAGES.iconVideo}
                    alt=""
                    role="presentation"
                    onClick={() => {
                      history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
                      setAutoPlay(true);
                    }}
                  />
                ) : (
                  <img
                    src={IMAGES.iconAudio}
                    alt=""
                    onClick={() => {
                      handleShowPlayer(item);
                      notify();
                    }}
                    role="presentation"
                  />
                )}
              </div>
            </div>
            <div className="list-item-bestFriend__item__right">
              <img
                src={index === 0 ? IMAGES.best_01 : IMAGES.best_02}
                alt=""
                className="list-item-bestFriend__item__right__no"
              />
              <div className="content">
                <div className="name">{item.materialName}</div>
                <div className="servies">{item.groupName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderListItem2 =
    listBestFriends?.length > 0 &&
    listBestFriends.slice(2, 4).map((item, index) => (
      <div className="list-item-bestFriend__item" key={item.productId}>
        <div className="wrapper-content align-items-center justify-content-between">
          <div
            className="d-flex wrapper-content__best-friends align-items-center"
            onClick={() => switchPage(item)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div className="list-item-bestFriend__item__left">
              <img
                src={
                  `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                  IMAGES.image_not_found
                }
                alt=""
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
                className="list-item-bestFriend__item__left__thumbnail"
              />
              <div className="play">
                {item.mediaType === '플레이북' ? (
                  <img
                    src={IMAGES.iconVideo}
                    alt=""
                    role="presentation"
                    onClick={() => {
                      history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
                      setAutoPlay(true);
                    }}
                  />
                ) : (
                  <img
                    src={IMAGES.iconAudio}
                    alt=""
                    onClick={() => {
                      handleShowPlayer(item);
                      notify();
                    }}
                    role="presentation"
                  />
                )}
              </div>
            </div>
            <div className="list-item-bestFriend__item__right">
              <img
                src={index === 0 ? IMAGES.best_03 : IMAGES.best_04}
                alt=""
                className="list-item-bestFriend__item__right__no"
              />
              <div className="content">
                <div className="name">{item.materialName}</div>
                <div className="servies">{item.groupName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderListItem3 =
    listBestFriends?.length > 0 &&
    listBestFriends.slice(4, 6).map((item, index) => (
      <div className="list-item-bestFriend__item" key={item.productId}>
        <div className="wrapper-content align-items-center justify-content-between">
          <div
            className="d-flex wrapper-content__best-friends align-items-center"
            onClick={() => switchPage(item)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div className="list-item-bestFriend__item__left">
              <img
                src={
                  `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                  IMAGES.image_not_found
                }
                alt=""
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
                className="list-item-bestFriend__item__left__thumbnail"
              />
              <div className="play">
                {item.mediaType === '플레이북' ? (
                  <img
                    src={IMAGES.iconVideo}
                    alt=""
                    role="presentation"
                    onClick={() => {
                      history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
                      setAutoPlay(true);
                    }}
                  />
                ) : (
                  <img
                    src={
                      item.mediaType === '뮤직'
                        ? IMAGES.icon_music_m
                        : IMAGES.iconAudio
                    }
                    alt=""
                    onClick={() => {
                      handleShowPlayer(item);
                      notify();
                    }}
                    role="presentation"
                  />
                )}
              </div>
            </div>
            <div className="list-item-bestFriend__item__right">
              <img
                src={index === 0 ? IMAGES.best_05 : IMAGES.best_06}
                alt=""
                className="list-item-bestFriend__item__right__no"
              />
              <div className="content">
                <div className="name">{item.materialName}</div>
                <div className="servies">{item.groupName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderListItem4 =
    listBestFriends?.length > 0 &&
    listBestFriends.slice(6, 8).map((item, index) => (
      <div className="list-item-bestFriend__item" key={item.productId}>
        <div className="wrapper-content align-items-center justify-content-between">
          <div
            className="d-flex wrapper-content__best-friends align-items-center"
            onClick={() => switchPage(item)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div className="list-item-bestFriend__item__left">
              <img
                src={
                  `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                  IMAGES.image_not_found
                }
                alt=""
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
                className="list-item-bestFriend__item__left__thumbnail"
              />
              <div className="play">
                {item.mediaType === '플레이북' ? (
                  <img
                    src={IMAGES.iconVideo}
                    alt=""
                    role="presentation"
                    onClick={() => {
                      history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
                      setAutoPlay(true);
                    }}
                  />
                ) : (
                  <img
                    src={
                      item.mediaType === '뮤직'
                        ? IMAGES.icon_music_m
                        : IMAGES.iconAudio
                    }
                    alt=""
                    onClick={() => {
                      handleShowPlayer(item);
                      notify();
                    }}
                    role="presentation"
                  />
                )}
              </div>
            </div>
            <div className="list-item-bestFriend__item__right">
              <img
                src={index === 0 ? IMAGES.best_07 : IMAGES.best_08}
                alt=""
                className="list-item-bestFriend__item__right__no"
              />
              <div className="content">
                <div className="name">{item.materialName}</div>
                <div className="servies">{item.groupName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderListItem5 =
    listBestFriends?.length > 0 &&
    listBestFriends.slice(8, 10).map((item, index) => (
      <div className="list-item-bestFriend__item" key={item.productId}>
        <div className="wrapper-content align-items-center justify-content-between">
          <div
            className="d-flex wrapper-content__best-friends align-items-center"
            onClick={() => switchPage(item)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div className="list-item-bestFriend__item__left">
              <img
                src={
                  `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                  IMAGES.image_not_found
                }
                alt=""
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = IMAGES.image_not_found;
                  }
                }}
                className="list-item-bestFriend__item__left__thumbnail"
              />
              <div className="play">
                {item.mediaType === '플레이북' ? (
                  <img
                    src={IMAGES.iconVideo}
                    alt=""
                    role="presentation"
                    onClick={() => {
                      history.push(`${ROUTERS.PLAY_BOOK}/${item.productId}`);
                      setAutoPlay(true);
                    }}
                  />
                ) : (
                  <img
                    src={
                      item.mediaType === '뮤직'
                        ? IMAGES.icon_music_m
                        : IMAGES.iconAudio
                    }
                    alt=""
                    onClick={() => {
                      handleShowPlayer(item);
                      notify();
                    }}
                    role="presentation"
                  />
                )}
              </div>
            </div>
            <div className="list-item-bestFriend__item__right">
              <img
                src={index === 0 ? IMAGES.best_09 : IMAGES.best_10}
                alt=""
                className="list-item-bestFriend__item__right__no"
              />
              <div className="content">
                <div className="name">{item.materialName}</div>
                <div className="servies">{item.groupName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="list-item-bestFriend">
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
      {listBestFriends?.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          className="container-best-friends"
          cache="true"
        >
          {listBestFriends && listBestFriends.slice(0, 2).length > 0 && (
            <SwiperSlide>{renderListItem}</SwiperSlide>
          )}
          {listBestFriends && listBestFriends.slice(2, 4).length > 0 && (
            <SwiperSlide>{renderListItem2}</SwiperSlide>
          )}
          {listBestFriends && listBestFriends.slice(4, 6).length > 0 && (
            <SwiperSlide>{renderListItem3}</SwiperSlide>
          )}
          {listBestFriends && listBestFriends.slice(6, 8).length > 0 && (
            <SwiperSlide>{renderListItem4}</SwiperSlide>
          )}
          {listBestFriends && listBestFriends.slice(8, 10).length > 0 && (
            <SwiperSlide>{renderListItem5}</SwiperSlide>
          )}
        </Swiper>
      ) : (
        <div className="box-non-member">
          <div className="non-best-friend">
            <img src={IMAGES.image_none} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo<Props>(BestFriends);
