/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// @flow
import React, { useState } from 'react';
import Select, { components } from 'react-select';
import images from 'themes/images';

type Props = {
  placeholder?: string,
  errorMsg?: string,
  label?: string,
  disabled?: boolean,
  isSearchable?: boolean,
  onBlur?: Function,
  onChange?: Function,
  listOptionString?: Array<{ id: number, name: any }>,
  listItem?: Array<{
    id: number,
    value: any,
    label: string,
  }>,
  innerRef?: any,
  option?: Object,
  noOptionsMessage?: Function,
  customClass?: string,
  request?: boolean,
  noLabel?: boolean,
  isShowIconLock?: boolean,
  isHideIconLock?: boolean,
};
const SelectDropdown = ({
  placeholder = '',
  errorMsg = '',
  label = '',
  disabled = false,
  isSearchable = false,
  onBlur = null,
  onChange = () => {},
  innerRef = null,
  option = {},
  noOptionsMessage = () => {},
  listOptionString = [],
  customClass = '',
  request = false,
  noLabel = false,
  listItem,
  isShowIconLock,
  isHideIconLock = true,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const DropdownIndicator = (props) => {
    setIsActive(props?.selectProps?.menuIsOpen);
    return (
      <components.DropdownIndicator {...props}>
        <div className="d-none" />
      </components.DropdownIndicator>
    );
  };

  return (
    <div
      className={`customer-select ${customClass.length > 0 ? customClass : ''}`}
    >
      {!!label && (
        <p className="input__label">
          {label}
          {request && <span className="request">*</span>}
        </p>
      )}
      <div className={`input__box ${isActive ? 'down' : ''}`}>
        {!isHideIconLock && (
          <div className="private">
            {isShowIconLock && <img src={images.icon_unlock} alt="" />}
            {!isShowIconLock && <img src={images.icon_lock} alt="" />}
          </div>
        )}

        <Select
          placeholder={placeholder}
          components={{ DropdownIndicator }}
          ref={innerRef}
          value={option || null}
          onChange={onChange}
          noOptionsMessage={noOptionsMessage}
          options={
            noLabel
              ? listOptionString.map((item) => ({
                  id: item.id,
                  value: item.name,
                  label: item.name,
                }))
              : listItem
          }
          blurInputOnSelect={onBlur}
          isDisabled={disabled}
          isSearchable={isSearchable}
        />
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};
SelectDropdown.defaultProps = {
  placeholder: '',
  errorMsg: '',
  label: '',
  disabled: false,
  isSearchable: false,
  // icon: '',
  noLabel: false,
  onBlur: null,
  onChange: () => {},
  innerRef: null,
  listItem: [],
  listOptionString: [],
  option: {},
  noOptionsMessage: () => {},
  customClass: '',
  request: false,
  isShowIconLock: false,
  isHideIconLock: true,
};
export default SelectDropdown;
