// @flow
import React, { memo } from 'react';
import { connect } from 'react-redux';
// import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
// import { ReactComponent as Icons } from '../../assets/icons/icons.svg';
import footerTabs from '../../constants/footerTab';

type Props = {
  onChangeTab: Function,
  activeTab?: number,
  token: string,
};

const Footer = ({ onChangeTab, activeTab, token }: Props) => {
  const isAuthenticated = token !== '';
  let footerTabUpdate = [];
  if (!isAuthenticated) {
    footerTabUpdate = footerTabs.map((item) =>
      item.key === 1 ? { ...item, link: '' } : { ...item, disable: true }
    );
  } else {
    footerTabUpdate = footerTabs;
  }

  const renderItemTab = footerTabUpdate.map((tab) => {
    const isActive = activeTab === tab.key;
    // const iconTab = {
    //   loop: false,
    //   autoplay: true,
    //   animationData: tab.classAction,
    //   rendererSettings: {
    //     preserveAspectRatio: 'xMidYMid slice',
    //   },
    // };
    // const iconTabOff = {
    //   loop: false,
    //   autoplay: false,
    //   animationData: tab.class,
    //   rendererSettings: {
    //     preserveAspectRatio: 'xMidYMid slice',
    //   },
    // };

    return (
      <div
        className={`col footer__tab ${
          activeTab === tab.key ? 'footer__tab--active' : ''
        } ${tab.disable ? 'disable-tab' : ''}`}
        key={tab.key}
        onClick={() => {
          if (!isActive) {
            onChangeTab(tab);
          }
        }}
        onKeyUp={() => {
          if (!isActive) {
            onChangeTab(tab);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <Link to={{ pathname: tab && tab.link }}>
          {activeTab === tab.key ? (
            <img src={tab.classAction} alt="" />
          ) : (
            <img src={tab.class} alt="" />
          )}
          {/* <p className="footer__title-icon">{tab.name}</p> */}
        </Link>
      </div>
    );
  });

  return (
    <footer className="container-fluid footer">
      <div className="row">{renderItemTab}</div>
    </footer>
  );
};

Footer.defaultProps = {
  activeTab: '',
};

const mapStateToProps = (state) => {
  return {
    token: state.accountReducer.token,
  };
};

export default connect(mapStateToProps, null)(memo<Props>(Footer));
