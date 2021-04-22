// @flow
// libs
import React, { memo } from 'react';

type Props = {
  title: string,
  request?: boolean,
  name?: string,
  id?: string,
  handleChange: Function,
  errorMsg?: string,
};

const File = ({
  title,
  request = false,
  name = '',
  id = '',
  handleChange,
  errorMsg,
}: Props) => {
  return (
    <div className="file-wrapper">
      <p className="file-wrapper__title d-flex">
        {title}
        {request && <span className="request">*</span>}
      </p>
      <div className="file-wrapper__content click-active">
        <input
          className="file-wrapper__content--custom"
          type="file"
          onChange={handleChange}
          name={name}
          id={id}
          accept="image/jpg, image/jpeg, image/png, application/pdf, capture=camera"
        />
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

File.defaultProps = {
  request: false,
  name: '',
  id: '',
  errorMsg: '',
};
export default memo<Props>(File);
