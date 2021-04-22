// Libs
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Rating from '../components/Rating';

storiesOf('Rating', module)
  .addDecorator(withInfo)
  .add('Rating', () => {
    const [ratingStar, setRatingStar] = useState(0);
    return <Rating onChange={(e) => setRatingStar(e)} valueStar={ratingStar} />;
  });
