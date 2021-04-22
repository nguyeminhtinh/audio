/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow

import React from 'react';

type Props = {
  name?: string,
  onChange?: Function,
  switchChecked?: boolean,
};

const ToggleButton = ({
  name,
  onChange = () => {},
  switchChecked = true,
}: Props) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        name={name}
        id={name}
        onChange={onChange}
        checked={switchChecked}
      />
      <label className="toggle-switch__label" htmlFor={name}>
        <span className="toggle-switch__label__inner" />
        <span className="toggle-switch__label__switch" />
      </label>
    </div>
  );
};

ToggleButton.defaultProps = {
  name: '',
  onChange: () => {},
  switchChecked: true,
};

export default ToggleButton;
