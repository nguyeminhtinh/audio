// Libs
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import ToggleButton from '../components/ToggleButton';

storiesOf('ToggleButton', module)
  .addDecorator(withInfo)
  .add('Primary', () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <ToggleButton
        onChange={() => setIsChecked(!isChecked)}
        switchChecked={isChecked}
        name="notification"
      />
    );
  });
