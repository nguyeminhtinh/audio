// @flow

import React, { memo } from 'react';

type Props = {
  topKeywords: Array<{
    id: number,
    name: string,
  }>,
  searchForKey: Function,
  saveTypeSearch: Function,
};

const HashTab = ({ topKeywords, searchForKey, saveTypeSearch }: Props) => {
  return (
    <div className="search-wrapper__list-history">
      <p>인기 검색어</p>
      <div className="search-wrapper__list-history__items">
        {topKeywords &&
          topKeywords.map((item) => {
            return (
              <p
                key={item.id}
                onClick={() => {
                  searchForKey(item);
                  saveTypeSearch('PO');
                }}
                role="presentation"
              >
                #{item.name}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default memo<Props>(HashTab);
