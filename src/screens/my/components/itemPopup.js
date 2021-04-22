/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
// @flow
import React, { useEffect, useState } from 'react';
import { ModalPopup } from 'components/Modal';
import SelectDropdown from 'components/Select';
import Input from 'components/Input';
import createClassInputName from 'constants/createClassInputName';
// eslint-disable-next-line no-unused-vars

type Props = {
  listData: Array<{
    id: number,
    title: string,
    usable: string,
    recorder: string,
  }>,
  isShowPopup: boolean,
  hiddenPopup: Function,
  handleSubmit: Function,
};

const ItemPopup = ({
  listData,
  isShowPopup,
  hiddenPopup,
  handleSubmit,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    id: 0,
    title: '',
    disclose: null,
    name: '',
  });
  const listItem = [
    { id: 1, value: '비공개', label: '비공개' },
    { id: 2, value: '공개', label: '공개' },
  ];

  const [classTextDefault, setClassTextDefault] = useState(false);
  const [classNickname, setClassNickname] = useState('');

  useEffect(() => {
    if (listData.length > 0) {
      setDataSubmit({
        id: listData[0].id,
        title: listData[0].title,
        disclose: listData[0].usable === 'Y' ? listItem[1] : listItem[0],
        name: listData[0].recorder,
      });

      setClassNickname(createClassInputName(listData[0].recorder));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listData]);

  const handleChange = (name, value) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });

    setClassNickname(createClassInputName(value));
  };

  const handleSubmitForm = () => {
    if (!dataSubmit.title || !dataSubmit.disclose || !dataSubmit.name) {
      return false;
    }
    handleSubmit(dataSubmit);
  };

  const handleFocusTextName = () => {
    // eslint-disable-next-line no-use-before-define
    handleFocus('name', dataSubmit.name);
  };

  const handleFocus = (name, value) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
    setClassTextDefault(true);
  };

  const handleBlur = () => {
    setClassTextDefault(false);
    setDataSubmit({
      ...dataSubmit,
      name: dataSubmit.name,
    });
  };

  return (
    <ModalPopup
      isOpen={isShowPopup}
      isShowFooter
      handleClose={() => hiddenPopup()}
      handleSubmit={() => {
        hiddenPopup();
        handleSubmitForm();
      }}
      customClassButton="w-100"
      textBtnRight="완료"
      isShowHeader
      title="스튜디오북 수정하기"
    >
      <form className="popup-my">
        <div className="popup-group">
          <Input
            placeholder="오브레인 예술놀이 그림"
            type="text"
            label="제목"
            positionIcon="left"
            onChange={(e) => handleChange('title', e.target.value)}
            value={dataSubmit.title}
          />
        </div>
        <div className="popup-group">
          <SelectDropdown
            placeholder="비공개"
            label="공개 여부"
            listItem={listItem}
            onChange={(e) => handleChange('disclose', e)}
            option={dataSubmit.disclose}
            isHideIconLock={false}
            isShowIconLock={
              dataSubmit.disclose && dataSubmit.disclose.value === '공개'
                ? // eslint-disable-next-line no-unneeded-ternary
                  true
                : false
            }
          />
        </div>
        <div
          className={
            classTextDefault
              ? 'popup-group input-nickname pl'
              : 'popup-group input-nickname'
          }
        >
          <p
            className={
              classTextDefault ? 'text-default d-none' : 'text-default'
            }
            role="presentation"
            onClick={handleFocusTextName}
          >
            {dataSubmit.name.length > 7
              ? `${dataSubmit.name.slice(0, 7)}...`
              : dataSubmit.name}
          </p>
          <Input
            placeholder="클릭하여 수정 하기"
            type="text"
            label="닉네임 설정"
            positionIcon="left"
            customClassName={classNickname}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange('name', e.target.value)}
            value={classTextDefault ? dataSubmit.name : ''}
          />
        </div>
      </form>
    </ModalPopup>
  );
};

export default ItemPopup;
