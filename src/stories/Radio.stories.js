// Libs
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Radio from '../components/Radio';

storiesOf('Radio', module)
  .addDecorator(withInfo)
  .add('Primary', () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Radio onChange={() => setIsChecked(!isChecked)} isChecked={isChecked} />
    );
  });
