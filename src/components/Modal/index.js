/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
// @flow
// libs
import React, { memo, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'components/Button';
import images from 'themes/images';
import { toDoHideGNB, toDoShowGNB } from '../../utils/Helpers';

type Props = {
  title?: string,
  children: any,
  animation?: boolean,
  isOpen: boolean,
  size?: string,
  handleClose: Function,
  customClass?: string,
  isShowHeader?: boolean,
  isShowFooter?: boolean,
  isShowTwoBtn?: boolean,
  customClassButton?: string,
  classNameBtnLeft?: string,
  textBtnLeft?: string,
  classNameBtnRight?: string,
  textBtnRight?: any,
  handleSubmit?: Function,
  isDisabledButton?: boolean,
  isShowIconReport?: boolean,
  customClassBody?: string,
  isShowIconFilter?: boolean,
  profile?: any,
  isDelete?: boolean,
  handleDelete?: Function,
};

export const ModalPopup = ({
  title = '',
  children,
  animation = false,
  isOpen,
  size,
  handleClose,
  customClass,
  isShowHeader,
  isShowFooter,
  isShowTwoBtn,
  customClassButton = '',
  classNameBtnLeft = '',
  textBtnLeft = '',
  classNameBtnRight = '',
  textBtnRight = 'OK',
  handleSubmit = () => {},
  isDisabledButton,
  isShowIconReport = false,
  customClassBody = '',
  isShowIconFilter = false,
  profile = images.icon_popup_filter,
  isDelete = false,
  handleDelete = () => {},
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      toDoHideGNB();
    } else toDoShowGNB();
  }, [isOpen]);

  return (
    <Modal
      animation={animation}
      onHide={() => {
        return true;
      }}
      show={isOpen}
      size={size}
      className={customClass}
    >
      <div
        className="modal-content__iconClose"
        onClick={handleClose}
        role="button"
        tabIndex={0}
        onKeyUp={handleClose}
      >
        <img src={images.iconCancel} alt="" />
      </div>

      {isShowHeader && <h3 className="modal-title">{title}</h3>}
      {isShowIconReport && (
        <img src={images.icon_popup} alt="" className="icon-modal-report" />
      )}
      {isShowIconFilter && (
        <img src={profile} alt="" className="icon-modal-filter" />
      )}
      <Modal.Body>
        {!isShowHeader ? (
          <div className="modal-body__no-header">{children}</div>
        ) : (
          <div className={`modal-body__has-header ${customClassBody}`}>
            {children}
          </div>
        )}
      </Modal.Body>
      {isShowFooter && (
        <Modal.Footer>
          {!isShowTwoBtn ? (
            <Button
              type="button"
              customClass={customClassButton}
              onClick={handleSubmit}
              isDisabled={isDisabledButton}
            >
              {textBtnRight}
            </Button>
          ) : (
            <div className="group-button">
              <Button
                type="button"
                customClass={`button btn-left ${customClassButton} ${classNameBtnLeft}`}
                onClick={isDelete ? handleDelete : handleClose}
                isDisabled={isDisabledButton}
              >
                {textBtnLeft}
              </Button>
              <Button
                type="button"
                customClass={`button btn-right ${customClassButton} ${classNameBtnRight}`}
                onClick={handleSubmit}
                isDisabled={isDisabledButton}
              >
                {textBtnRight}
              </Button>
            </div>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

ModalPopup.defaultProps = {
  title: '',
  animation: false,
  size: '',
  customClass: '',
  isShowHeader: false,
  isShowFooter: false,
  isShowTwoBtn: false,
  customClassButton: '',
  classNameBtnLeft: '',
  textBtnLeft: '',
  classNameBtnRight: '',
  textBtnRight: 'OK',
  handleSubmit: () => {},
  isDisabledButton: false,
  isShowIconReport: false,
  customClassBody: '',
  isShowIconFilter: false,
  profile: images.icon_popup_filter,
  handleDelete: () => {},
  isDelete: false,
};
export default memo<Props>(ModalPopup);
