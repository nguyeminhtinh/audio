/* eslint-disable react/no-danger */
// @flow

import React, { memo, useState, useEffect } from 'react';

type Props = {
  itemObj: Object,
  keySearch: string,
  searchForKey: Function,
  saveTypeSearch: Function,
};

const ItemSearchAutoComplete = ({
  itemObj,
  keySearch,
  searchForKey,
  saveTypeSearch,
}: Props) => {
  const [textHight, setTextHight] = useState(keySearch);
  // highlight text search
  useEffect(() => {
    let res = itemObj?.name;
    if (keySearch) {
      const normReq = keySearch
        .toLowerCase()
        .replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
        .trim()
        .split(' ')
        .sort((a, b) => b.length - a.length);
      res =
        res &&
        res.replace(
          new RegExp(`(${normReq.join('|')})`, 'gi'),
          (match) => `<mark>${match}</mark>`
        );
    }
    setTextHight(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySearch]);

  return (
    <div
      className="search-wrapper__list-item__value"
      onClick={() => {
        searchForKey(itemObj);
        saveTypeSearch('AT');
      }}
      tabIndex={0}
      role="button"
      onKeyDown={() => {}}
    >
      <p dangerouslySetInnerHTML={{ __html: textHight }} />
    </div>
  );
};

export default memo<Props>(ItemSearchAutoComplete);
