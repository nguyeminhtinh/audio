/* eslint-disable no-nested-ternary */
// @flow

import listMenuMy, { listMenuMyLoungApp } from 'constants/listMenuMy';

import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

type Props = {
  activeTab: any,
  total: any,
  renderDataTab: Function,
  onSelect: Function,
  renderButton: any,
  renderDataStudio: Function,
  totalRecord: number,
  showPopupStudio: Function,
  isCheckShowPopup: boolean,
  deleteStudio: Function,
  idItemStudio: number,
  studioSelected: Array<{}>,
  getDataStudio: Function,
  userType: string,
};

const TagItem = ({
  activeTab,
  total,
  renderDataTab,
  onSelect,
  renderButton,
  renderDataStudio,
  totalRecord,
  showPopupStudio,
  isCheckShowPopup,
  deleteStudio,
  idItemStudio,
  studioSelected,
  getDataStudio,
  userType,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditItem = () => {
    setIsEditing(true);
  };

  const handleShowModal = () => {
    if (isCheckShowPopup && studioSelected && studioSelected.length > 0) {
      showPopupStudio();
    }
  };

  const handleDelete = () => {
    if (isCheckShowPopup && studioSelected && studioSelected.length > 0) {
      deleteStudio(idItemStudio);
    }
  };

  const renderListTag = listMenuMy.map((item) => (
    <Tab
      eventKey={item.id}
      title={item.title}
      disabled={parseInt(activeTab, 10) === item.id}
      key={item.id}
    >
      {item.id !== 4 ? (
        <>
          <div className="search-wrapper__list-button">{renderButton}</div>
          <>
            <div className="wrapper-title-audio d-flex justify-content-between align-items-center">
              <span>총 {total && total.toLocaleString('en')}개</span>
            </div>
            {renderDataTab(item.id)}
          </>
        </>
      ) : (
        <>
          <div className="wrapper-title-audio d-flex justify-content-between align-items-center studiobook">
            {isEditing ? (
              <>
                <span>
                  선택된 개수{' '}
                  {studioSelected && studioSelected.length.toLocaleString('en')}
                  개
                </span>
                <div className="wrapper-title-audio__options option-4">
                  <p role="presentation" onClick={handleDelete}>
                    {item.delete}
                  </p>
                  <p role="presentation" onClick={handleShowModal}>
                    {item.selection}
                  </p>
                  <p
                    role="presentation"
                    onClick={() => {
                      setIsEditing(false);
                      getDataStudio([]);
                    }}
                  >
                    {item.cancel}
                  </p>
                </div>
              </>
            ) : (
              <>
                {totalRecord > 0 && (
                  <>
                    <span>
                      총 {totalRecord && totalRecord.toLocaleString('en')}개
                    </span>
                    <div className="wrapper-title-audio__options option-3">
                      <p onClick={handleEditItem} role="presentation">
                        {item.selection1 && item.selection1}
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {renderDataStudio(isEditing)}
        </>
      )}
    </Tab>
  ));

  const renderListTagLoungApp = listMenuMyLoungApp.map((item) => (
    <Tab
      eventKey={item.id}
      title={item.title}
      disabled={activeTab === item.id}
      key={item.id}
    >
      {item.id !== 4 ? (
        <>
          <div className="search-wrapper__list-button">{renderButton}</div>
          <>
            <div className="wrapper-title-audio d-flex justify-content-between align-items-center">
              <span>총 {total && total.toLocaleString('en')}개</span>
            </div>
            {renderDataTab(item.id)}
          </>
        </>
      ) : (
        <>
          <div className="wrapper-title-audio d-flex justify-content-between align-items-center studiobook">
            {isEditing ? (
              <>
                <span>
                  선택된 개수{' '}
                  {studioSelected && studioSelected.length.toLocaleString('en')}
                  개
                </span>
                <div className="wrapper-title-audio__options option-4">
                  <p role="presentation" onClick={handleDelete}>
                    {item.delete}
                  </p>
                  <p role="presentation" onClick={handleShowModal}>
                    {item.selection}
                  </p>
                  <p
                    role="presentation"
                    onClick={() => {
                      setIsEditing(false);
                      getDataStudio([]);
                    }}
                  >
                    {item.cancel}
                  </p>
                </div>
              </>
            ) : (
              <>
                {totalRecord > 0 && (
                  <>
                    <span>
                      총 {totalRecord && totalRecord.toLocaleString('en')}개
                    </span>
                    <div className="wrapper-title-audio__options option-3">
                      <p onClick={handleEditItem} role="presentation">
                        {item.selection1 && item.selection1}
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {renderDataStudio(isEditing)}
        </>
      )}
    </Tab>
  ));

  return (
    <Tabs defaultActiveKey={activeTab} onSelect={onSelect}>
      {userType === 'LOCAL' ? renderListTag : renderListTagLoungApp}
    </Tabs>
  );
};

export default TagItem;
