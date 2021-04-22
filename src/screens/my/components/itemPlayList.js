// @flow
import React, { memo, useState, useEffect } from 'react';
import IMAGES from 'themes/images';
// import ROUTERS from 'constants/router';
import Nodata from 'components/NoData';
import {
  // convertTime,
  toDoHideMusicPlayer,
  toDoShowMusicPlayer,
} from '../../../utils/Helpers';
import ItemPopup from './itemPopup';

type Props = {
  activeTabMy: Function,
  activeTab: string,
  handleShowPlayer: Function,
  dataPlayList: Array<{
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
    totalCount: Number,
    createdAt: string,
  }>,
  saveTypeReport: Function,
  isSelective: boolean,
  // getListPlaylist: Function,
  // page: number,
  isShowPopupPlaylist: boolean,
  hiddenPopupPlaylist: Function,
  // updateStudio: Function,
  handleSendData: Function,
};
const ItemPlayList = ({
  activeTabMy,
  activeTab,
  handleShowPlayer,
  dataPlayList,
  saveTypeReport,
  isSelective,
  // getListPlaylist,
  // page,
  isShowPopupPlaylist,
  hiddenPopupPlaylist,
  // updateStudio,
  handleSendData,
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
  };

  const handleSwitchPage = (item) => {
    console.log(item);
    if (!isSelective) {
      // history.push(`${ROUTERS.RECORD_STUDIO_DETAIL}/${item.id}`);
      activeTabMy(activeTab);
      saveTypeReport(2);
    }
  };

  useEffect(() => {
    if (listAudio.length === 0) {
      toDoShowMusicPlayer();
    } else {
      toDoHideMusicPlayer();
    }
  }, [listAudio]);

  const handleSubmitPlaylist = (dataSubmit) => {
    const data = {
      id: dataSubmit.id,
      groupName: dataSubmit.groupName,
      nickName: dataSubmit.name,
      visible: dataSubmit.disclose.value === '비공개' ? 'N' : 'Y',
    };

    console.log('data', data);
    // updateStudio(data);
  };

  // render list data studio
  const renderListPlaylist =
    dataPlayList && dataPlayList.length > 0 ? (
      dataPlayList.map((item, index) => {
        const idActive = audioOption.filter((items) => items === item.id);
        return (
          <div
            className={`strawberry__listAudio__items bestFriend ${
              idActive && idActive[0] === item.id ? 'active' : ''
            }`}
            key={item.id}
            onClick={() =>
              isSelective && handleChangeOption(item.id, dataPlayList[index])
            }
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div
              className="d-flex box-left group-playlist"
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
                    `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
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
              <div className="strawberry__listAudio__items__center">
                {/* <h3 className="d-flex align-items-center"> */}
                <h3 className="content">
                  {item && item.groupName}{' '}
                  {item && item.visible === 'N' ? (
                    <img src={IMAGES.icon_lock} alt="" />
                  ) : (
                    ''
                  )}
                </h3>
                <div className="interactive">
                  <div className="username">{item?.nickName}</div>
                  <div className="like-user">
                    <img src={IMAGES.iconHeartMini} alt="" />
                    <p>{item && item.likeCount.toLocaleString('en')}</p>
                  </div>
                </div>

                {item.studioPlaySubjectDtos &&
                  item.studioPlaySubjectDtos.map((ele) => (
                    <div className="list-category" key={ele.id}>
                      <p className="active">#{ele?.subject}</p>
                    </div>
                  ))}
                {/* <div className="strawberry__listAudio__items__center__status">
                  <div className="strawberry__listAudio__items__center__status__description">
                    {item.nickName && item.nickName}
                  </div>
                  <div className="strawberry__listAudio__items__center__status__list-status">
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
                </div> */}
              </div>
            </div>

            <div className="strawberry__listAudio__items__right">
              <img
                src={IMAGES.btn_record}
                alt=""
                onClick={() => handleShowPlayer(item)}
                role="presentation"
              />
            </div>
          </div>
        );
      })
    ) : (
      <Nodata />
    );

  return (
    <>
      {renderListPlaylist}
      <ItemPopup
        listData={[]}
        isShowPopup={isShowPopupPlaylist}
        hiddenPopup={hiddenPopupPlaylist}
        handleSubmit={handleSubmitPlaylist}
      />
    </>
  );
};
export default memo<Props>(ItemPlayList);
