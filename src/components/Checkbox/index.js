// @flow

import React, { memo } from 'react';

type Props = {
  name?: string,
  checked: boolean,
  onChange?: Function,
  label?: string,
  onKeyPress?: Function,
  customClass?: string,
  request?: boolean,
  content: string,
  onStep: Function,
};

export const Checkbox = ({
  label = '',
  name,
  checked,
  onChange,
  onKeyPress = null,
  customClass,
  request = false,
  content,
  onStep,
}: Props) => {
  return (
    <div className={`checkbox ${checked ? 'checkbox--checked' : ''}`}>
      <label className="checkbox__label">
        <span className={customClass}>
          <span onClick={onStep} role="presentation">
            <small className={checked ? 'active' : ''}>{label} </small>
            {content}
          </span>{' '}
          {request ? <span className="request">*</span> : ''}
        </span>
        <input
          className="checkbox__input"
          id={name}
          name={name}
          type="checkbox"
          onChange={onChange}
          onKeyPress={onKeyPress}
          checked={checked}
        />
      </label>
    </div>
  );
};
Checkbox.defaultProps = {
  onKeyPress: null,
  label: '',
  customClass: '',
  onChange: null,
  name: '',
  request: false,
};

export default memo<Props>(Checkbox);
