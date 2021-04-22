/* eslint-disable no-nested-ternary */
// @flow

import React, { memo, useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import Button from 'components/Button';
import {
  renderTabSchool,
  renderTabActiveSchool,
} from '../../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  listCases: Object,
  listKeyAge: any,
  ageCategory: number,
};

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const StrawBerry = ({ history, listCases, listKeyAge, ageCategory }: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const [activeTab, setActiveTab] = useState(
    renderTabActiveSchool(ageCategory)
  );
  useEffect(() => {
    setActiveTab(renderTabActiveSchool(ageCategory));
  }, [ageCategory]);

  const renderListItem =
    listCases &&
    listCases.response &&
    listCases.response.baby &&
    listCases.response.baby.map((item, index) => {
      let classCustom = '';
      if (index === 0 || index === 3 || index === 6 || index === 9) {
        classCustom = 'red';
      }
      if (index === 1 || index === 4 || index === 7 || index === 10) {
        classCustom = 'orange';
      }
      if (index === 2 || index === 5 || index === 8 || index === 11) {
        classCustom = 'purple';
      }
      return (
        <SwiperSlide key={item.themeId}>
          <div
            className={`item ${classCustom}`}
            onClick={() =>
              history.push({
                pathname: `${ROUTERS.STRAWBERRY_BEANS}/${item.themeId}`,
                state: { title: item.title },
              })
            }
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <div className="title-play">
              <div className="topic">{item.title}</div>
              {index === 0 || index === 3 || index === 6 || index === 9 ? (
                <div className="play">
                  <img src={IMAGES.icon_playA} alt="" />
                </div>
              ) : index === 1 || index === 4 || index === 7 || index === 10 ? (
                <div className="play">
                  <img src={IMAGES.icon_playB} alt="" />
                </div>
              ) : (
                <div className="play">
                  <img src={IMAGES.icon_playC} alt="" />
                </div>
              )}
            </div>

            {item.subDetail2 === null ? (
              <>
                <div className="item--image">
                  <img
                    src={
                      `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  />
                </div>
                <div
                  className="item--title"
                  onClick={() => history.push(ROUTERS.STRAWBERRY_BEANS)}
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  {item.subTitleUrl1}
                </div>
                <div className="item--nameSeries">{item.subDetail1}</div>
              </>
            ) : (
              <>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  <div className="item--title">{item.subTitleUrl1}</div>
                  <div className="item--nameSeries">{item.subDetail1}</div>
                </div>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl2}` ||
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
                  <div className="item--title">{item.subTitleUrl2}</div>
                  <div className="item--nameSeries">{item.subDetail2}</div>
                </div>
              </>
            )}
          </div>
        </SwiperSlide>
      );
    });
  const renderListItem1 =
    listCases &&
    listCases.response &&
    listCases.response.freeSchool &&
    listCases.response.freeSchool.map((item, index) => {
      let classCustom = '';
      if (index === 0 || index === 3 || index === 6 || index === 9) {
        classCustom = 'red';
      }
      if (index === 1 || index === 4 || index === 7 || index === 10) {
        classCustom = 'orange';
      }
      if (index === 2 || index === 5 || index === 8 || index === 11) {
        classCustom = 'purple';
      }
      return (
        <SwiperSlide key={item.themeId}>
          <div
            className={`item ${classCustom}`}
            onClick={() =>
              history.push({
                pathname: `${ROUTERS.STRAWBERRY_BEANS}/${item.themeId}`,
                state: { title: item.title },
              })
            }
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <div className="title-play">
              <div className="topic">{item.title}</div>
              {index === 0 || index === 3 || index === 6 || index === 9 ? (
                <div className="play">
                  <img src={IMAGES.icon_playA} alt="" />
                </div>
              ) : index === 1 || index === 4 || index === 7 || index === 10 ? (
                <div className="play">
                  <img src={IMAGES.icon_playB} alt="" />
                </div>
              ) : (
                <div className="play">
                  <img src={IMAGES.icon_playC} alt="" />
                </div>
              )}
            </div>

            {item.subDetail2 === null ? (
              <>
                <div className="item--image">
                  <img
                    src={
                      `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  />
                </div>
                <div
                  className="item--title"
                  onClick={() => history.push(ROUTERS.STRAWBERRY_BEANS)}
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  {item.subTitleUrl1}
                </div>
                <div className="item--nameSeries">{item.subDetail1}</div>
              </>
            ) : (
              <>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  <div className="item--title">{item.subTitleUrl1}</div>
                  <div className="item--nameSeries">{item.subDetail1}</div>
                </div>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl2}` ||
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
                  <div className="item--title">{item.subTitleUrl2}</div>
                  <div className="item--nameSeries">{item.subDetail2}</div>
                </div>
              </>
            )}
          </div>
        </SwiperSlide>
      );
    });
  const renderListItem2 =
    listCases &&
    listCases.response &&
    listCases.response.school1 &&
    listCases.response.school1.map((item, index) => {
      let classCustom = '';
      if (index === 0 || index === 3 || index === 6 || index === 9) {
        classCustom = 'red';
      }
      if (index === 1 || index === 4 || index === 7 || index === 10) {
        classCustom = 'orange';
      }
      if (index === 2 || index === 5 || index === 8 || index === 11) {
        classCustom = 'purple';
      }
      return (
        <SwiperSlide key={item.themeId}>
          <div
            className={`item ${classCustom}`}
            onClick={() =>
              history.push({
                pathname: `${ROUTERS.STRAWBERRY_BEANS}/${item.themeId}`,
                state: { title: item.title },
              })
            }
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <div className="title-play">
              <div className="topic">{item.title}</div>
              {index === 0 || index === 3 || index === 6 || index === 9 ? (
                <div className="play">
                  <img src={IMAGES.icon_playA} alt="" />
                </div>
              ) : index === 1 || index === 4 || index === 7 || index === 10 ? (
                <div className="play">
                  <img src={IMAGES.icon_playB} alt="" />
                </div>
              ) : (
                <div className="play">
                  <img src={IMAGES.icon_playC} alt="" />
                </div>
              )}
            </div>

            {item.subDetail2 === null ? (
              <>
                <div className="item--image">
                  <img
                    src={
                      `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  />
                </div>
                <div
                  className="item--title"
                  onClick={() => history.push(ROUTERS.STRAWBERRY_BEANS)}
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  {item.subTitleUrl1}
                </div>
                <div className="item--nameSeries">{item.subDetail1}</div>
              </>
            ) : (
              <>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  <div className="item--title">{item.subTitleUrl1}</div>
                  <div className="item--nameSeries">{item.subDetail1}</div>
                </div>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl2}` ||
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
                  <div className="item--title">{item.subTitleUrl2}</div>
                  <div className="item--nameSeries">{item.subDetail2}</div>
                </div>
              </>
            )}
          </div>
        </SwiperSlide>
      );
    });
  const renderListItem3 =
    listCases &&
    listCases.response &&
    listCases.response.school2 &&
    listCases.response.school2.map((item, index) => {
      let classCustom = '';
      if (index === 0 || index === 3 || index === 6 || index === 9) {
        classCustom = 'red';
      }
      if (index === 1 || index === 4 || index === 7 || index === 10) {
        classCustom = 'orange';
      }
      if (index === 2 || index === 5 || index === 8 || index === 11) {
        classCustom = 'purple';
      }
      return (
        <SwiperSlide key={item.themeId}>
          <div
            className={`item ${classCustom}`}
            onClick={() =>
              history.push({
                pathname: `${ROUTERS.STRAWBERRY_BEANS}/${item.themeId}`,
                state: { title: item.title },
              })
            }
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <div className="title-play">
              <div className="topic">{item.title}</div>
              {index === 0 || index === 3 || index === 6 || index === 9 ? (
                <div className="play">
                  <img src={IMAGES.icon_playA} alt="" />
                </div>
              ) : index === 1 || index === 4 || index === 7 || index === 10 ? (
                <div className="play">
                  <img src={IMAGES.icon_playB} alt="" />
                </div>
              ) : (
                <div className="play">
                  <img src={IMAGES.icon_playC} alt="" />
                </div>
              )}
            </div>

            {item.subDetail2 === null ? (
              <>
                <div className="item--image">
                  <img
                    src={
                      `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  />
                </div>
                <div
                  className="item--title"
                  onClick={() => history.push(ROUTERS.STRAWBERRY_BEANS)}
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  {item.subTitleUrl1}
                </div>
                <div className="item--nameSeries">{item.subDetail1}</div>
              </>
            ) : (
              <>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl1}` ||
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
                  <div className="item--title">{item.subTitleUrl1}</div>
                  <div className="item--nameSeries">{item.subDetail1}</div>
                </div>
                <div className="items">
                  <div className="item--image">
                    <img
                      src={
                        `https://down.wjthinkbig.com${item.subThumbnailUrl2}` ||
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
                  <div className="item--title">{item.subTitleUrl2}</div>
                  <div className="item--nameSeries">{item.subDetail2}</div>
                </div>
              </>
            )}
          </div>
        </SwiperSlide>
      );
    });
  const renderButton =
    listKeyAge &&
    listKeyAge.map((item) => {
      return (
        <Button
          key={item.id}
          customClass={`button--primary ${activeTab === item ? 'active' : ''}`}
          onClick={() => {
            setActiveTab(item);
          }}
        >
          <p>{renderTabSchool(item)}</p>
        </Button>
      );
    });

  return (
    <div className="tab-strawberry-bean">
      <div className="tab-strawberry-bean__list-btn">{renderButton}</div>
      {activeTab === 'baby' && (
        <Swiper
          // loop
          slidesPerView="1"
          spaceBetween={10}
          className="MainPage__today__container"
        >
          {renderListItem}
        </Swiper>
      )}
      {activeTab === 'freeSchool' && (
        <Swiper
          // loop
          slidesPerView="1"
          spaceBetween={10}
          className="MainPage__today__container"
        >
          {renderListItem1}
        </Swiper>
      )}
      {activeTab === 'school1' && (
        <Swiper
          // loop
          slidesPerView="1"
          spaceBetween={10}
          className="MainPage__today__container"
        >
          {renderListItem2}
        </Swiper>
      )}
      {activeTab === 'school2' && (
        <Swiper
          // loop
          slidesPerView="1"
          spaceBetween={10}
          className="MainPage__today__container"
        >
          {renderListItem3}
        </Swiper>
      )}
      {/* ) : (
        <div className="no-data-play mb-4">
          <img src={IMAGES.image_none} alt="" className="image-none-slide" />
          <p>최근 플레이 내역이 없습니다.</p>
        </div>
      )} */}
    </div>
  );
};

export default memo<Props>(StrawBerry);
