// @flow

import React, { memo } from 'react';
import ROUTERS from 'constants/router';

type Props = {
  itemObj: Object,
  history: {
    push: Function,
  },
  getTabActiveSubject: Function,
};

const ItemCategoryOption = ({
  history,
  itemObj,
  getTabActiveSubject,
}: Props) => {
  return (
    <div
      className="search-wrapper__chooseInterest__list__box"
      onClick={() => {
        history.push(`${ROUTERS.SEARCH_AGE}/${itemObj?.id}`);
        getTabActiveSubject({ activeTab: 1, subject: itemObj });
      }}
      tabIndex={0}
      role="button"
      onKeyDown={() => {}}
    >
      <div className="settingInterest__chooseInterest__list__box__shadow" />
      <img src={itemObj?.image} alt="" />
      <p>{itemObj?.subject}</p>
    </div>
  );
};

export default memo<Props>(ItemCategoryOption);
