// @flow

import React, { memo, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';
import Loading from 'components/Loading';
// import Slider from 'react-slick';

type Props = {
  history: {
    push: Function,
  },
  dataCharacter: Array<{
    themeId: number,
    mainThumbnailUrl: string,
    title: string,
  }>,
  isProcessing: boolean,
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const CharacterAudioBook = ({
  history,
  dataCharacter,
  isProcessing,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const renderListItem =
    dataCharacter &&
    dataCharacter.map((item) => (
      <SwiperSlide key={item.themeId}>
        <div className="item d-flex align-items-start align-items-center">
          <div
            className="group-action"
            onClick={() => history.push(`${ROUTERS.CHARACTER}/${item.themeId}`)}
            tabIndex={0}
            onKeyDown={() => {}}
            role="button"
          >
            <div className="item--image">
              <img
                src={
                  `https://down.wjthinkbig.com${item.mainThumbnailUrl}` ||
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
            <div className="servies">{item.title}</div>
          </div>
        </div>
      </SwiperSlide>
    ));
  return (
    <div className="wrapper-home--characterThumbnail__list-data">
      {isProcessing ? (
        <Loading />
      ) : (
        <>
          {dataCharacter?.length > 0 ? (
            <Swiper
              slidesPerView={3}
              // spaceBetween={6}
              speed={1000}
              initialSlide={1}
              noSwiping={false}
              centeredSlides
              loop
              className="MainPage__character__container"
            >
              {renderListItem}
            </Swiper>
          ) : (
            <div className="no-data-play ml-0">
              <img
                src={IMAGES.image_none}
                alt=""
                className="image-none-slide"
              />
              <p>최근 플레이 내역이 없습니다.</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  // const settings = {
  //   className: 'center',
  //   draggable: true,
  //   centerMode: true,
  //   infinite: true,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   swipe: true,
  //   cssEase: 'linear',
  //   speed: 100,
  //   touchThreshold: 10,
  // };

  // return (
  //   <div className="wrapper-home--characterThumbnail__list-data">
  //     {isProcessing ? (
  //       <Loading />
  //     ) : (
  //       <>
  //         <Slider {...settings}>
  //           {dataCharacter?.length > 0 &&
  //             dataCharacter.map((item) => (
  //               <div className="item d-flex align-items-start align-items-center">
  //                 <div
  //                   className="group-action"
  //                   onClick={() =>
  //                     history.push(`${ROUTERS.CHARACTER}/${item.themeId}`)
  //                   }
  //                   tabIndex={0}
  //                   onKeyDown={() => {}}
  //                   role="button"
  //                 >
  //                   <div className="item--image">
  //                     <img
  //                       src={
  //                         `https://down.wjthinkbig.com${item.mainThumbnailUrl}` ||
  //                         IMAGES.image_not_found
  //                       }
  //                       alt="img"
  //                       onError={(e) => {
  //                         if (loadImage) {
  //                           setLoadImage({
  //                             loadImage: false,
  //                           });
  //                           e.target.src = IMAGES.image_not_found;
  //                         }
  //                       }}
  //                     />
  //                   </div>
  //                   <div className="servies">{item.title}</div>
  //                 </div>
  //               </div>
  //             ))}
  //         </Slider>
  //       </>
  //     )}
  //   </div>
  // );
};

export default memo<Props>(CharacterAudioBook);
