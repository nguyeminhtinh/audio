/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow

import React from 'react';

type Props = {
  name?: string,
  onChange?: Function,
  switchChecked?: boolean,
};

const SwitchButton = ({
  name,
  onChange = () => {},
  switchChecked = true,
}: Props) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name={name}
        id={name}
        onChange={onChange}
        checked={switchChecked}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

SwitchButton.defaultProps = {
  name: '',
  onChange: () => {},
  switchChecked: true,
};

export default SwitchButton;
