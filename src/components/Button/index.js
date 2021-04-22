// @flow
// libs
import React, { memo } from 'react';

type Props = {
  onClick: Function,
  isDisabled?: any,
  customClass?: string,
  children: any,
  type?: string,
};

const Button = ({
  isDisabled = false,
  onClick,
  customClass = '',
  children,
  type,
}: Props) => {
  return (
    <button
      type={type}
      className={`button ${customClass}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false,
  customClass: '',
  type: 'submit',
};

export default memo<Props>(Button);
