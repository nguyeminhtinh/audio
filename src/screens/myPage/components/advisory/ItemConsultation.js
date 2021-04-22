// @flow

import React, { memo, useState } from 'react';
import moment from 'moment';
import Checkbox from 'components/Checkbox';
import ROUTERS from 'constants/router';
import IMAGES from 'themes/images';

type Props = {
  itemObj: Object,
  isShowAction: boolean,
  handleCheckBox: Function,
  history: {
    push: Function,
  },
  listId: Array<number>,
};

const ItemConsultation = ({
  itemObj,
  isShowAction,
  handleCheckBox,
  history,
  listId,
}: Props) => {
  const [checkedItems, setCheckedItems] = useState({});
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    handleCheckBox([itemObj?.qnaId]);
  };
  return (
    <div className={`item ${isShowAction ? 'open' : ''}`}>
      <Checkbox
        label={itemObj?.label}
        checked={!!listId.includes(itemObj?.qnaId)}
        onChange={(e) => handleChange(e)}
        name={itemObj?.qnaId}
        content=""
        onStep={() => {}}
      />
      <div
        className="wrap-content"
        onClick={() => history.push(`${ROUTERS.ADVISORY}/${itemObj?.qnaId}`)}
        role="presentation"
        onKeyUp={() => {}}
      >
        <div className="wrapper-title d-flex align-items-center justify-content-between">
          <div className={`status ${itemObj?.reply ? 'active' : ''}`}>
            {itemObj?.reply ? '답변 완료' : '답변 대기'}
          </div>
          <div className="category">{itemObj?.name}</div>
          <div className="date">
            {itemObj && moment(itemObj.createdAt).format('YYYY.MM.DD')}
          </div>
        </div>
        <div className="title">{itemObj?.title}</div>
        <div className="icon">
          <img src={IMAGES.arrowRight} alt="" />
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(ItemConsultation);
