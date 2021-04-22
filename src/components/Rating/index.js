// @flow
// libs

import React, { memo } from 'react';
import ReactStars from 'react-rating-stars-component';
import IMAGES from 'themes/images';

type Props = {
  onChange?: Function,
  valueStar?: number,
  editStar?: boolean,
};

export const RatingStar = ({
  onChange = () => {},
  valueStar = 0,
  editStar = true,
}: Props) => {
  const secondExample = {
    size: 50,
    count: 5,
    color: 'black',
    activeColor: 'red',
    value: `${valueStar}`,
    a11y: true,
    // isHalf: true,
    emptyIcon: <img src={IMAGES.iconStar3} alt="" />,
    halfIcon: <img src={IMAGES.iconStar2} alt="" />,
    filledIcon: <img src={IMAGES.iconStar} alt="" />,
    onChange: (newValue) => {
      onChange(newValue);
    },
    edit: editStar,
  };
  return (
    <div className="wrap-radio">
      <ReactStars {...secondExample} />
    </div>
  );
};

RatingStar.defaultProps = {
  valueStar: 0,
  onChange: () => {},
  editStar: true,
};

export default memo<Props>(RatingStar);
