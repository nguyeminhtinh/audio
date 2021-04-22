/* eslint-disable no-nested-ternary */
// @flow

import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
  children?: any,
  isLink?: boolean,
  // link?: string,
  customClass?: string,
  // icoBackWhite?: boolean,
  // icoClose?: boolean,
  title: string,
  fontWeight?: string,
  // stateData?: any,
  isCenter?: boolean,
  onClick?: Function,
  // history?: {
  //   push: Function,
  //   listen: Function,
  //   replace: Function,
  //   go: Function,
  //   location: Object,
  // },
  // isDetail?: boolean,
  // isTermsCondition?: boolean,
};
const SubHeader = ({
  children = '',
  isLink = false,
  // link = '',
  customClass = '',
  // icoBackWhite = false,
  fontWeight = '',
  // icoClose = false,
  title,
  isCenter = false,
  onClick,
}: // history = () => {},
// isDetail = false,
// isTermsCondition = false,
Props) => {
  return (
    <div className={`app-sub-header  ${customClass}`}>
      <div
        className={`app-sub-header__content d-flex align-items-center  ${
          isCenter ? 'app-sub-header__content--center' : ''
        }`}
      >
        {isLink && (
          <div
            className="app-sub-header__content__ico"
            onClick={onClick}
            role="button"
            onKeyUp={onClick}
            tabIndex="0"
          >
            <div className="d-flex align-items-center"> {'<'} </div>
          </div>
        )}
        <div
          className={`app-sub-header__content__text app-sub-header__content__text--${fontWeight}`}
        >
          <span>{title}</span>
        </div>
        <div className="app-sub-header__content__right ">
          <div className="app-sub-header__content__right__group-ico d-flex align-items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
SubHeader.defaultProps = {
  isLink: false,
  // link: '',
  customClass: '',
  // icoBackWhite: false,
  children: '',
  fontWeight: '',
  // stateData: '',
  // icoClose: false,
  isCenter: false,
  onClick: () => {},
  // history: () => {},
  // isTermsCondition: false,
  // isDetail: false,
};
export default withRouter(memo<Props>(SubHeader));
