// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import { listSelectTopic } from 'constants/listKey';
import NoData from 'components/NoData';
import moment from 'moment';
import Loading from 'components/Loading';
import ModalAnotherMonth from '../Modal/modalAnotherMonth';
import ItemAnotherMonth from './LookItem/ItemAnotherMonth';

type Props = {
  history: {
    push: Function,
  },
  getDataThemeMonth: Function,
  dataThemeMonth: Object,
  isProcessing: boolean,
};

const MonthTopicAnother = ({
  history,
  getDataThemeMonth,
  dataThemeMonth,
  isProcessing,
}: Props) => {
  const [isShowSelect, setIsShowSelect] = useState(false);
  const handleIsShowSelect = (boolean) => {
    setIsShowSelect(boolean);
  };
  const currentDate = new Date();
  const currentMonth = moment(currentDate).format('MM');

  useEffect(() => {
    getDataThemeMonth({ month: currentMonth });
  }, [getDataThemeMonth, currentMonth]);

  // Render List
  const renderItemMonthTopAnother =
    dataThemeMonth?.length > 0 ? (
      dataThemeMonth &&
      dataThemeMonth.map((item) => (
        <ItemAnotherMonth key={item.themeId} itemObj={item} history={history} />
      ))
    ) : (
      <NoData text="준비 중입니다." />
    );
  const handelClickShowModal = () => {
    setIsShowSelect(true);
  };

  return (
    <MainLayout
      customClass=""
      titleHeader="이달의 다른 테마"
      isShowHeader
      isLink
      isShowIcon
      isShowBtnDetail
      handelClickShowModal={handelClickShowModal}
    >
      <div className="strawberry another-month">
        {isProcessing ? <Loading /> : <>{renderItemMonthTopAnother}</>}
      </div>
      {/* Modal Another topic for this month */}
      <ModalAnotherMonth
        handleIsShowSelect={handleIsShowSelect}
        isShowSelect={isShowSelect}
        listSelectTopic={listSelectTopic}
        defaultActive={listSelectTopic[0]}
        history={history}
      />
    </MainLayout>
  );
};

export default memo<Props>(MonthTopicAnother);
