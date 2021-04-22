// @flow

import React, { memo, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import IMAGES from 'themes/images';
import { Link } from 'react-router-dom';
import ROUTERS from 'constants/router';

type Props = {
  history: {
    push: Function,
  },
  dataMonth: Array<{
    themeId: number,
    title: string,
    description: string,
    keywords: any,
    subThumbnailUrl1: string,
    subThumbnailUrl2: string,
    subThumbnailUrl3: string,
    mainThumbnailUrl: string,
    ageId: number,
  }>,
  getKeySearchDetail: Function,
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const MonthTopic = ({ history, dataMonth, getKeySearchDetail }: Props) => {
  const [loadImage, setLoadImage] = useState(true);

  // const handleChangeSlide = () => {
  //   if (classItemLeft) {
  //     setClassItemLeft(false);
  //   } else {
  //     setClassItemLeft(true);
  //   }
  // };

  // console.log('isIndex', isIndex);
  const renderListItem =
    dataMonth &&
    dataMonth.map((item) => {
      const styleBackground = {
        backgroundImage: `url(https://down.wjthinkbig.com${item?.subThumbnailUrl1})`,
      };
      const styleBackground2 = {
        backgroundImage: `url(https://down.wjthinkbig.com${item?.subThumbnailUrl2})`,
      };
      const styleBackground3 = {
        backgroundImage: `url(https://down.wjthinkbig.com${item?.subThumbnailUrl3})`,
      };

      return (
        <div className="item" key={item.themeId}>
          <div className="item--left">
            <div
              className="icon-review"
              onClick={() =>
                history.push(`${ROUTERS.MONTH_TOPIC}/${item.themeId}`)
              }
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <img src={IMAGES.icon_review} alt="img" />
            </div>
            <div
              className="title"
              onClick={() =>
                history.push(`${ROUTERS.MONTH_TOPIC}/${item.themeId}`)
              }
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              {item.title}
            </div>
            <div
              className="content"
              onClick={() =>
                history.push(`${ROUTERS.MONTH_TOPIC}/${item.themeId}`)
              }
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              {item.description}
            </div>
            <div className="tag">
              {item &&
                item.keywords &&
                item.keywords.map((itemTag) => {
                  return (
                    <div
                      className="tag--items"
                      onClick={() => {
                        history.push(
                          `${ROUTERS.SEARCH_FOR_KEYS}/${itemTag.id}`
                        );
                        getKeySearchDetail(itemTag.name);
                      }}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                      key={itemTag.id}
                    >
                      #{itemTag.name}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="item--right">
            <div
              className="image"
              onClick={() =>
                history.push(`${ROUTERS.MONTH_TOPIC}/${item.themeId}`)
              }
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
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
              <div
                className={`image__flag ${item.ageId === 1 ? '' : 'purple'}`}
              >
                {item.ageId === 1 ? '유아' : '초등'}
              </div>
              <div className="image-thumbnail">
                <Swiper
                  // loop
                  slidesPerView="2"
                  spaceBetween={5}
                  className="MainPage__playNow__container pb-0"
                  // onSlideChangeTransitionStart={() =>
                  //   setClassItemLeft(!classItemLeft)
                  // }
                  // onActiveIndexChange={() => console.log('object')}
                >
                  <SwiperSlide>
                    <Link to={() => {}} style={styleBackground} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Link to={() => {}} style={styleBackground2} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Link to={() => {}} style={styleBackground3} />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div>
      {dataMonth?.length > 0 ? (
        <>{renderListItem}</>
      ) : (
        <div className="no-data-play ml-0 mr-0">
          <img src={IMAGES.image_none} alt="" className="image-none-slide" />
        </div>
      )}
    </div>
  );
};

export default memo<Props>(MonthTopic);
