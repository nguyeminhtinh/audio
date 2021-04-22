// @flow

import React, { memo, useEffect, useState } from 'react';
import MainLayout from 'layout/MainLayout';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';
import Loading from 'components/Loading';
import ROUTERS from 'constants/router';
import NoData from 'components/NoData';
import IMAGES from 'themes/images';

type Props = {
  getAnnouncementHistory: Function,
  dataAnnouncementHistory: Array<{
    noticeId: number,
    title: string,
    createdAt: string,
  }>,
  resetData: Function,
  isProcessing: boolean,
  totalAnnouncement: number,
};

const Notice = ({
  getAnnouncementHistory,
  dataAnnouncementHistory,
  resetData,
  isProcessing,
  totalAnnouncement,
}: Props) => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api history announcement
  useEffect(() => {
    getAnnouncementHistory({
      page,
    });
  }, [getAnnouncementHistory, page]);
  const history = useHistory();
  const renderListItem =
    dataAnnouncementHistory && dataAnnouncementHistory.length > 0 ? (
      dataAnnouncementHistory &&
      dataAnnouncementHistory.map((item) => {
        return (
          <div
            className="item"
            key={item.noticeId}
            onClick={() => {
              history.push(`${ROUTERS.NOTICE}/${item.noticeId}`);
            }}
            role="presentation"
            onKeyUp={() => {}}
          >
            <>
              <div className="wrapper-title d-flex align-items-center">
                <div className="title">
                  <div className="d-flex">
                    <p>{item.title} </p>
                  </div>
                  <div className="date">
                    {moment(item.createdAt).format('YYYY.MM.DD')}
                  </div>
                </div>
              </div>
            </>
            <img src={IMAGES.arrowRight} alt="" className="arrow-right" />
          </div>
        );
      })
    ) : (
      <NoData text="공지사항이 없습니다." />
    );
  return (
    <MainLayout customClass="" titleHeader="공지사항" isShowHeader isLink>
      {isProcessing && page < 1 ? (
        <Loading />
      ) : (
        <div className="page-notice">
          <InfiniteScroll
            dataLength={
              (dataAnnouncementHistory && dataAnnouncementHistory.length) || 0
            }
            next={() => {
              setPage(page + 1);
            }}
            hasMore={
              dataAnnouncementHistory &&
              dataAnnouncementHistory.length < totalAnnouncement
            }
            height={500}
            loader={
              <div className="d-flex justify-content-center pt-20">
                <Spinner animation="border" variant="success" />
              </div>
            }
          >
            {renderListItem}
          </InfiniteScroll>
        </div>
      )}
    </MainLayout>
  );
};

export default memo<Props>(Notice);
