// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import moment from 'moment';
import images from 'themes/images';
import ModalPopupItem from 'components/Modal';
import Loading from 'components/Loading';
import Nodata from 'components/NoData';
import ROUTERS from 'constants/router';
import { listMonth } from 'constants/listDataCategory';
import { convertTime, toDoSetStudioMusicList } from '../../../utils/Helpers';

type Props = {
  getListStudioMonth: Function,
  listStudioMonth: Array<{
    id: number,
    title: string,
    backgroundImg: string,
    recorder: string,
    duration: number,
    playCount: number,
    likeCount: number,
  }>,
  isProcessing: boolean,
  history: {
    push: Function,
  },
};

const Record = ({
  getListStudioMonth,
  listStudioMonth,
  isProcessing,
  history,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadImage, setLoadImage] = useState(true);
  const currentDay = new Date();
  const currentMonth = moment(currentDay).subtract(1, 'months').format('M');
  const [defaultSelect, setDefaultSelect] = useState({
    id: currentMonth,
    value: `0${currentMonth}월`,
  });
  const handleSetDefaultSelect = (item) => {
    setDefaultSelect(item);
  };

  // call api get list studio month
  useEffect(() => {
    getListStudioMonth({ month: defaultSelect.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelect]);

  const handleSetStudioList = (item) => {
    const listId = [];
    listId.push(item);
    toDoSetStudioMusicList(JSON.stringify(listId));
  };
  const renderListStudio =
    listStudioMonth && listStudioMonth.length > 0 ? (
      listStudioMonth.map((item, index) => {
        return (
          <div className="record__tab__record__list m-0" key={item.id}>
            <div
              className="d-flex wrapper-content__best-friends align-items-center"
              onClick={() => history.push(`${ROUTERS.STUDIO}/${item.id}`)}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <div className="strawberry__listAudio__items__left">
                <h2>{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</h2>
                <img
                  src={`https://down.wjthinkbig.com${item.backgroundImg}`}
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
            </div>
            <div
              className="strawberry__listAudio__items__center playlist"
              onClick={() => history.push(`${ROUTERS.STUDIO}/${item.id}`)}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <h3 className="content">{item.title}</h3>
              <div className="services">
                {item.recorder && item.recorder.slice(0, 2)}*
              </div>
              <div className="strawberry__listAudio__items__center__status">
                <div className="strawberry__listAudio__items__center__status__list-status list-playlist">
                  <div className="strawberry__listAudio__items__center__status__list-status--time">
                    <img src={images.iconTime} alt="" />
                    <p>{item && item.duration && convertTime(item.duration)}</p>
                  </div>
                  <div className="strawberry__listAudio__items__center__status__list-status--time view">
                    <img src={images.iconPlayMini} alt="" />
                    <p>
                      {item.playCount && item.playCount.toLocaleString('en')}
                    </p>
                  </div>
                  <div className="strawberry__listAudio__items__center__status__list-status--time favorite">
                    <img src={images.iconHeartMini} alt="" />
                    <p>
                      {item.likeCount && item.likeCount.toLocaleString('en')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="play">
              <img
                src={images.btn_record}
                alt=""
                onClick={() => handleSetStudioList(item.id)}
                role="presentation"
              />
            </div>
          </div>
        );
      })
    ) : (
      <Nodata text="준비 중입니다." />
    );
  return (
    <MainLayout
      customClass="record"
      titleHeader="딸기콩 스튜디오"
      isShowHeader
      isLink
      isShowIcon
    >
      {isProcessing ? (
        <Loading />
      ) : (
        <div className="best-studio">
          <div className="best-studio__title">
            <h2>베스트 스튜디오북</h2>
            <div
              className="search-wrapper__total-search__right custom-search"
              onClick={() => setIsOpen(true)}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <p>{defaultSelect.value}</p>
              <img src={images.icon_arrow_down} alt="" />
            </div>
          </div>
          {renderListStudio}
        </div>
      )}

      <ModalPopupItem
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        customClass="w-100 modal-edit"
      >
        <div className="title-content">
          {listMonth &&
            listMonth.map((item) => {
              return (
                <p
                  className={`item-edit ${
                    defaultSelect.value === item.value ? 'active' : ''
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    handleSetDefaultSelect(item);
                  }}
                  role="presentation"
                  key={item.id}
                >
                  {item.value}
                </p>
              );
            })}
        </div>
      </ModalPopupItem>
    </MainLayout>
  );
};

export default memo<Props>(Record);
