// @flow

import React, { memo, useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type Props = {
  children: any,
  isShowHeader?: boolean,
  isShowFooter?: boolean,
  titleHeader?: string,
  customClassHeader?: string,
  activePage?: number,
  icoBackWhite?: boolean,
  customClass?: string,
  clickIcoMenu?: Function,
  isMarginBottom?: boolean,
  isShowHeaderMain?: boolean,
  fontWeight?: string,
  isLink?: boolean,
  isShowIconBackFunction?: boolean,
  iconBackFunction?: Function,
  isShowPen?: boolean,
  isShowShare?: boolean,
  isShowMenu?: boolean,
  isShowBtnDetail?: boolean,
  isShowSetting?: boolean,
  isShowComplement?: boolean,
  handleEdit?: Function,
  handleClickMenu?: Function,
  handelClickShowModal?: Function,
  isShowIconHome?: boolean,
  isShowIconDownload?: boolean,
  isStrawberryMember?: boolean,
  handleSaveHistorySearch?: Function,
  isShowLibrary?: boolean,
};

const MainLayout = ({
  children,
  isShowHeader = false,
  isShowFooter = false,
  isShowMenu = false,
  titleHeader = '',
  customClassHeader = '',
  customClass = '',
  activePage = 1,
  icoBackWhite = false,
  clickIcoMenu = () => {},
  isMarginBottom = false,
  isShowHeaderMain = false,
  fontWeight = '',
  isLink = false,
  isShowIconBackFunction = false,
  iconBackFunction = () => {},
  isShowPen = false,
  isShowShare = false,
  isShowBtnDetail = false,
  isShowSetting = false,
  isShowComplement = false,
  handleEdit = () => {},
  handleClickMenu = () => {},
  handelClickShowModal = () => {},
  isShowIconHome = false,
  isShowIconDownload = false,
  isStrawberryMember = false,
  handleSaveHistorySearch = () => {},
  isShowLibrary = false,
}: Props) => {
  const [activeTab, setActiveTab] = useState(activePage);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  return (
    <div
      className={`${isShowFooter ? 'mb-80' : ''}  ${
        isMarginBottom ? 'mb-80' : ''
      } ${customClass}`}
    >
      {isShowHeader && ( // isShowHeader = false is hide header
        <Header
          title={titleHeader} // name of title
          customClassHeader={customClassHeader}
          icoBackWhite={icoBackWhite} // icoBlack = true is show icon back
          clickIcoMenu={clickIcoMenu} // function if click icoBlack ()
          isShowHeaderMain={isShowHeaderMain} // isShowHeaderMain = true is show header main
          isLink={isLink}
          handelClickShowModal={handelClickShowModal}
          isShowIcon
          fontWeight={fontWeight}
          isShowIconBackFunction={isShowIconBackFunction}
          iconBackFunction={iconBackFunction}
          isShowPen={isShowPen}
          isShowShare={isShowShare}
          isShowBtnDetail={isShowBtnDetail}
          handleEdit={handleEdit}
          isShowMenu={isShowMenu}
          handleClickMenu={handleClickMenu}
          isShowIconHome={isShowIconHome}
          isShowSetting={isShowSetting}
          isShowComplement={isShowComplement}
          isShowIconDownload={isShowIconDownload}
          isStrawberryMember={isStrawberryMember}
          handleSaveHistorySearch={handleSaveHistorySearch}
          isShowLibrary={isShowLibrary}
        />
      )}
      {children}

      {isShowFooter && (
        <Footer
          onChangeTab={(tab) => {
            setActiveTab(tab.key);
          }}
          activeTab={activeTab} // number tab active
        />
      )}
    </div>
  );
};

MainLayout.defaultProps = {
  isShowHeader: false,
  isShowFooter: false,
  titleHeader: '',
  customClassHeader: '',
  activePage: 1,
  icoBackWhite: false,
  customClass: '',
  clickIcoMenu: () => {},
  isMarginBottom: false,
  isShowHeaderMain: false,
  fontWeight: '',
  isLink: false,
  handelClickShowModal: () => {},
  isShowIconBackFunction: false,
  iconBackFunction: () => {},
  isShowPen: false,
  isShowShare: false,
  isShowBtnDetail: false,
  isShowMenu: false,
  isShowSetting: false,
  isShowComplement: false,
  handleEdit: () => {},
  handleClickMenu: () => {},
  isShowIconHome: false,
  isShowIconDownload: false,
  isStrawberryMember: false,
  handleSaveHistorySearch: () => {},
  isShowLibrary: false,
};
export default memo<Props>(MainLayout);
