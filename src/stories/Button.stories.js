// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

// Component
import Button from '../components/Button';

storiesOf('Button', module)
  .addDecorator(withInfo)
  .add('Primary', () => (
    <Button customClass="button--primary" onClick={action('clicked')}>
      로그인
    </Button>
  ))
  .add('Secondary', () => (
    <div>
      <Button customClass="button--secondary" onClick={action('clicked')}>
        비회원 로그인
      </Button>
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <Button
        isDisabled
        customClass="button--disabled"
        onClick={action('clicked')}
      >
        비회원 로그인
      </Button>
    </div>
  ))
  .add('Blue button with icon', () => (
    <Button
      customClass="button--primary button__icon button--right--blue"
      onClick={action('clicked')}
    >
      매도하기
    </Button>
  ))
  .add('Red button with icon', () => (
    <Button
      customClass="button--primary button__icon button--right--red"
      onClick={action('clicked')}
    >
      매도하기
    </Button>
  ));
