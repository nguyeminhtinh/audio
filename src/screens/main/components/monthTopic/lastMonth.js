// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import { Tabs } from 'react-bootstrap';
import { listSelectTopic, listItemTabMonth } from 'constants/listKey';
import TabLong from 'components/TabLong';
import Loading from 'components/Loading';
import NoData from 'components/NoData';
import ItemAnotherMonth from './LookItem/ItemAnotherMonth';
import ModalAnotherMonth from '../Modal/modalAnotherMonth';

type Props = {
  history: {
    push: Function,
  },
  getDataThemeMonth: Function,
  dataThemeMonth: Object,
  isProcessing: boolean,
};

const LastMonthTopic = ({
  history,
  getDataThemeMonth,
  dataThemeMonth,
  isProcessing,
}: Props) => {
  const [isShowSelect, setIsShowSelect] = useState(false);
  const handleIsShowSelect = (boolean) => {
    setIsShowSelect(boolean);
  };

  const [activeTab, setActiveTab] = useState(listItemTabMonth[0].key);
  useEffect(() => {
    getDataThemeMonth({
      month: activeTab,
    });
  }, [getDataThemeMonth, activeTab]);

  const handelClickShowModal = () => {
    setIsShowSelect(true);
  };

  const onSelect = (key) => {
    setActiveTab(key);
  };

  const renderItemMonthTopAnother =
    dataThemeMonth?.length > 0 ? (
      dataThemeMonth &&
      dataThemeMonth.map((item) => {
        return (
          <ItemAnotherMonth
            key={item.themeId}
            itemObj={item}
            history={history}
          />
        );
      })
    ) : (
      <NoData text="준비 중입니다." />
    );

  const renderListTabMonth =
    listItemTabMonth.length &&
    listItemTabMonth.map((item) => (
      <TabLong eventKey={item?.key} title={<p>{item?.name}</p>} key={item.id}>
        {isProcessing ? <Loading /> : <>{renderItemMonthTopAnother}</>}
      </TabLong>
    ));

  return (
    <MainLayout
      customClass=""
      titleHeader="지난 달 테마"
      isShowHeader
      isLink
      isShowIcon
      isShowBtnDetail
      handelClickShowModal={handelClickShowModal}
    >
      <div className="strawberry another-month">
        <Tabs
          defaultActiveKey={activeTab}
          onSelect={(eventKey) => onSelect(eventKey)}
        >
          {renderListTabMonth}
        </Tabs>
      </div>

      {/* Modal Another topic for this month */}
      <ModalAnotherMonth
        handleIsShowSelect={handleIsShowSelect}
        isShowSelect={isShowSelect}
        listSelectTopic={listSelectTopic}
        defaultActive={listSelectTopic[1]}
        history={history}
      />
    </MainLayout>
  );
};

export default memo<Props>(LastMonthTopic);
