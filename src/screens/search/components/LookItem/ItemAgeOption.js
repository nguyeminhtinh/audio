// @flow

import React, { memo } from 'react';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';

type Props = {
  itemObj: Object,
  history: {
    push: Function,
  },
  getTabActive: Function,
};

const ItemAgeOption = ({ history, itemObj, getTabActive }: Props) => {
  const renderAge = (e) => {
    switch (e?.ageFrom) {
      case null:
        return <img src={IMAGES.icon_age_all} alt="" />;
      case 1:
        return <img src={IMAGES.iconAge} alt="" />;
      case 4:
        return <img src={IMAGES.iconAge2} alt="" />;
      case 7:
        return <img src={IMAGES.iconAge3} alt="" />;
      case 10:
        return <img src={IMAGES.iconAge4} alt="" />;
      default:
        break;
    }
    return null;
  };
  return (
    <div
      className="search-wrapper__age__box"
      onClick={() => {
        history.push(`${ROUTERS.SEARCH}/${itemObj.id}`);
        getTabActive({ activeTab: '3', categorySearch: itemObj });
      }}
      tabIndex={0}
      role="button"
      onKeyDown={() => {}}
    >
      {renderAge(itemObj)}
      <p className="settingInterest__chooseAge__box__category">
        {itemObj?.ageGroup ? itemObj?.ageGroup : '전체'}
      </p>
      {itemObj?.ageFrom === null ? (
        <p className="settingInterest__chooseAge__box__value">전연령</p>
      ) : (
        <p className="settingInterest__chooseAge__box__value">
          {`${itemObj?.ageFrom}-${itemObj?.ageTo}세`}
        </p>
      )}
    </div>
  );
};

export default memo<Props>(ItemAgeOption);
