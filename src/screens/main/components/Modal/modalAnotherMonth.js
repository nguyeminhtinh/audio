// @flow
import React, { memo } from 'react';
import ModalPopup from 'components/Modal';

type Props = {
  handleIsShowSelect: Function,
  isShowSelect: boolean,
  listSelectTopic: Array<{
    id: number,
    name: string,
    router: any,
  }>,
  history: {
    push: Function,
  },
  defaultActive: Object,
};

const ModalAnotherMonth = ({
  handleIsShowSelect,
  isShowSelect,
  listSelectTopic,
  history,
  defaultActive,
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
        {listSelectTopic &&
          listSelectTopic.map((item) => {
            return (
              <p
                className={`item-edit ${
                  defaultActive?.name === item.name ? 'active' : ''
                }`}
                onClick={() => {
                  handleIsShowSelect(false);
                  history.push(item.router);
                }}
                role="presentation"
                key={item.id}
              >
                {item.name}
              </p>
            );
          })}
      </div>
    </ModalPopup>
  );
};

export default memo<Props>(ModalAnotherMonth);
