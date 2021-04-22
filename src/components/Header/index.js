// @flow

import React, { memo, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as searchCreators } from 'screens/search/redux';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import menuItems from 'constants/menuItems';
import Button from 'components/Button';
import Lottie from 'react-lottie';
import logo from '../../assets/json/logo_header.json';
import {
  toDoBackKey,
  toDoAudioStop,
  toDoShowMusicPlayer,
} from '../../utils/Helpers';

const iconLogo = {
  loop: false,
  autoplay: true,
  animationData: logo,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

type Props = {
  children?: any,
  isLink?: boolean,
  customClass?: string,
  title: string,
  fontWeight?: string,
  isCenter?: boolean,
  onClick?: Function,
  itemActive?: number,
  history?: {
    push: Function,
  },
  isShowIcon?: boolean,
  isShowMenu?: boolean,
  isShowIconBackFunction?: boolean,
  iconBackFunction?: Function,
  isShowPen?: boolean,
  isShowHeaderMain?: boolean,
  isShowShare?: boolean,
  isShowBtnDetail?: boolean,
  isShowSetting?: boolean,
  isShowComplement?: boolean,
  handleEdit?: Function,
  handleClickMenu?: Function,
  handelClickShowModal?: Function,
  infoUser: Object,
  isShowIconHome?: boolean,
  getKeySearch: Function,
  isShowIconDownload?: boolean,
  isStrawberryMember?: boolean,
  saveHistorySearch: Function,
  isShowLibrary?: boolean,
};

const Header = ({
  children = '',
  isLink = false,
  isShowMenu = false,
  customClass = '',
  fontWeight = '',
  title,
  itemActive,
  isCenter = false,
  onClick,
  isShowIcon = false,
  isShowIconBackFunction = false,
  iconBackFunction = () => {},
  isShowHeaderMain = false,
  isShowPen = false,
  isShowShare = false,
  isShowBtnDetail = false,
  isShowSetting = false,
  isShowComplement = false,
  handleEdit = () => {},
  history = () => {},
  handleClickMenu = () => {},
  handelClickShowModal = () => {},
  infoUser,
  isShowIconHome = false,
  getKeySearch,
  isShowIconDownload = false,
  isStrawberryMember = false,
  saveHistorySearch,
  isShowLibrary = false,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);

  // strawberry member?
  // call api get data Main
  const handleMenuOff = () => {
    if (document.body) {
      document.body.className = '';
    }
  };
  const handleBack = () => {
    window.history.go(-1);
    toDoShowMusicPlayer();
  };
  const itemsMenu =
    menuItems &&
    menuItems.map((item) => {
      return (
        <li
          key={item.key}
          className={`${itemActive === item.key ? 'active' : ''}`}
        >
          <Link
            to={item.link}
            onClick={(() => handleClickMenu(item), handleMenuOff)}
          >
            <img src={item.icon} alt="" />
            <p>{item.name}</p>
          </Link>
        </li>
      );
    });
  const [isShowMenuLeft, setIsShowMenuLeft] = useState(false);

  const handleShowMenu = () => {
    setIsShowMenuLeft(!isShowMenuLeft);
    if (document.body) {
      if (!isShowMenuLeft) {
        document.body.className = 'showMenu';
      } else {
        document.body.className = '';
      }
    }
  };
  const closeMenu = () => {
    (document.body: window.HTMLBodyElement).className = '';
    setIsShowMenuLeft(false);
  };

  const handleSaveHistorySearch = () => {
    saveHistorySearch({
      cookie: '',
      svcType: `${
        infoUser?.userType === 'LOCAL' ? 'DDALGICONG' : 'LOUNGE_DDALGICONG'
      }`,
      exhibitionType: `${
        infoUser?.userType === 'LOCAL' ? 'DDALGICONG' : 'LOUNGE'
      }`,
      sysType: 'MOBILE',
    });
  };

  return (
    <div className={`wrapper ${isShowMenu ? 'nav-has-menu' : ''}`}>
      {isShowMenu && infoUser.userType !== 'LOCAL' && (
        <>
          <div
            className="icon-menu"
            role="button"
            tabIndex={0}
            onClick={handleShowMenu}
            onKeyUp={handleShowMenu}
          >
            <img src={IMAGES.btnMenu} alt="" />
          </div>
          {isShowMenu && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <div
              className={`${isShowMenuLeft ? 'd-block' : 'd-none'} overlay`}
              onClick={closeMenu}
              role="button"
              tabIndex={0}
              onKeyDown={closeMenu}
            />
          )}
          <div className={` ${isShowMenuLeft ? 'open' : ''} nav-navigation`}>
            <div className="profile">
              <div
                className="image"
                onClick={() => history.push(ROUTERS.MY)}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
              >
                <img
                  src={`https://down.wjthinkbig.com${infoUser?.imgPath}`}
                  alt=""
                  onError={(e) => {
                    if (loadImage) {
                      setLoadImage({
                        loadImage: false,
                      });
                      e.target.src = IMAGES.image_not_found;
                    }
                  }}
                />
                {/* <img src={renderAvatar(infoUser?.iconId)} alt="avatar" /> */}
              </div>
              <div className="name">
                {infoUser?.name}
                <span>님</span>
              </div>
            </div>
            <ul className="menu">{itemsMenu}</ul>
            <div>
              <Button
                onClick={() => {
                  toDoAudioStop();
                  toDoBackKey();
                }}
                customClass="btn-logout"
              >
                <img src={IMAGES.icon_out} alt="" />
                라운지로 돌아가기
              </Button>
            </div>
          </div>
        </>
      )}

      {isShowHeaderMain === true ? (
        <header className="fixed white header">
          <div className="header__fixed">
            <Lottie options={iconLogo} isStopped={false} isPaused={false} />
          </div>
          <div className="header__group-action pr-0">
            {isShowLibrary && (
              <img
                src={IMAGES.icon_library}
                alt="icon_library"
                onClick={() => history.push(ROUTERS.LIBRARY)}
                role="presentation"
              />
            )}
            <img
              src={IMAGES.btnSearch}
              alt="icon_search"
              onClick={() => {
                history.push(ROUTERS.SEARCH);
                handleSaveHistorySearch();
                getKeySearch('');
              }}
              role="presentation"
              className="icon-search"
            />
          </div>
        </header>
      ) : (
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
                <div className="d-flex align-items-center">
                  {isShowIcon && (
                    <p
                      onClick={
                        isShowIconBackFunction ? iconBackFunction : handleBack
                      }
                      onKeyDown={
                        isShowIconBackFunction ? iconBackFunction : handleBack
                      }
                      role="presentation"
                    >
                      <img src={IMAGES.iconBack} alt="icon_back" />
                    </p>
                  )}
                </div>
              </div>
            )}
            <div
              className={`app-sub-header__content__text app-sub-header__content__text--${fontWeight} ${
                isShowShare ? 'customPadding' : ''
              }  `}
              onClick={handleEdit}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              <span>{title}</span>
              {isShowComplement && (
                <div className="app-sub-header__content__text__complement">
                  {isStrawberryMember ? (
                    <p className="strawberry-member">딸기콩 회원</p>
                  ) : (
                    <p>일반회원</p>
                  )}
                </div>
              )}
              {isShowPen && (
                <img
                  src={IMAGES.icon_arrow_down}
                  alt="icon_pen"
                  className="btn-edit"
                />
              )}
            </div>
            <div className="app-sub-header__content__group-share">
              {isShowIconHome && (
                <img
                  src={IMAGES.tab_home}
                  alt="icon_bebe"
                  onClick={() => history.push(ROUTERS.MAIN)}
                  role="presentation"
                />
              )}
              {isShowShare && (
                <div className="">
                  <img
                    src={IMAGES.btnSearch}
                    alt="icon_search"
                    onClick={() => {
                      handleSaveHistorySearch();
                      history.push(ROUTERS.SEARCH);
                      getKeySearch('');
                    }}
                    role="presentation"
                    className="pr-0"
                  />
                </div>
              )}

              {isShowBtnDetail && (
                <div
                  className="action"
                  onClick={() => handelClickShowModal()}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                >
                  <img src={IMAGES.btnDetail} alt="" />
                </div>
              )}
              {isShowIconDownload && (
                <div
                  className="action"
                  onClick={() => {}}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                >
                  <img src={IMAGES.icon_download} alt="" />
                </div>
              )}
            </div>
            <div className="app-sub-header__content__right ">
              <div className="app-sub-header__content__right__group-ico d-flex align-items-center">
                {children}
              </div>
            </div>
            {isShowSetting && infoUser.userType === 'LOCAL' && (
              <div className="app-sub-header__content__setting">
                <img
                  src={IMAGES.icon_setting}
                  alt=""
                  onClick={() => history.push(ROUTERS.MY_PAGE)}
                  role="presentation"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    infoUser: state.myReducer.infoUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getKeySearch: searchCreators.getKeySearch,
      saveHistorySearch: searchCreators.saveHistorySearch,
    },
    dispatch
  );

Header.defaultProps = {
  isLink: false,
  customClass: '',
  children: '',
  fontWeight: '',
  isCenter: false,
  onClick: () => {},
  history: () => {},
  isShowIcon: false,
  isShowMenu: false,
  isShowHeaderMain: false,
  isShowPen: false,
  itemActive: false,
  isShowShare: false,
  isShowBtnDetail: false,
  isShowSetting: false,
  isShowComplement: false,
  handleEdit: () => {},
  isShowIconBackFunction: false,
  iconBackFunction: () => {},
  handleClickMenu: () => {},
  handelClickShowModal: () => {},
  isShowIconHome: false,
  isShowIconDownload: false,
  isStrawberryMember: false,
  isShowLibrary: false,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(memo<Props>(Header)));
