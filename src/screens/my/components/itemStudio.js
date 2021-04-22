// @flow
import React, { memo, useState, useEffect } from 'react';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import Nodata from 'components/NoData';
import Loading from 'components/Loading';
import {
  convertTime,
  toDoShowMusicPlayer,
  toDoHideMusicPlayer,
  toDoSetStudioMusicList,
} from '../../../utils/Helpers';
import ItemPopup from './itemPopup';

type Props = {
  history: {
    push: Function,
  },
  activeTabMy: Function,
  activeTab: string,
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
  saveTypeReport: Function,
  isSelective: boolean,
  isShowPopupStudio: boolean,
  hiddenPopup: Function,
  updateStudio: Function,
  handleSendData: Function,
  getDataStudio: Function,
  isProcessing: boolean,
  setStatusPlayRecord: Function,
};
const ItemStudio = ({
  history,
  activeTabMy,
  activeTab,
  dataRecordUser,
  saveTypeReport,
  isSelective,
  isShowPopupStudio,
  hiddenPopup,
  updateStudio,
  handleSendData,
  getDataStudio,
  isProcessing,
  setStatusPlayRecord,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const [listAudio, setListAudio] = useState([]);
  const [audioOption, setAudioOption] = useState([]);
  useEffect(() => {
    if (!isSelective) {
      setListAudio([]);
      setAudioOption([]);
    }
  }, [isSelective]);

  // handle change when choose audio
  const handleChangeOption = (value, audio) => {
    let listDataAudio = [];
    let listAudioId = [];
    if (audioOption.length > 0 && audioOption.includes(value)) {
      listDataAudio = listAudio.filter((item) => item !== audio);
      listAudioId = audioOption.filter((item) => item !== value);
    } else if (!audioOption.includes(value)) {
      listDataAudio = [audio];
      listAudioId = [value];
    } else {
      listDataAudio = listAudio;
      listAudioId = audioOption;
    }
    setListAudio(listDataAudio);
    setAudioOption(listAudioId);
    handleSendData(listDataAudio);
    getDataStudio(listAudioId);
  };
  useEffect(() => {
    if (!isSelective) {
      toDoShowMusicPlayer();
    } else {
      toDoHideMusicPlayer();
    }
  }, [isSelective]);

  const handleSwitchPage = (item) => {
    if (!isSelective) {
      history.push(`${ROUTERS.STUDIO}/${item.id}`);
      activeTabMy(activeTab);
      saveTypeReport(2);
    }
  };

  // submit form popup studio
  const handleSubmitStudio = (dataSubmit) => {
    const data = {
      id: dataSubmit.id,
      title: dataSubmit.title,
      nickName: dataSubmit.name,
      usable: dataSubmit.disclose.value === '비공개' ? 'N' : 'Y',
    };
    updateStudio(data);
    getDataStudio([]);
    setAudioOption([]);
  };

  const handleAddStudioPlayer = (id) => {
    const listId = [];
    listId.push(id);
    toDoSetStudioMusicList(listId);
    setStatusPlayRecord({
      productId: listId,
      status: 'init',
    });
  };
  // render list data studio
  const renderListStudio =
    dataRecordUser && dataRecordUser.length > 0 ? (
      dataRecordUser.map((item, index) => {
        const idActive = audioOption.filter((items) => items === item.id);
        return (
          <div
            className={`strawberry__listAudio__items bestFriend ${
              idActive && idActive[0] === item.id ? 'active' : ''
            }`}
            key={item.id}
            onClick={() =>
              isSelective && handleChangeOption(item.id, dataRecordUser[index])
            }
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div
              className="d-flex box-left"
              onClick={() => {
                handleSwitchPage(item);
              }}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <div className="strawberry__listAudio__items__left">
                <img
                  src={
                    `https://down.wjthinkbig.com${item.backgroundImg}` ||
                    IMAGES.image_not_found
                  }
                  alt="Images"
                  onError={(e) => {
                    if (loadImage) {
                      setLoadImage({
                        loadImage: false,
                      });
                      e.target.src = IMAGES.image_not_found;
                    }
                  }}
                />
              </div>
              <div className="strawberry__listAudio__items__center studio">
                <div className="d-flex align-items-center title-item-studio">
                  <h3 className="">{item.title} </h3>
                  {item && item.usable === 'N' ? (
                    <img src={IMAGES.icon_lock} alt="" />
                  ) : (
                    ''
                  )}
                </div>
                <div className="strawberry__listAudio__items__center__status">
                  <div className="strawberry__listAudio__items__center__status__description">
                    {item.recorder && item.recorder.length > 20
                      ? `${item.recorder.slice(0, 20)}...`
                      : item.recorder}
                  </div>
                  <div className="strawberry__listAudio__items__center__status__list-status list-studio">
                    <div className="strawberry__listAudio__items__center__status__list-status--time">
                      <img src={IMAGES.iconTime} alt="" />
                      <p>{item && convertTime(item.duration)}</p>
                    </div>
                    <div className="strawberry__listAudio__items__center__status__list-status--time view">
                      <img src={IMAGES.iconPlayMini} alt="" />
                      <p>{item && item.playCount.toLocaleString('en')}</p>
                    </div>
                    <div className="strawberry__listAudio__items__center__status__list-status--time favorite">
                      <img src={IMAGES.iconHeartMini} alt="" />
                      <p>{item && item.likeCount.toLocaleString('en')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="strawberry__listAudio__items__right">
              <img
                src={IMAGES.btn_record}
                alt=""
                onClick={() => handleAddStudioPlayer(item.id)}
                role="presentation"
              />
            </div>
          </div>
        );
      })
    ) : (
      <Nodata text="녹음한 스튜디오북이없습니다." />
    );

  return (
    <>
      {isProcessing ? <Loading /> : <>{renderListStudio}</>}

      <ItemPopup
        listData={listAudio}
        isShowPopup={isShowPopupStudio}
        hiddenPopup={hiddenPopup}
        handleSubmit={handleSubmitStudio}
      />
    </>
  );
};
export default memo<Props>(ItemStudio);
