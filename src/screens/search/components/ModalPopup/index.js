// @flow
import React, { memo } from 'react';
import ModalPopup from 'components/Modal';

type Props = {
  handleIsShowSelect: Function,
  isShowSelect: boolean,
  listSelect: Array<{
    id: number,
    value: string,
  }>,
  defaultSelect: Object,
  handleSetDefaultSelect: Function,
  handleChangeItem: Function,
};

const ModalPopupItem = ({
  handleIsShowSelect,
  isShowSelect,
  listSelect,
  defaultSelect,
  handleSetDefaultSelect,
  handleChangeItem,
}: Props) => {
  return (
    <ModalPopup
      isOpen={isShowSelect}
      handleClose={() => {
        handleIsShowSelect(false);
      }}
      customClass="w-100 modal-edit"
    >
      <div className="title-content">
        {listSelect &&
          listSelect.map((item) => {
            return (
              <p
                className={`item-edit ${
                  defaultSelect.value === item.value ? 'active' : ''
                }`}
                onClick={() => {
                  handleIsShowSelect(false);
                  handleSetDefaultSelect(item);
                  handleChangeItem();
                }}
                role="presentation"
                key={item.id}
              >
                {item.value}
              </p>
            );
          })}
      </div>
    </ModalPopup>
  );
};

export default memo<Props>(ModalPopupItem);
