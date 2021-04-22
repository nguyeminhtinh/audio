// Libs
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Checkbox } from '../components/Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withInfo)
  .add('Checkbox', () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Checkbox
        onChange={() => {
          setIsChecked(!isChecked);
        }}
        checked={isChecked}
      />
    );
  });
