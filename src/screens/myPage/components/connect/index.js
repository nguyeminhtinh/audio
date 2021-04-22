// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import listItemConnect from 'constants/listItemConnect';
import { Radio } from 'components/Radio';
import { sendStatusWiFi } from '../../../../utils/Helpers';

type Props = {
  settingWiFi: Function,
  getInformationUser: Function,
  infoUser: Object,
  type: string,
};

const PlayBookConnect = ({
  settingWiFi,
  getInformationUser,
  infoUser,
  type,
}: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    idReport: infoUser?.onlyWifi === 'Y' ? 2 : 1,
  });

  useEffect(() => {
    if (type === 'SETTING_WI_FI_SUCCESS') {
      getInformationUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleChangeRadio = (item) => {
    setDataSubmit({ idReport: item.id });
    settingWiFi({
      onlyWifi: item.id === 2 ? 'Y' : 'N',
    });
    sendStatusWiFi(item.id === 2 ? 'wifi' : 'mobile');
  };

  const renderItemConnect = listItemConnect.map((item) => {
    return (
      <div className="connect__item" key={item.id}>
        <span>{item.title}</span>
        <div className="connect__item--radio">
          <Radio
            onChange={() => handleChangeRadio(item)}
            isChecked={dataSubmit.idReport === item.id}
          />
        </div>
      </div>
    );
  });
  return (
    <MainLayout
      customClass=""
      titleHeader="플레이북 재생 설정"
      isShowHeader
      isLink
    >
      <div className="connect">{renderItemConnect}</div>
    </MainLayout>
  );
};

export default memo<Props>(PlayBookConnect);
