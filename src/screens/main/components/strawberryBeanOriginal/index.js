/* eslint-disable no-plusplus */
// @flow

import React, { memo } from 'react';
import images from 'themes/images';
import ROUTERS from 'constants/router';
import { getValue } from '../../../../utils/Helpers';
import ItemSlideSound from '../ItemRenderStrawberry/itemSlideSound';

type Props = {
  dataCustom: Object,
  history: {
    push: Function,
  },
  saveTypeReport: Function,
  setAutoPlay: Function,
};

const StrawberryBeanOriginal = ({
  dataCustom,
  history,
  saveTypeReport,
  setAutoPlay,
}: Props) => {
  const dataCustomMain = getValue(dataCustom?.customThemes);
  const renderData =
    dataCustomMain &&
    dataCustomMain.map((item) => {
      if (item?.flowType === 'DEFAULT') {
        return (
          <>
            <div className="group-title-small">
              <h3>{item?.title}</h3>
              <img
                src={images.btn_detail_small}
                alt=""
                onClick={() =>
                  history.push({
                    pathname: `${ROUTERS.FLOW}/${item?.id}`,
                    state: {
                      typeFlow: 1,
                    },
                  })
                }
                role="presentation"
              />
            </div>
            <ItemSlideSound
              dataSlide={item.products}
              history={history}
              saveTypeReport={saveTypeReport}
              setAutoPlay={setAutoPlay}
            />
          </>
        );
      }
      return (
        <>
          <div className="group-title-small">
            <h3>{item && item[0] && item[0].title}</h3>
          </div>
          <ItemSlideSound
            dataSlide={item}
            history={history}
            saveTypeReport={saveTypeReport}
            setAutoPlay={setAutoPlay}
          />
        </>
      );
    });

  return (
    <>
      {dataCustomMain && dataCustomMain.length > 0 && (
        <div className="wrapper-home--strawBerryOriginal__list-data">
          {renderData}
        </div>
      )}
    </>
  );
};

export default memo<Props>(StrawberryBeanOriginal);
