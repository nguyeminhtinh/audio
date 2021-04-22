// @flow
import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import { ModalPopup } from 'components/Modal';
import Immutable from 'seamless-immutable';
import SelectDropdown from 'components/Select';
import Topic from 'components/Topic';
import listItem from 'constants/listItemPrivate';
import {
  toDoHideGNB,
  toDoShowGNB,
  checkPlatform,
} from '../../../../utils/Helpers';

type Props = {
  isToggle: boolean,
  onTogglePopup: Function,
  isShowTwoBtn: boolean,
  onTogglePopupEdit: Function,
  title: string,
  dataEdit: Object,
  listSubject: Array<{
    id: number,
    subject: string,
  }>,
  studioPlaySubject: Array<{
    id: number,
  }>,
  status: string,
  updatePlayGroup: Function,
  isDelete: boolean,
  infoUser: Object,
  deleteGroupStudio: Function,
};

const PopupPlaylist = ({
  isToggle,
  onTogglePopup,
  isShowTwoBtn,
  onTogglePopupEdit,
  title,
  dataEdit,
  listSubject,
  studioPlaySubject,
  status,
  updatePlayGroup,
  isDelete,
  infoUser,
  deleteGroupStudio,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    title: '',
    disclose: listItem[1],
    nickName: infoUser?.name,
    topic: [],
  });

  const handleClose = () => {
    onTogglePopup(false);
    onTogglePopupEdit(false);
    toDoShowGNB();
  };

  const handleChange = (name, value) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const itemSubmit = {
      groupName: dataSubmit?.title,
      id: status === 'update' ? dataEdit?.id : 0,
      nickName: dataSubmit?.nickName,
      tbStudioSubjectIds:
        dataSubmit?.topic && Immutable.asMutable(dataSubmit.topic),
      visible: dataSubmit?.disclose?.id === 1 ? 'N' : 'Y',
    };
    if (
      dataSubmit?.title &&
      dataSubmit?.disclose &&
      dataSubmit?.nickName &&
      dataSubmit?.topic
    ) {
      updatePlayGroup(itemSubmit);
      onTogglePopup(false);
      onTogglePopupEdit(false);

      setDataSubmit({
        title: '',
        disclose: listItem[1],
        nickName: infoUser?.name,
        topic: [],
      });
      toDoShowGNB();
    }
  };

  const handleSendData = (dataTopic) => {
    setDataSubmit({
      ...dataSubmit,
      topic: [...dataTopic],
    });
  };

  const handleDelete = () => {
    deleteGroupStudio(dataEdit.id);
  };

  useEffect(() => {
    if (status === 'update') {
      if (dataEdit && dataEdit.title) {
        setDataSubmit({
          title: dataEdit?.title,
          disclose: dataEdit?.disclose,
          topic: studioPlaySubject,
          nickName: dataEdit?.nickName,
        });
      }
    }
  }, [dataEdit, studioPlaySubject, status]);

  useEffect(() => {
    if (isToggle && status !== 'update') {
      setDataSubmit({
        title: '',
        disclose: listItem[1],
        nickName: infoUser?.name,
        topic: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToggle]);
  const currentOS = checkPlatform();
  const onFocusWrapper = () => {
    if (currentOS.android) {
      toDoHideGNB();
    }
  };

  const onBlurWrapper = () => {
    if (currentOS.android) {
      toDoShowGNB();
    }
  };

  return isToggle ? (
    <ModalPopup
      isOpen
      isShowFooter
      handleClose={() => handleClose()}
      handleSubmit={() => handleSubmit()}
      customClassButton="w-100"
      textBtnRight="완료"
      textBtnLeft="삭제"
      isShowHeader
      title={title}
      customClassBody="playlist"
      isShowTwoBtn={isShowTwoBtn}
      customClass="my-playlist"
      isDelete={isDelete}
      handleDelete={handleDelete}
      isDisabledButton={
        dataSubmit?.disclose?.value === '공개' && dataSubmit?.nickName === ''
      }
    >
      <form className="popup-my">
        <div className="popup-group">
          <Input
            placeholder="제목을 입력해주세요"
            type="text"
            label="제목"
            positionIcon="left"
            onChange={(e) => handleChange('title', e.target.value)}
            value={dataSubmit?.title}
            onFocusWrapper={onFocusWrapper}
            onBlurWrapper={onBlurWrapper}
          />
        </div>
        <div className="popup-group">
          <Topic
            label="테마 선택(최대 4개)"
            sendTopic={handleSendData}
            listSubject={listSubject}
            studioPlaySubject={studioPlaySubject}
          />
        </div>
        <div className="popup-group">
          <SelectDropdown
            placeholder="비공개"
            label="공개 여부"
            listItem={listItem}
            onChange={(e) => handleChange('disclose', e)}
            option={dataSubmit?.disclose}
            isHideIconLock={false}
            isShowIconLock={
              !!(dataSubmit.disclose && dataSubmit.disclose.value === '공개')
            }
          />
        </div>
        <div className="popup-group">
          <Input
            placeholder="클릭하여 수정 하기"
            type="text"
            label="닉네임 설정"
            positionIcon="left"
            onChange={(e) => handleChange('nickName', e.target.value)}
            value={dataSubmit?.nickName}
            onFocusWrapper={onFocusWrapper}
            onBlurWrapper={onBlurWrapper}
            disabled={dataSubmit?.disclose?.value !== '공개'}
          />
        </div>
      </form>
    </ModalPopup>
  ) : (
    <></>
  );
};

export default PopupPlaylist;
