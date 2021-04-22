// @flow
// libs
import React, { memo } from 'react';
import IMAGES from 'themes/images';

type Props = {
  onChange: Function,
  isChecked: boolean,
};

export const Radio = ({ isChecked, onChange }: Props) => {
  return (
    <div className="wrap-radio">
      <img
        src={isChecked ? IMAGES.radioOn : IMAGES.radioOff}
        alt=""
        onClick={onChange}
        role="presentation"
        onKeyDown={onChange}
      />
    </div>
  );
};

export default memo<Props>(Radio);
