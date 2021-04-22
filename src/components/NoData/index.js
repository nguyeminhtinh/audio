// @flow
// libs
import React, { memo } from 'react';
import IMAGES from 'themes/images';

type Props = {
  text?: string,
  children?: any,
};

export const NoData = ({
  children = '',
  text = '공지사항이 없습니다.',
}: Props) => {
  return (
    <div className="non-data">
      <img src={IMAGES.iconNonData} alt="" />
      <p>{text}</p>
      <div>{children}</div>
    </div>
  );
};

NoData.defaultProps = {
  children: '',
  text: '공지사항이 없습니다.',
};

export default memo<Props>(NoData);
