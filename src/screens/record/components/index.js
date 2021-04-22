// @flow

import React, { useEffect, useState, memo } from 'react';
import MainLayout from 'layout/MainLayout';
import { Tabs, Tab } from 'react-bootstrap';
import Loading from 'components/Loading';
import ROUTERS from 'constants/router';
import TabRecord from './itemTab/TabRecord';
import TabPlay from './itemTab/TabPlay';
import {
  toDoSetMusicGroup,
  toDoSetStudioMusicList,
  toDoShowMusicPlayer,
} from '../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  getListSubject: Function,
  listSubject: Array<{
    id: number,
    subjectImg: string,
  }>,
  isProcessing: boolean,
  getListPlayStudio: Function,
  listPlayStudio: Object,
  getListRecord: Function,
  listRecord: Object,
  saveTabActive: Function,
  tabActive: string,
  isActiveDetail: boolean,
  saveIdActive: Function,
  idActive: string,
  listSettingUser: Object,
  setStatusPlayRecord: Function,
  infoUser: Object,
};
const Record = ({
  history,
  getListSubject,
  listSubject,
  isProcessing,
  getListPlayStudio,
  listPlayStudio,
  getListRecord,
  listRecord,
  saveTabActive,
  tabActive,
  isActiveDetail,
  saveIdActive,
  idActive,
  listSettingUser,
  setStatusPlayRecord,
  infoUser,
}: Props) => {
  const [activeTab, setActiveTab] = useState(tabActive);
  const [isBackFunction, setIsBackFunction] = useState(isActiveDetail);
  const [idSubject, setIdSubject] = useState(idActive);

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      saveTabActive('tab1');
      toDoShowMusicPlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (activeTab === 'tab2' && idSubject !== '') {
      getListPlayStudio(idSubject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (!listSettingUser.ageId) {
      history.push(ROUTERS.SETTING_INTEREST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get list subject
  useEffect(() => {
    if (activeTab === 'tab2') {
      getListSubject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // call api get list record
  useEffect(() => {
    getListRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (key) => {
    setActiveTab(key);
    setIsBackFunction(false);
  };
  const showDetail = (e) => {
    setIsBackFunction(e);
  };

  const handleCheckBack = () => {
    if (isBackFunction) {
      setIsBackFunction(false);
    } else {
      history.go(-1);
      saveTabActive('tab1');
    }
  };

  const getDetailStudio = (item) => {
    setIdSubject(item);
  };

  return (
    <MainLayout
      customClass="record"
      titleHeader="딸기콩 스튜디오"
      isShowHeader
      isLink={infoUser?.userType !== 'LOCAL' || isBackFunction}
      isShowIcon
      isShowIconBackFunction
      iconBackFunction={handleCheckBack}
    >
      <Tabs
        onSelect={(eventKey) => onSelect(eventKey)}
        defaultActiveKey={activeTab}
      >
        <Tab eventKey="tab1" title="레코드 스튜디오">
          {isProcessing ? (
            <Loading />
          ) : (
            <TabRecord
              history={history}
              listRecord={listRecord}
              saveTabActive={saveTabActive}
              toDoSetStudioMusicList={toDoSetStudioMusicList}
              setStatusPlayRecord={setStatusPlayRecord}
            />
          )}
        </Tab>
        <Tab eventKey="tab2" title="플레이 스튜디오">
          {isProcessing ? (
            <Loading />
          ) : (
            <TabPlay
              listSubject={listSubject}
              history={history}
              getListPlayStudio={getListPlayStudio}
              listPlayStudio={listPlayStudio}
              showDetail={showDetail}
              isBackFunction={isBackFunction}
              saveTabActive={saveTabActive}
              saveIdActive={saveIdActive}
              idActive={idActive}
              getDetailStudio={getDetailStudio}
              toDoSetMusicGroup={toDoSetMusicGroup}
            />
          )}
        </Tab>
      </Tabs>
    </MainLayout>
  );
};

export default memo<Props>(Record);
