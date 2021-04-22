// @flow
import React, { memo } from 'react';

type Props = {
  placeholder: string,
  onClick: Function,
  value: string,
};

const InputDatePicker = React.forwardRef(
  ({ onClick, placeholder, value }: Props, { innerRef = null }: any) => {
    return (
      <div className="input__wrapper input-date-picker m-0">
        <div className="input__box">
          <input
            className="input-change"
            placeholder={placeholder}
            onClick={onClick}
            value={value}
            readOnly
            ref={innerRef}
          />
        </div>
      </div>
    );
  }
);

export default memo<Props>(InputDatePicker);
