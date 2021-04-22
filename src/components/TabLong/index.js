/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow

import React, { memo } from 'react';
import { Tab } from 'react-bootstrap';

type Props = {
  children?: any,
  title: any,
  eventKey: string,
};

const TabLong = ({ children = '', title, eventKey }: Props) => {
  return (
    <Tab eventKey={eventKey} title={title}>
      {children}
    </Tab>
  );
};

TabLong.defaultProps = {
  children: '',
};

export default memo<Props>(TabLong);
