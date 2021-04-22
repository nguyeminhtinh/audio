// @flow
import React, { memo, useState } from 'react';
import ModalPopup from 'components/Modal';
import Radio from 'components/Radio';

type Props = {
  handleIsShowModal: Function,
  isShowModal: boolean,
  listItemReport: Array<{
    id: number,
    report: string,
  }>,
  handleIsCloseModal: Function,
};

const ModalPopupItem = ({
  handleIsShowModal,
  isShowModal,
  listItemReport,
  handleIsCloseModal,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    idReport: 1,
    content: '',
  });
  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const renderRadio =
    listItemReport &&
    listItemReport.map((item) => {
      return (
        <div className="group-radio" key={item.id}>
          <Radio
            onChange={() => setDataSubmit({ ...dataSubmit, idReport: item.id })}
            isChecked={dataSubmit.idReport === item.id}
          />
          <p className={`${dataSubmit.idReport === item.id ? 'active' : ''} `}>
            {item.report}
          </p>
        </div>
      );
    });
  return (
    <ModalPopup
      isOpen={isShowModal}
      handleClose={handleIsCloseModal}
      handleSubmit={() => handleIsShowModal(dataSubmit)}
      customClass="w-100 modal-report"
      isShowFooter
      customClassButton="w-100"
      textBtnRight="확인"
      isShowIconReport
    >
      <div className="title-content">신고사유</div>
      <div className="modal-report__content">
        {renderRadio}
        <textarea
          placeholder=""
          name="contents"
          rows="5"
          value={dataSubmit.content}
          onChange={(e) => {
            handleChange(e.target.value, 'content');
          }}
        />
      </div>
    </ModalPopup>
  );
};

export default memo<Props>(ModalPopupItem);
