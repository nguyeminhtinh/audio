// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import { Loading } from '../components/Loading';

storiesOf('Loading', module)
  .addDecorator(withInfo)
  .add('Loading', () => (
    <Loading
      animation="border"
      role="status"
      className=""
      text=""
      variant="dark"
      size="lg"
    />
  ));
