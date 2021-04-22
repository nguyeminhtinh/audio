// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-bootstrap';
import images from 'themes/images';
import ModalPopupItem from 'components/Modal';
import Nodata from 'components/NoData';
import Loading from 'components/Loading';
import ROUTERS from 'constants/router';
import { convertTime } from '../../../utils/Helpers';

type Props = {
  getListStudioChallenge: Function,
  listStudioChallenge: Object,
  isProcessing: boolean,
  history: {
    push: Function,
  },
  resetDataRecord: Function,
  totalStudioChallenge: number,
  getListFilterStudio: Function,
  listFilterStudio: Array<{
    contentId: number,
    name: string,
  }>,
};

const ChallengeStudio = ({
  getListStudioChallenge,
  listStudioChallenge,
  isProcessing,
  history,
  resetDataRecord,
  totalStudioChallenge,
  getListFilterStudio,
  listFilterStudio,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadImage, setLoadImage] = useState(true);
  const [defaultSelect, setDefaultSelect] = useState(
    listFilterStudio && listFilterStudio[0]
  );
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetDataRecord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDefaultSelect(listFilterStudio && listFilterStudio[0]);
  }, [listFilterStudio]);

  // call api get list challenge studio
  useEffect(() => {
    if (defaultSelect?.contentId !== undefined) {
      getListStudioChallenge({ page, contentId: defaultSelect?.contentId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, defaultSelect?.contentId]);

  useEffect(() => {
    getListFilterStudio(listFilterStudio && listFilterStudio[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderListChallenge =
    listStudioChallenge && listStudioChallenge.length > 0 ? (
      listStudioChallenge.map((item) => {
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
                src={images.iconAudio}
                alt=""
                onClick={() => {}}
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
      {isProcessing && page < 1 ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={(listStudioChallenge && listStudioChallenge.length) || 0}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={
            listStudioChallenge &&
            listStudioChallenge.length < totalStudioChallenge
          }
          height={500}
          loader={
            <div className="d-flex justify-content-center pt-20">
              <Spinner animation="border" variant="success" />
            </div>
          }
        >
          <div className="best-studio">
            <div className="best-studio__title">
              <h2>도전! 스튜디오북</h2>
            </div>
            <div className="best-studio__total-item">
              <h4>
                총{' '}
                {totalStudioChallenge &&
                  totalStudioChallenge.toLocaleString('en')}
                개
              </h4>
              <div
                className="search-wrapper__total-search__right "
                onClick={() => setIsOpen(true)}
                tabIndex={0}
                role="button"
                onKeyDown={() => {}}
              >
                <p>{defaultSelect?.name}</p>
                <img src={images.icon_arrow_down} alt="" />
              </div>
            </div>

            {renderListChallenge}
          </div>
        </InfiniteScroll>
      )}

      <ModalPopupItem
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        customClass="w-100 modal-edit"
      >
        <div className="title-content">
          {listFilterStudio &&
            listFilterStudio.map((item) => {
              return (
                <p
                  className={`item-edit ${
                    defaultSelect?.name === item.name ? 'active' : ''
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    setDefaultSelect(item);
                    resetDataRecord();
                    setPage(0);
                  }}
                  role="presentation"
                  key={item.contentId}
                >
                  {item.name}
                </p>
              );
            })}
        </div>
      </ModalPopupItem>
    </MainLayout>
  );
};

export default memo<Props>(ChallengeStudio);
