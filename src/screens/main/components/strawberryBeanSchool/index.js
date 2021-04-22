// @flow

import React, { memo, useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
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
  dataBeanSchool: Object,
  listKeyAge: any,
  ageCategory: number,
  saveTypeReport: Function,
};
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const StrawberryBeanSchool = ({
  history,
  dataBeanSchool,
  listKeyAge,
  ageCategory,
  saveTypeReport,
}: Props) => {
  const [activeTab, setActiveTab] = useState(
    renderTabActiveSchool(ageCategory)
  );
  useEffect(() => {
    setActiveTab(renderTabActiveSchool(ageCategory));
  }, [ageCategory]);
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
      saveTypeReport(2);
    }
  };
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
  const renderListItem =
    dataBeanSchool &&
    dataBeanSchool.response &&
    dataBeanSchool.response.baby.map((item) => {
      return (
        <SwiperSlide key={item.productId}>
          <div
            className="item"
            key={item.productId}
            onClick={() => switchPage(item)}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
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
            <div className="title">
              <Link to={{}}>{item.productName}</Link>
            </div>
            <div className="servies">{item.groupName}</div>
          </div>
        </SwiperSlide>
      );
    });
  const renderListItem1 =
    dataBeanSchool &&
    dataBeanSchool.response &&
    dataBeanSchool.response.freeSchool.map((item) => {
      return (
        <SwiperSlide key={item.productId}>
          <div
            className="item"
            key={item.productId}
            onClick={() => switchPage(item)}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
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
            <div className="title">
              <Link to={{}}>{item.productName}</Link>
            </div>
            <div className="servies">{item.groupName}</div>
          </div>
        </SwiperSlide>
      );
    });
  const renderListItem2 =
    dataBeanSchool &&
    dataBeanSchool.response &&
    dataBeanSchool.response.school1.map((item) => {
      return (
        <SwiperSlide key={item.productId}>
          <div
            className="item"
            key={item.productId}
            onClick={() => switchPage(item)}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
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
            <div className="title">
              <Link to={{}}>{item.productName}</Link>
            </div>
            <div className="servies">{item.groupName}</div>
          </div>
        </SwiperSlide>
      );
    });
  const renderListItem3 =
    dataBeanSchool &&
    dataBeanSchool.response &&
    dataBeanSchool.response.school2.map((item) => {
      return (
        <SwiperSlide key={item.productId}>
          <div
            className="item"
            key={item.productId}
            onClick={() => switchPage(item)}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
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
            <div className="title">
              <Link to={{}}>{item.productName}</Link>
            </div>
            <div className="servies">{item.groupName}</div>
          </div>
        </SwiperSlide>
      );
    });
  return (
    <div className="tab-BeanSchool">
      <div className="d-flex justify-content-between">{renderButton}</div>
      {activeTab === 'baby' && (
        <Swiper
          slidesPerView="3"
          spaceBetween={10}
          className="MainPage__character__container"
          cache="true"
        >
          {renderListItem}
        </Swiper>
      )}
      {activeTab === 'freeSchool' && (
        <Swiper
          slidesPerView="3"
          spaceBetween={10}
          className="MainPage__character__container"
          cache="true"
        >
          {renderListItem1}
        </Swiper>
      )}

      {activeTab === 'school1' && (
        <Swiper
          slidesPerView="3"
          spaceBetween={10}
          className="MainPage__character__container"
          cache="true"
        >
          {renderListItem2}
        </Swiper>
      )}

      {activeTab === 'school2' && (
        <Swiper
          slidesPerView="3"
          spaceBetween={10}
          className="MainPage__character__container"
          cache="true"
        >
          {renderListItem3}
        </Swiper>
      )}
    </div>
  );
};

export default memo<Props>(StrawberryBeanSchool);
