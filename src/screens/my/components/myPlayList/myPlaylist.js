/* eslint-disable import/order */
// @flow
import React, { useEffect, useState } from 'react';
import ItemMyPlaylist from './itemMyPlaylist';
import Button from 'components/Button/index';
import MainLayout from 'layout/MainLayout';
import PopupPlaylist from './popupPlaylist';
import ROUTERS from 'constants/router';
import Loading from 'components/Loading';

type Props = {
  history: {
    push: Function,
    go: Function,
  },
  type: string,
  isProcessing: boolean,
  dataPlaylist: Array<{
    id: number,
    groupName: string,
    nickName: string,
    thumbnailUrl: string,
    visible: string,
    studioPlaySubjectDtos: Array<{
      id: number,
    }>,
    likeCount: number,
    totalCount: number,
    createdAt: string,
  }>,
  getListPlaylist: Function,
  getListSubject: Function,
  listSubject: Array<{
    id: number,
    subject: string,
  }>,
  updatePlayGroup: Function,
  infoUser: Object,
  deleteGroupStudio: Function,
};

const MyPlaylist = ({
  history,
  type,
  isProcessing,
  dataPlaylist,
  getListPlaylist,
  getListSubject,
  listSubject,
  updatePlayGroup,
  infoUser,
  deleteGroupStudio,
}: Props) => {
  const [isTogglePopup, setIsTogglePopup] = useState(false);
  const [isTogglePopupEdit, setIsTogglePopupEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [listId, setListId] = useState([]);
  useEffect(() => {
    getListPlaylist();
    getListSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'UPDATE_PLAY_GROUP_SUCCESS') {
      getListPlaylist();
      getListSubject();
    }
    if (type === 'DELETE_GROUP_STUDIO_SUCCESS') {
      setIsTogglePopupEdit(false);
      getListPlaylist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleCreatePlaylist = () => {
    setIsTogglePopup(true);
  };

  const handleTogglePopup = (isToggle) => {
    setIsTogglePopup(isToggle);
  };

  const handleEdit = (data, item) => {
    const dataTest = item.map((el) => el.id);
    setListId(dataTest);
    if (data) {
      setIsTogglePopupEdit(true);
      setDataEdit(data);
    }
  };

  const handleTogglePopupEdit = (isToggle) => {
    setIsTogglePopupEdit(isToggle);
  };

  const handleClick = (id) => {
    history.push(`${ROUTERS.MY_PLAYLIST}/${id}`);
  };
  return (
    <MainLayout
      customClass="my-wrapper"
      titleHeader="My"
      isShowHeader
      isLink
      isShowSetting
    >
      {!isProcessing ? (
        <div className="my-playlist">
          <div className="page-my">
            <div className="page-my__title">
              <h2>내 플레이리스트 관리</h2>
            </div>
            <div className="page-my__item">
              {dataPlaylist &&
                dataPlaylist.map((item) => (
                  <ItemMyPlaylist
                    key={item?.id}
                    id={item?.id}
                    isPrivate={item?.visible === 'N'}
                    quantity={
                      item?.thumbnailUrl?.length > 0
                        ? item?.thumbnailUrl?.length
                        : 1
                    }
                    title={item?.groupName}
                    totalCount={item?.totalCount || 0}
                    onEdit={handleEdit}
                    handleClick={handleClick}
                    likeCount={item?.likeCount}
                    thumbnailUrl={item?.thumbnailUrl}
                    nickName={item?.nickName}
                    dataList={item?.studioPlaySubjectDtos}
                  />
                ))}
            </div>
            <div className="page-my__button">
              <Button
                customClass="create-playlist"
                onClick={handleCreatePlaylist}
              >
                <p> + 새 플레이리스트 만들기</p>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <PopupPlaylist
        isToggle={isTogglePopup}
        onTogglePopup={handleTogglePopup}
        onTogglePopupEdit={handleTogglePopupEdit}
        isShowTwoBtn={false}
        dataEdit={[]}
        title="새 플레이리스트 만들기"
        listSubject={listSubject}
        studioPlaySubject={[]}
        status="add"
        updatePlayGroup={updatePlayGroup}
        isDelete={false}
        infoUser={infoUser}
        deleteGroupStudio={deleteGroupStudio}
      />

      <PopupPlaylist
        isToggle={isTogglePopupEdit}
        onTogglePopup={handleTogglePopup}
        onTogglePopupEdit={handleTogglePopupEdit}
        isShowTwoBtn
        dataEdit={dataEdit}
        title="내 플레이리스트 수정하기"
        listSubject={listSubject}
        studioPlaySubject={listId}
        status="update"
        updatePlayGroup={updatePlayGroup}
        isDelete
        infoUser={infoUser}
        deleteGroupStudio={deleteGroupStudio}
      />
    </MainLayout>
  );
};

export default MyPlaylist;
