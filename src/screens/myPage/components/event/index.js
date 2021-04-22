// @flow

import React, { memo } from 'react';
import MainLayout from 'layout/MainLayout';

type Props = {
  history: {
    location: Object,
  },
};

const EventDetail = ({ history }: Props) => {
  const image = history?.location?.state?.imageEvent;

  return (
    <MainLayout customClass="" titleHeader="공지사항" isShowHeader isLink>
      <div className="page-advisory">
        <img src={image} alt="" />
      </div>
    </MainLayout>
  );
};

export default memo<Props>(EventDetail);
