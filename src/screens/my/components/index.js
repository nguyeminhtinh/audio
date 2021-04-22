/* eslint-disable no-nested-ternary */
// @flow

import React, { memo, useEffect, useState } from 'react';
import MainLayout from 'layout/MainLayout';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import IMAGES from 'themes/images';
import { listCategoryTabSeries } from 'constants/listDataCategory';
import ModalPopup from 'components/Modal';
import Button from 'components/Button';
import { listImageAvatar } from 'mockData/listData';
import ROUTERS from 'constants/router';
import Loading from 'components/Loading';
import ItemAudio from './itemAudio';
import ItemPlay from './itemVideo';
import ItemMusic from './itemMusic';
import ItemStudio from './itemStudio';
import {
  toDoSetMusicList,
  toDoAudioPlay,
  toDoPurchase,
  toDoShowMusicPlayer,
  checkPlatform,
  toDoShowPayment,
} from '../../../utils/Helpers';
import TagItem from './tagItem';
import RegisterMember from './registerMember';
import PopupSubscription from '../../playBook/components/popupSubscription';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  getListMy: Function,
  listDataUserPlay: Object,
  isProcessing: boolean,
  activeTabMy: Function,
  tabActive: string,
  getInformationUser: Function,
  infoUser: Object,
  setAutoPlay: Function,
  updateAvatar: Function,
  type: string,
  isProcessingChangeAvatar: boolean,
  setStatusPlay: Function,
  totalAudio: number,
  totalPlay: number,
  totalMusic: number,
  dataCategoryMusic: Array<{
    productId: number,
    productName: string,
    thumbnailUrl: string,
    keywords: any,
    likeCount: number,
    duration: number,
    playCount: number,
  }>,
  dataCategoryAudio: Array<{
    productId: number,
    productName: string,
    duration: any,
    playCount: number,
    likeCount: number,
    keywords: any,
    thumbnailUrl: string,
  }>,
  dataCategoryVideo: Array<{
    productId: number,
    productName: string,
    duration: any,
    playCount: number,
    likeCount: number,
    keywords: any,
    thumbnailUrl: string,
  }>,
  resetDataMy: Function,
  saveTypeReport: Function,
  getListRecordUser: Function,
  dataRecordUser: Array<{
    id: number,
    title: string,
    duration: any,
    playCount: number,
    likeCount: number,
    backgroundImg: string,
    usable: string,
    recorder: string,
  }>,
  totalRecord: number,
  isShowPopupStudio: boolean,
  showPopupStudio: Function,
  hiddenPopupStudio: Function,
  updateStudio: Function,
  deleteStudio: Function,
  showPopupPlaylist: Function,
  hiddenPopupPlaylist: Function,
  studioSelected: Array<{}>,
  getDataStudio: Function,
  listSettingUser: Object,
  dataPlaylist: Array<{
    id: number,
    groupName: string,
    nickName: string,
    thumbnailUrl: string,
    visible: string,
    studioPlaySubjectDtos: Array<{
      id: number,
      subject: string,
    }>,
    likeCount: number,
    createdAt: string,
  }>,
  totalGroup: number,
  setStatusPlayRecord: Function,
};
const My = ({
  history,
  getListMy,
  listDataUserPlay,
  isProcessing,
  activeTabMy,
  tabActive,
  getInformationUser,
  infoUser,
  setAutoPlay,
  updateAvatar,
  type,
  isProcessingChangeAvatar,
  setStatusPlay,
  totalAudio,
  totalPlay,
  totalMusic,
  dataCategoryMusic,
  dataCategoryAudio,
  dataCategoryVideo,
  resetDataMy,
  saveTypeReport,
  getListRecordUser,
  dataRecordUser,
  totalRecord,
  isShowPopupStudio,
  showPopupStudio,
  hiddenPopupStudio,
  updateStudio,
  deleteStudio,
  showPopupPlaylist,
  hiddenPopupPlaylist,
  studioSelected,
  getDataStudio,
  listSettingUser,
  dataPlaylist,
  totalGroup,
  setStatusPlayRecord,
}: Props) => {
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState(tabActive);
  const [isActiveTab, setIsActiveTab] = useState(0);
  const [iconId, setIconId] = useState(infoUser?.imgPath);
  const [isShow, setIsShow] = useState(false);
  const [loadImage, setLoadImage] = useState(true);
  const [isSelective, setIsSelective] = useState(false);
  const [isCheckShowPopup, setIsCheckShowPopup] = useState(false);
  const [idItemStudio, setIdItemStudio] = useState(0);
  const notify = () => toast.error('삭제가 완료되었습니다.');
  const [isShowPopup, setIsShowPopup] = useState(false);
  const currentOS = checkPlatform();

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetDataMy();
      hiddenPopupStudio();
      hiddenPopupPlaylist();
    }
    if (document.body) {
      document.body.className = '';
    }

    return () => resetDataMy();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInformationUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!listSettingUser.ageId) {
      history.push(ROUTERS.SETTING_INTEREST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab !== '4' && activeTab !== '5') {
      getListMy({
        tabId: activeTab,
        mediaTypeId: isActiveTab,
        page,
      });
    }
    if (activeTab === '4') {
      getListRecordUser({ page });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getListMy, activeTab, isActiveTab, page]);

  useEffect(() => {
    if (type === 'UPDATE_AVATAR_SUCCESS') {
      getInformationUser();
    }
    if (type === 'UPDATE_STUDIO_SUCCESS') {
      toDoShowMusicPlayer();
      hiddenPopupStudio();
      resetDataMy();
      getListRecordUser({ page: 0 });
    }
    if (type === 'DELETE_STUDIO_SUCCESS') {
      notify();
      resetDataMy();
      getListRecordUser({ page: 0 });
      toDoShowMusicPlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    setIconId(infoUser?.imgPath);
  }, [infoUser]);

  const total = totalPlay + totalAudio + totalMusic;
  // const inputFile = useRef({});
  // const [objectFile, setObjectFile] = useState(null);
  // const onButtonClick = () => {
  //   // `current` points to the mounted file input element
  //   // eslint-disable-next-line no-unused-expressions
  //   const inputRefCurrent =
  //     inputFile && inputFile.current ? inputFile.current : null;
  //   // eslint-disable-next-line no-unused-expressions
  //   inputRefCurrent && inputRefCurrent.click();
  // };
  // const getFileName = async (e) => {
  //   setObjectFile(e.files[0]);
  // };
  const handleClosePopup = () => {
    setIsShowPopup(false);
  };

  const handleSubmitForm = () => {
    setIsShowPopup(false);
    const data = {
      beanId: 0,
      inAppPurchaseId: 'subscription_7900',
    };
    toDoPurchase(JSON.stringify(data));
  };

  const showTermService = () => {
    history.push(ROUTERS.TERMS);
  };

  const onSelect = (key) => {
    setActiveTab(key);
    setIsActiveTab(0);
    resetDataMy();
    if (key === '5') {
      history.push(`${ROUTERS.MY_PLAYLIST}`);
    }
  };
  const handleChangeButton = (item) => {
    setIsActiveTab(item.category);
    resetDataMy();
    setPage(0);
  };

  const handleClickTab = (e) => {
    setIsActiveTab(e);
    resetDataMy();
    setPage(0);
  };
  const renderButton =
    listCategoryTabSeries.length > 0 &&
    listCategoryTabSeries.map((item) => {
      return (
        <Button
          customClass={`button--primary ${
            isActiveTab === item.category ? 'active' : ''
          }`}
          onClick={() => handleChangeButton(item)}
          key={item.id}
          isDisabled={isActiveTab === item.category}
        >
          <p>{item.name}</p>
        </Button>
      );
    });

  const handleShowPlayer = (value) => {
    if (value.contentsUrl !== null) {
      setStatusPlay({
        productId: [parseInt(value.productId, 10)],
        status: 'init',
      });
      const audioList = [];
      const data = {
        seq: value.productId,
        title: value.productName,
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
  const renderDataTab = (id) => {
    switch (isActiveTab) {
      case 0:
        return (
          <>
            <ItemAudio
              listData={listDataUserPlay?.audioBook}
              history={history}
              handleTab={handleClickTab}
              isActiveTab={isActiveTab}
              activeTabMy={activeTabMy}
              activeTab={activeTab}
              handleShowPlayer={handleShowPlayer}
              totalAudio={totalAudio}
              dataCategoryAudio={dataCategoryAudio}
              eventKey={id}
              saveTypeReport={saveTypeReport}
              isProcessing={isProcessing}
              page={page}
            />
            <ItemPlay
              listData={listDataUserPlay?.playBook}
              history={history}
              handleTab={handleClickTab}
              isActiveTab={isActiveTab}
              activeTabMy={activeTabMy}
              activeTab={activeTab}
              setAutoPlay={setAutoPlay}
              totalPlay={totalPlay}
              dataCategoryVideo={dataCategoryVideo}
              saveTypeReport={saveTypeReport}
              isProcessing={isProcessing}
              page={page}
            />
            <ItemMusic
              listData={listDataUserPlay?.music}
              history={history}
              handleTab={handleClickTab}
              isActiveTab={isActiveTab}
              activeTabMy={activeTabMy}
              activeTab={activeTab}
              handleShowPlayer={handleShowPlayer}
              totalMusic={totalMusic}
              dataCategoryMusic={dataCategoryMusic}
              saveTypeReport={saveTypeReport}
              isProcessing={isProcessing}
              page={page}
            />
          </>
        );
      case 1:
        return (
          <>
            <ItemAudio
              listData={listDataUserPlay?.audioBook}
              history={history}
              isActiveTab={isActiveTab}
              activeTab={activeTab}
              activeTabMy={activeTabMy}
              handleShowPlayer={handleShowPlayer}
              totalAudio={totalAudio}
              dataCategoryAudio={dataCategoryAudio}
              eventKey={id}
              saveTypeReport={saveTypeReport}
              isProcessing={isProcessing}
              page={page}
            />
          </>
        );
      case 2:
        return (
          <>
            <ItemPlay
              listData={listDataUserPlay?.playBook}
              history={history}
              isActiveTab={isActiveTab}
              activeTab={activeTab}
              activeTabMy={activeTabMy}
              setAutoPlay={setAutoPlay}
              totalPlay={totalPlay}
              dataCategoryVideo={dataCategoryVideo}
              saveTypeReport={saveTypeReport}
              isProcessing={isProcessing}
              page={page}
            />
          </>
        );
      case 3:
        return (
          <>
            <ItemMusic
              listData={listDataUserPlay?.music}
              history={history}
              isActiveTab={isActiveTab}
              activeTab={activeTab}
              activeTabMy={activeTabMy}
              handleShowPlayer={handleShowPlayer}
              totalMusic={totalMusic}
              dataCategoryMusic={dataCategoryMusic}
              saveTypeReport={saveTypeReport}
              isProcessing={isProcessing}
              page={page}
            />
          </>
        );
      default:
        break;
    }
    return activeTab;
  };
  const handleCheckBack = () => {
    history.go(-1);
    activeTabMy('1');
  };

  const handleChooseImage = (objAvatar) => {
    setIsShow(false);
    // const formData = new window.FormData();
    // formData.append('iconId ', objFile);
    updateAvatar(objAvatar?.id);
    setIconId(objAvatar?.id);
  };

  const renderLengthScroll = () => {
    let lengthScroll = '';
    switch (isActiveTab) {
      case 0:
        lengthScroll = 0;
        break;
      case 1:
        lengthScroll = (dataCategoryAudio && dataCategoryAudio.length) || 0;
        break;
      case 2:
        lengthScroll = (dataCategoryVideo && dataCategoryVideo.length) || 0;
        break;
      case 3:
        lengthScroll = (dataCategoryMusic && dataCategoryMusic.length) || 0;
        break;
      case 4:
        lengthScroll = (dataRecordUser && dataRecordUser.length) || 0;
        break;
      case 5:
        lengthScroll = (dataPlaylist && dataPlaylist.length) || 0;
        break;
      default:
        break;
    }
    return lengthScroll;
  };

  const renderHasMoreScroll = () => {
    let hasMoreScroll = false;
    switch (isActiveTab) {
      case 0:
        hasMoreScroll = false;
        break;
      case 1:
        hasMoreScroll =
          dataCategoryAudio && dataCategoryAudio.length < totalAudio;
        break;
      case 2:
        hasMoreScroll =
          dataCategoryVideo && dataCategoryVideo.length < totalPlay;
        break;
      case 3:
        hasMoreScroll =
          dataCategoryMusic && dataCategoryMusic.length < totalMusic;
        break;
      case 4:
        hasMoreScroll = dataRecordUser && dataRecordUser.length < totalRecord;
        break;
      case 5:
        hasMoreScroll = dataPlaylist && dataPlaylist.length < totalGroup;
        break;
      default:
        break;
    }
    return hasMoreScroll;
  };

  const handleSendData = (item) => {
    if (item.length > 0) {
      setIsCheckShowPopup(true);
      setIdItemStudio(item[0].id);
    } else {
      setIsCheckShowPopup(false);
    }
  };

  const renderDataStudio = (isEdit) => {
    setIsSelective(isEdit);

    return (
      <ItemStudio
        history={history}
        isActiveTab={isActiveTab}
        activeTabMy={activeTabMy}
        dataRecordUser={dataRecordUser}
        saveTypeReport={saveTypeReport}
        activeTab={activeTab}
        isSelective={isSelective}
        getListRecordUser={getListRecordUser}
        page={page}
        isShowPopupStudio={isShowPopupStudio}
        hiddenPopup={hiddenPopupStudio}
        updateStudio={updateStudio}
        handleSendData={handleSendData}
        getDataStudio={getDataStudio}
        isProcessing={isProcessing}
        setStatusPlayRecord={setStatusPlayRecord}
      />
    );
  };

  const renderClassType = (item) => {
    switch (item) {
      case 'FACEBOOK':
        return <img src={IMAGES.icon_fb_mini} alt="" />;
      case 'NAVER':
        return <img src={IMAGES.icon_naver_mini} alt="" />;
      case 'KAKAO':
        return <img src={IMAGES.icon_kakao_mini} alt="" />;
      case 'APPLE':
        return <img src={IMAGES.icon_apple_mini} alt="" />;
      default:
        break;
    }
    return null;
  };

  return (
    <MainLayout
      customClass="my-wrapper"
      titleHeader="MY"
      isShowHeader
      isLink={infoUser?.userType !== 'LOCAL'}
      iconBackFunction={handleCheckBack}
      isShowSetting
      isShowComplement={infoUser?.userType === 'LOCAL'}
      isStrawberryMember={infoUser?.subscribe !== 'NONE'}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* {isProcessing && page < 1 ? (
        <Loading />
      ) : ( */}
      <>
        {isActiveTab !== 0 ? (
          <InfiniteScroll
            dataLength={renderLengthScroll()}
            next={() => {
              setPage(page + 1);
            }}
            hasMore={renderHasMoreScroll()}
            height={500}
            loader={
              <div className="d-flex justify-content-center pt-20">
                <Spinner animation="border" variant="success" />
              </div>
            }
          >
            <div className="page-my">
              <div className="avatar">
                <div className="icon">
                  {isProcessingChangeAvatar ? (
                    <Loading />
                  ) : (
                    <img
                      src={`https://down.wjthinkbig.com${iconId}`}
                      // src={renderAvatar(iconId)}
                      alt=""
                      onError={(e) => {
                        if (loadImage) {
                          setLoadImage({
                            loadImage: false,
                          });
                          e.target.src = IMAGES.image_not_found;
                        }
                      }}
                      // className={`${objectFile ? 'custom-image' : ''}`}
                      // className="custom-image"
                    />
                  )}
                </div>
                <div
                  className="btn-profile"
                  onClick={() => setIsShow(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                >
                  <img src={IMAGES.profile} alt="" />
                  {/* <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              ref={inputFile}
              accept="image/jpg, image/jpeg, image/png, capture=camera"
              onChange={(e) => getFileName(e.target)}
            /> */}
                </div>
              </div>
              <div className="title-name">
                <span className="title-content">{infoUser?.name}</span>{' '}
                <span>{renderClassType(infoUser?.snsType)}</span>
              </div>
              <div className="title-payment">
                <span className="title-content">
                  {infoUser?.subscribe === 'SUBSCRIPTION'
                    ? `구독 결제일 : 매달${infoUser.paymentDate}일`
                    : infoUser?.subscribe === 'COUPON'
                    ? `쿠폰 만료일: ${infoUser.paymentDate}`
                    : ''}
                </span>{' '}
              </div>

              {infoUser.userType !== 'LOUNGE' &&
                !infoUser.promotion &&
                infoUser.subscribe === 'NONE' && (
                  <div
                    className="member"
                    onClick={() =>
                      currentOS.iphone
                        ? toDoShowPayment()
                        : setIsShowPopup(true)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                  >
                    <RegisterMember
                      title="지금 딸기콩 멤버십 정기 구독 시"
                      titleButton="정기 구독하기"
                      contentLeft="특별 할인 혜택&#40;"
                      backgroundColor="#586eff"
                      btnColor="#ffc233"
                      image="yellow"
                    />
                  </div>
                )}

              {infoUser.userType !== 'LOUNGE' &&
                infoUser.promotion &&
                infoUser.subscribe === 'NONE' && (
                  <div
                    className="member"
                    onClick={() =>
                      currentOS.iphone
                        ? toDoShowPayment()
                        : setIsShowPopup(true)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                  >
                    <RegisterMember
                      title="지금 딸기콩 멤버십 정기 구독 시"
                      titleButton="무료 체험 시작하기"
                      contentLeft="첫 달 무료 &amp; 특별 할인 혜택&#40;"
                      backgroundColor="#46bcb1"
                      btnColor="#9f38d8"
                      image="blue"
                    />
                  </div>
                )}

              <div
                className={
                  infoUser?.userType === 'LOCAL'
                    ? 'wrapper-tab-my'
                    : 'wrapper-tab-my not-local'
                }
              >
                <TagItem
                  history={history}
                  activeTab={activeTab}
                  onSelect={(eventKey) => onSelect(eventKey)}
                  renderButton={renderButton}
                  total={total}
                  renderDataTab={renderDataTab}
                  renderDataStudio={renderDataStudio}
                  totalRecord={totalRecord}
                  showPopupStudio={showPopupStudio}
                  showPopupPlaylist={showPopupPlaylist}
                  isCheckShowPopup={isCheckShowPopup}
                  deleteStudio={deleteStudio}
                  idItemStudio={idItemStudio}
                  studioSelected={studioSelected}
                  getDataStudio={getDataStudio}
                  totalGroup={totalGroup}
                  userType={infoUser?.userType}
                />
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          <div>
            <div className="page-my">
              <div className="avatar">
                <div className="icon">
                  {isProcessingChangeAvatar ? (
                    <Loading />
                  ) : (
                    <img
                      src={`https://down.wjthinkbig.com${iconId}`}
                      // src={renderAvatar(iconId)}
                      alt=""
                      onError={(e) => {
                        if (loadImage) {
                          setLoadImage({
                            loadImage: false,
                          });
                          e.target.src = IMAGES.image_not_found;
                        }
                      }}
                      // className={`${objectFile ? 'custom-image' : ''}`}
                      // className="custom-image"
                    />
                  )}
                </div>
                <div
                  className="btn-profile"
                  onClick={() => setIsShow(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                >
                  <img src={IMAGES.profile} alt="" />
                  {/* <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              ref={inputFile}
              accept="image/jpg, image/jpeg, image/png, capture=camera"
              onChange={(e) => getFileName(e.target)}
            /> */}
                </div>
              </div>
              <div className="title-name">
                <span className="title-content">{infoUser?.name}</span>{' '}
                <span>{renderClassType(infoUser?.snsType)}</span>
              </div>
              <div className="title-payment">
                <span className="title-content">
                  {infoUser?.subscribe === 'SUBSCRIPTION'
                    ? `구독 결제일 : 매달${infoUser.paymentDate}일`
                    : infoUser?.subscribe === 'COUPON'
                    ? `쿠폰 만료일: ${infoUser.paymentDate}`
                    : ''}
                </span>{' '}
              </div>

              {infoUser.userType !== 'LOUNGE' &&
                !infoUser.promotion &&
                infoUser.subscribe === 'NONE' && (
                  <div
                    className="member"
                    onClick={() =>
                      currentOS.iphone
                        ? toDoShowPayment()
                        : setIsShowPopup(true)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                  >
                    <RegisterMember
                      title="지금 딸기콩 멤버십 정기 구독 시"
                      titleButton="정기 구독하기"
                      contentLeft="특별 할인 혜택&#40;"
                      backgroundColor="#586eff"
                      btnColor="#ffc233"
                      image="yellow"
                    />
                  </div>
                )}
              {infoUser.userType !== 'LOUNGE' &&
                infoUser.promotion &&
                infoUser.subscribe === 'NONE' && (
                  <div
                    className="member"
                    onClick={() =>
                      currentOS.iphone
                        ? toDoShowPayment()
                        : setIsShowPopup(true)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                  >
                    <RegisterMember
                      title="지금 딸기콩 멤버십 정기 구독 시"
                      titleButton="무료 체험 시작하기"
                      contentLeft="첫 달 무료 &amp; 특별 할인 혜택&#40;"
                      backgroundColor="#46bcb1"
                      btnColor="#9f38d8"
                      image="blue"
                    />
                  </div>
                )}

              <div
                className={
                  infoUser?.userType === 'LOCAL'
                    ? `wrapper-tab-my`
                    : 'wrapper-tab-my not-local'
                }
              >
                <TagItem
                  history={history}
                  activeTab={activeTab}
                  onSelect={(eventKey) => onSelect(eventKey)}
                  renderButton={renderButton}
                  total={total}
                  renderDataTab={renderDataTab}
                  renderDataStudio={renderDataStudio}
                  totalRecord={totalRecord}
                  showPopupStudio={showPopupStudio}
                  showPopupPlaylist={showPopupPlaylist}
                  isCheckShowPopup={isCheckShowPopup}
                  deleteStudio={deleteStudio}
                  idItemStudio={idItemStudio}
                  studioSelected={studioSelected}
                  getDataStudio={getDataStudio}
                  totalGroup={totalGroup}
                  userType={infoUser?.userType}
                />
              </div>
            </div>
          </div>
        )}
      </>
      {/* )} */}
      <PopupSubscription
        isShowPopup={isShowPopup}
        onClose={handleClosePopup}
        handleSubmitForm={handleSubmitForm}
        showTermService={showTermService}
      />
      <ModalPopup
        isOpen={isShow}
        handleClose={() => setIsShow(false)}
        customClassButton="w-100 buttonConfirm"
        isShowHeader
      >
        <div className="title-content row">
          {listImageAvatar.map((item) => {
            return (
              <div
                className="col-4 mb-2"
                key={item.id}
                onClick={() => handleChooseImage(item)}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                <img src={item.image} alt="" />
              </div>
            );
          })}
        </div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(My);
