/* eslint-disable jsx-a11y/heading-has-content */
// @flow

import React, { memo, useEffect, useState } from 'react';
import MainLayout from 'layout/MainLayout';
import ROUTERS from 'constants/router';
import Button from 'components/Button';
import ModalPopup from 'components/Modal';
import IMAGES from 'themes/images';
import ToggleButton from 'components/ToggleButton';
import {
  fnLogOut,
  checkPlatform,
  todoLogout,
  toDoVersionInfo,
} from '../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  logout: Function,
  handlePush: Function,
  getInformationUser: Function,
  infoUser: Object,
  type: string,
  typeLogin: string,
  registerHistoryPage: Function,
};

const MyPage = ({
  history,
  logout,
  handlePush,
  getInformationUser,
  infoUser,
  type,
  typeLogin,
  registerHistoryPage,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isChecked, setIsChecked] = useState(infoUser?.pushable === 'Y');
  const handleClickPush = () => {
    setIsChecked(!isChecked);
    handlePush({ pushable: !isChecked ? 'Y' : 'N' });
  };

  useEffect(() => {
    getInformationUser();
    registerHistoryPage('SG1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      if (infoUser.userType !== 'LOUNGE') {
        if (typeof window.toDoVersionInfo === 'function') {
          toDoVersionInfo();
        } else {
          console.log('function undefine');
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'HANDLE_PUSH_SUCCESS') {
      getInformationUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const currentOS = checkPlatform();
  const handleCheckLogout = () => {
    if (typeLogin === 'kakao') {
      if (!window.Kakao.Auth.getAccessToken()) {
        console.log('Not logged in.');
        return;
      }
      // eslint-disable-next-line func-names
      window.Kakao.Auth.logout(function () {
        console.log(
          `logout ok\naccess token -> ${window.Kakao.Auth.getAccessToken()}`
        );
      });
    }
    if (currentOS.iphone) {
      fnLogOut();
    }
  };
  return (
    <MainLayout customClass="" titleHeader="??????" isShowHeader>
      <div className="myPage">
        <div className="myPage__list-wrapper">
          <ul>
            <li
              onClick={() => {
                history.push(ROUTERS.EDIT_INFO);
              }}
              role="presentation"
            >
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                ??? ?????? ??????
              </Button>
              <img src={IMAGES.arrowRight} alt="" />
            </li>
            <li
              onClick={() => {
                !infoUser?.snsType
                  ? history.push(ROUTERS.EDIT_PASSWORD)
                  : setIsShow(true);
              }}
              role="presentation"
            >
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                ???????????? ??????
              </Button>
              <img src={IMAGES.arrowRight} alt="" />
            </li>
            <li
              onClick={() => history.push(ROUTERS.SETTING_MANAGER)}
              role="presentation"
            >
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                ?????? ????????? ??????
              </Button>
              <img src={IMAGES.arrowRight} alt="" />
            </li>
            {/* <li
              onClick={() => history.push(ROUTERS.COUPON)}
              role="presentation"
            >
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                ????????? ??????
              </Button>
              <img src={IMAGES.arrowRight} alt="" />
            </li> */}
            {/* <li
              onClick={() => history.push(ROUTERS.CONNECT)}
              role="presentation"
            >
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                ???????????? ?????? ??????
              </Button>
              <div className="d-flex align-items-center">
                <p
                  className="sub-button"
                  onClick={() => {}}
                  role="presentation"
                >
                  {infoUser?.onlyWifi !== 'Y'
                    ? '????????? ????????? ??? Wi-Fi ?????? ???'
                    : 'Wi-Fi ?????? ?????????'}
                </p>
                <img src={IMAGES.arrowRight} alt="" />
              </div>
            </li> */}
            <li>
              <Button
                onClick={() => handleClickPush()}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                PUSH ??????
              </Button>
              <div className="toggle-button">
                <ToggleButton
                  onChange={() => {
                    setIsChecked(!isChecked);
                    handlePush({ pushable: !isChecked ? 'Y' : 'N' });
                  }}
                  switchChecked={isChecked}
                  name="notification"
                />
              </div>
            </li>
            <li
              onClick={() => history.push(ROUTERS.ADVISORY)}
              role="presentation"
            >
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                1:1 ??????
              </Button>
              <img src={IMAGES.arrowRight} alt="" />
            </li>
            {/* <li
              onClick={() => history.push(ROUTERS.NOTICE)}
              role="presentation"
            >
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                ????????????
              </Button>
              <img src={IMAGES.arrowRight} alt="" />
            </li> */}
            <li>
              <Button
                onClick={() => {}}
                type="button"
                customClass="button--link d-flex flex-wrap justify-content-start align-items-center"
              >
                ??? ??????
              </Button>
              <div className="button-right">
                <h3 id="version-app">V1.0.0</h3>
                <p>?????? ???????????? ?????????.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="box-policy">
          <p onClick={() => history.push(ROUTERS.TERMS)} role="presentation">
            ????????????
          </p>
          <p onClick={() => history.push(ROUTERS.POLICY)} role="presentation">
            ???????????? ????????????
          </p>
        </div>
        <div className="myPage__btn-action">
          <Button
            onClick={() => {
              logout();
              handleCheckLogout();
              todoLogout();
            }}
            type="button"
            customClass="button--link"
          >
            ????????????
          </Button>
        </div>
      </div>
      <ModalPopup
        isOpen={isOpen}
        isShowFooter
        handleClose={() => {
          setIsOpen(false);
        }}
        handleSubmit={() => {
          setIsOpen(false);
        }}
        customClassButton="w-100 buttonConfirm"
        textBtnRight="??????"
        isShowHeader
        title="??????"
      >
        <div className="title-content">???????????? ???????????????.</div>
      </ModalPopup>

      <ModalPopup
        isOpen={isShow}
        isShowFooter
        handleClose={() => {
          setIsShow(false);
        }}
        handleSubmit={() => {
          setIsShow(false);
        }}
        customClassButton="w-100 buttonConfirm"
        textBtnRight="??????"
        isShowHeader
        title="??????"
      >
        <div className="title-content">
          SNS ????????? <br />
          ??????????????? ?????? ???????????? ????????? ???????????????.
        </div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(MyPage);
