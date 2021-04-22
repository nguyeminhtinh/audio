// Libs
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import ModalPopup from '../components/Modal';
import Button from '../components/Button';

storiesOf('Modal', module)
  .addDecorator(withInfo)
  .add('Modal', () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open Modal
        </Button>
        <ModalPopup
          isOpen={isOpen}
          isShowFooter
          handleClose={() => {
            setIsOpen(false);
          }}
          handleSubmit={() => {
            setIsOpen(false);
          }}
          isShowTwoBtn
          customClassButton="w-100"
          textBtnLeft="취소"
          textBtnRight="확인"
          isShowHeader
          title="알림"
          classNameBtnRight="btn-right"
          classNameBtnLeft="btn-left"
        >
          <div className="title-content">
            등록되었습니다. 문의하신 내용은 &apos;문의내역&apos;에서 확인할 수
            있습니다.
          </div>
        </ModalPopup>
      </div>
    );
  });
