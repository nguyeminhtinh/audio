// @flow

import React, { memo, useState, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import queryString from 'query-string';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import { listSelectTopic } from 'constants/listKey';
import {
  toDoBackKey,
  toDoShowMusicPlayer,
  toDoSetMusicList,
  toDoAudioPlay,
  toDoExternal,
  setJwtToken,
  toDoOpenUrl,
} from '../../../utils/Helpers';
import { API } from '../../../utils/Apis';
import SliderTop from './slider';
import PlayNow from './playNow';
import ProposedToday from './proposedToday';
import StrawBerry from './strawBerry';
import BestFriends from './bestFriends';
import MonthTopic from './monthTopic';
import ModalAnotherMonth from './Modal/modalAnotherMonth';
import StrawberryBeanSchool from './strawberryBeanSchool';
import ItemStrawberryBean from './strawberryBeansDj/item';
import CharacterAudioBook from './characterAudioBook';
import StrawberryBeanOriginal from './strawberryBeanOriginal';

type Props = {
  history: {
    push: Function,
    location: Function,
    replace: Function,
  },
  getDataMain: Function,
  dataMain: {
    peers: any,
    todays: any,
    banners: any,
    plays: any,
    cases: any,
    djs: any,
    months: any,
    characters: any,
    schools: any,
    custom1: any,
    custom2: any,
    custom3: any,
    custom4: any,
    custom5: any,
    custom6: any,
  },
  isProcessing: boolean,
  listKeyAge: Array<{}>,
  dataParamSearch: Object,
  checkUserAccess: Function,
  settingUserCategory: Function,
  listSettingUser: Object,
  typeSettingCategory: string,
  code: number,
  token: string,
  typeCheckUser: string,
  resetType: Function,
  activeSlide: number,
  getInformationUser: Function,
  setAutoPlay: Function,
  setStatusPlay: Function,
  infoUser: Object,
  getKeySearchDetail: Function,
  ageIdMain: number,
  saveHistoryBanner: Function,
  saveTypeReport: Function,
  saveTypeApp: Function,
  paymentValidate: Function,
  dataSlideToday: Array<{
    materialName: string,
    tbProductId: number,
    mediaType: string,
    thumbnailUrl: string,
    groupName: string,
  }>,
  getDataSlideToday: Function,
  resetActiveTabDetail: Function,
};

const MainComponent = ({
  history,
  getDataMain,
  dataMain,
  isProcessing,
  listKeyAge,
  dataParamSearch,
  checkUserAccess,
  settingUserCategory,
  listSettingUser,
  typeSettingCategory,
  code,
  token,
  typeCheckUser,
  resetType,
  activeSlide,
  getInformationUser,
  setAutoPlay,
  setStatusPlay,
  infoUser,
  getKeySearchDetail,
  ageIdMain,
  saveHistoryBanner,
  saveTypeReport,
  saveTypeApp,
  paymentValidate,
  dataSlideToday,
  getDataSlideToday,
  resetActiveTabDetail,
}: Props) => {
  const params = queryString.parse(dataParamSearch);
  const sequenceId = params?.user;
  const convertBase64 = sequenceId && window.atob(sequenceId);
  const seqNo = convertBase64 && convertBase64.replace('seqNo=', '');
  const [isShowSelect, setIsShowSelect] = useState(false);
  const handleIsShowSelect = (boolean) => {
    setIsShowSelect(boolean);
  };
  // call api check user
  useEffect(() => {
    if (window.location.search) {
      window.localStorage.clear();
      checkUserAccess({
        seqNo,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkUserAccess]);

  useEffect(() => {
    resetActiveTabDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get data slide today every 24 hours
  useEffect(() => {
    const currentTime = new Date().getTime();
    const execTime = new Date().setHours(0, 0, 0, 0);
    let timeLeft;
    if (currentTime < execTime) {
      timeLeft = execTime - currentTime;
    } else {
      timeLeft = execTime + 86400000 - currentTime;
    }
    setTimeout(() => {
      setInterval(() => {
        getDataSlideToday();
      }, 86400000);
    }, timeLeft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get setting category
  useEffect(() => {
    if (token !== '') {
      settingUserCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // check switch page if don't setting
  useEffect(() => {
    if (typeSettingCategory === 'SETTING_USER_CATEGORY_SUCCESS') {
      if (listSettingUser.ageId) {
        // history.replace(ROUTERS.MAIN);
        getDataMain();
        getInformationUser();
        paymentValidate();
        toDoShowMusicPlayer();
      } else {
        history.push(ROUTERS.SETTING_INTEREST);
        resetType();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSettingUser]);

  // set token in header
  useEffect(() => {
    if (code === 201 && typeCheckUser === 'CHECK_USER_ACCESS_SUCCESS') {
      API.setHeader('Authorization', `${token}`);
      history.replace(ROUTERS.MAIN);
      toDoShowMusicPlayer();
      const data = { token };
      setJwtToken(JSON.stringify(data));
      resetType();
    }
    // if (sequenceId === undefined && token !== '') {
    //   const data = { token };
    //   setJwtToken(JSON.stringify(data));
    // }
    if (code === 200 && typeCheckUser === 'CHECK_USER_ACCESS_SUCCESS') {
      toDoBackKey();
    }
    if (sequenceId === '') {
      toDoBackKey();
    }
    // save type app
    if (infoUser?.userType === 'LOUNGE' && token !== '') {
      saveTypeApp('lounge');
    }
    if (sequenceId === undefined && token === '') {
      history.push(ROUTERS.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, token, typeCheckUser, sequenceId]);

  const handleShowPlayer = (value) => {
    if (value.contentsUrl !== null) {
      setStatusPlay({
        productId: [parseInt(value.productId, 10)],
        status: 'init',
      });
      const audioList = [];
      const data = {
        seq: value.productId,
        title: value.materialName,
        thumbnail:
          value.thumbnailUrl ||
          'https://down.wjthinkbig.com//DDALGICONG/CONTENTS/THUMBNAIL/DEFAULT/BEAN.PNG',
        audioFile: value.contentsUrl,
        introTime: 0,
      };
      audioList.push(data);
      toDoSetMusicList(JSON.stringify(audioList));
      toDoAudioPlay();
    }
  };

  const handleShowPlayerToday = (value) => {
    if (value.contentsUrl !== null) {
      setStatusPlay({
        productId: [parseInt(value.tbProductId, 10)],
        status: 'init',
      });
      const audioList = [];
      const data = {
        seq: value.tbProductId,
        title: value.materialName,
        thumbnail:
          value.thumbnailUrl ||
          'https://down.wjthinkbig.com//DDALGICONG/CONTENTS/THUMBNAIL/DEFAULT/BEAN.PNG',
        audioFile: value.contentsUrl,
        introTime: 0,
      };
      audioList.push(data);
      toDoSetMusicList(JSON.stringify(audioList));
      toDoAudioPlay();
    }
  };

  return (
    <MainLayout
      // isShowFooter
      customClass="MainPage"
      titleHeader=""
      activePage={1}
      isShowHeaderMain
      isShowHeader
      isShowIcon
      isLink
      isShowIconBackFunction
      isShowMenu
      isShowLibrary={infoUser?.userType === 'LOUNGE'}
    >
      <div className="wrapper-home">
        <SliderTop
          history={history}
          listBanners={dataMain && dataMain.banners}
          toDoExternal={toDoExternal}
          saveHistoryBanner={saveHistoryBanner}
          saveTypeReport={saveTypeReport}
          setAutoPlay={setAutoPlay}
          infoUser={infoUser}
          toDoOpenUrl={toDoOpenUrl}
        />
        <div className="wrapper-home--play">
          <div className="wrapper-title d-flex justify-content-between">
            <div className="title">바로 Play!</div>
            <div
              className="action d-block"
              onClick={() => history.push(ROUTERS.MY)}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <img src={IMAGES.btnDetail} alt="" />
            </div>
          </div>
          <PlayNow
            history={history}
            dataPlay={dataMain?.plays}
            activeSlide={activeSlide}
            handleShowPlayer={handleShowPlayerToday}
            setAutoPlay={setAutoPlay}
            saveTypeReport={saveTypeReport}
            isProcessing={isProcessing}
          />
        </div>

        <div className="wrapper-home--proposedToday">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">맞춤 투데이</div>
            <div
              className="btn-reload"
              onClick={() => getDataSlideToday()}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              <img src={IMAGES.icon_around} alt="" />
              <p>new</p>
            </div>
          </div>
          <ProposedToday
            history={history}
            listProposedToday={dataSlideToday}
            setAutoPlay={setAutoPlay}
            handleShowPlayer={handleShowPlayerToday}
            nameUser={infoUser?.name}
            isProcessing={isProcessing}
            saveTypeReport={saveTypeReport}
          />
        </div>
        <div className="wrapper-home--strawBerryOriginal specialEdition">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">{dataMain?.custom1?.themeTitle}</div>
          </div>
          <StrawberryBeanOriginal
            history={history}
            dataCustom={dataMain?.custom1}
            saveTypeReport={saveTypeReport}
            setAutoPlay={setAutoPlay}
          />
        </div>
        <div className="wrapper-home--strawBerry">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">이럴 땐 이런 딸기콩</div>
          </div>
          <StrawBerry
            history={history}
            listCases={dataMain && dataMain.cases}
            listKeyAge={listKeyAge}
            ageCategory={ageIdMain}
          />
        </div>
        <div className="wrapper-home--strawBerryOriginal specialEdition">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">{dataMain?.custom2?.themeTitle}</div>
          </div>
          <StrawberryBeanOriginal
            history={history}
            dataCustom={dataMain?.custom2}
            saveTypeReport={saveTypeReport}
            setAutoPlay={setAutoPlay}
          />
        </div>
        <div className="wrapper-home--beanThumbnail">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">딸기콩 DJ</div>
          </div>
          <ItemStrawberryBean
            history={history}
            dataStrawberryBeanDj={dataMain?.djs}
          />
        </div>
        <div className="wrapper-home--characterThumbnail">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">캐릭터북</div>
          </div>
          <CharacterAudioBook
            history={history}
            dataCharacter={dataMain?.characters}
            isProcessing={isProcessing}
          />
        </div>
        <div className="wrapper-home--strawBerryOriginal specialEdition">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">{dataMain?.custom3?.themeTitle}</div>
          </div>
          <StrawberryBeanOriginal
            history={history}
            dataCustom={dataMain?.custom3}
            saveTypeReport={saveTypeReport}
            setAutoPlay={setAutoPlay}
          />
        </div>
        <div className="wrapper-home--strawBerryOriginal specialEdition">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">{dataMain?.custom4?.themeTitle}</div>
          </div>
          <StrawberryBeanOriginal
            history={history}
            dataCustom={dataMain?.custom4}
            saveTypeReport={saveTypeReport}
            setAutoPlay={setAutoPlay}
          />
        </div>
        <div className="wrapper-home--bestFriends">
          <div className="wrapper-title d-flex justify-content-between">
            <div className="title">또래 친구 베스트</div>
            <div
              className="action"
              onClick={() => history.push(ROUTERS.BEST_FRIENDS_DETAIL)}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <img src={IMAGES.btnDetail} alt="" />
            </div>
          </div>
          <BestFriends
            history={history}
            listBestFriends={dataMain && dataMain.peers}
            handleShowPlayer={handleShowPlayer}
            setAutoPlay={setAutoPlay}
            saveTypeReport={saveTypeReport}
          />
        </div>
        <div className="wrapper-home--month-topic">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">이달의 테마</div>
            {infoUser?.userType !== 'LOUNGE' && (
              <div
                className="action"
                onClick={() => setIsShowSelect(true)}
                tabIndex={0}
                role="button"
                onKeyDown={() => {}}
              >
                <img src={IMAGES.btnDetail} alt="" />
              </div>
            )}
          </div>
          <div className="wrapper-content">
            <MonthTopic
              history={history}
              dataMonth={dataMain?.months}
              getKeySearchDetail={getKeySearchDetail}
            />
          </div>
        </div>
        <div className="wrapper-home--month-topic custom-month-topic">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">쏙쏙 딸기콩 스쿨</div>
            <div
              className="action"
              onClick={() =>
                history.push(ROUTERS.STRAWBERRY_BEANS_SCHOOL_DETAIL)
              }
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <img src={IMAGES.btnDetail} alt="" />
            </div>
          </div>
          <StrawberryBeanSchool
            history={history}
            dataBeanSchool={dataMain?.schools}
            listKeyAge={listKeyAge}
            ageCategory={ageIdMain}
            saveTypeReport={saveTypeReport}
          />
        </div>
        <div className="wrapper-home--beanThumbnail specialEdition">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">{dataMain?.custom5?.themeTitle}</div>
          </div>
          <StrawberryBeanOriginal
            history={history}
            dataCustom={dataMain?.custom5}
            saveTypeReport={saveTypeReport}
            setAutoPlay={setAutoPlay}
          />
        </div>
        <div className="wrapper-home--strawBerryOriginal specialEdition square-item">
          <div className="wrapper-title d-flex justify-content-between align-items-center">
            <div className="title">{dataMain?.custom6?.themeTitle}</div>
          </div>
          <StrawberryBeanOriginal
            history={history}
            dataCustom={dataMain?.custom6}
            saveTypeReport={saveTypeReport}
            setAutoPlay={setAutoPlay}
          />
        </div>
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

export default memo<Props>(MainComponent);
