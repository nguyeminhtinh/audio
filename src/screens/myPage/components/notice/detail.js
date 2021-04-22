// @flow

import React, { memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import moment from 'moment';
import Loading from 'components/Loading';

type Props = {
  getAnnouncementDetail: Function,
  dataAnnouncementDetail: Object,
  match: {
    params: {
      id: string,
    },
  },
  isProcessing: boolean,
};
const NoticeDetail = ({
  getAnnouncementDetail,
  dataAnnouncementDetail,
  match,
  isProcessing,
}: Props) => {
  const noticeId = match.params.id;

  useEffect(() => {
    getAnnouncementDetail(noticeId);
  }, [noticeId, getAnnouncementDetail]);

  return (
    <MainLayout customClass="" titleHeader="공지사항" isShowHeader isLink>
      {isProcessing ? (
        <Loading />
      ) : (
        <div className="page-notice">
          <div className="notice-detail">
            <div className="item">
              <div className="title">{dataAnnouncementDetail?.title}</div>
              <div className="date">
                {moment(dataAnnouncementDetail?.createdAt).format('YYYY.MM.DD')}
              </div>
            </div>
            <div className="content">{dataAnnouncementDetail?.content}</div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default memo<Props>(NoticeDetail);
