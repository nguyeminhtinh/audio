// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// Component
import File from '../components/File';

storiesOf('File', module)
  .addDecorator(withInfo)
  .add('Primary', () => <File title="사업자등록증" />);
