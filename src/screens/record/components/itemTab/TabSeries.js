// @flow

import React, { memo, useState, useEffect } from 'react';
import NoData from 'components/NoData';
import Button from 'components/Button';
import IMAGES from 'themes/images';
import ROUTERS from 'constants/router';
import {
  toDoShowMusicPlayer,
  toDoHideMusicPlayer,
} from '../../../../utils/Helpers';

type Props = {
  dataStudioSeries: Array<{
    id: number,
    title: string,
    thumbnailUrl: string,
  }>,
  audioOption: Array<{}>,
  handleChangeOption: Function,
  handleSetAudio: Function,
  listAudio: Array<{
    id: number,
    productName: string,
    thumbnailUrl: string,
    contentsUrl: string,
    duration: number,
  }>,
  handleSetAudioAll: Function,
  history: {
    push: Function,
  },
  handleSetActiveTab: Function,
  listPlayerSelective: Function,
  handleShowPlayer: Function,
};
const ItemSeries = ({
  dataStudioSeries,
  audioOption,
  handleChangeOption,
  handleSetAudio,
  listAudio,
  handleSetAudioAll,
  history,
  handleSetActiveTab,
  listPlayerSelective,
  handleShowPlayer,
}: Props) => {
  const [isSelective, setIsSelective] = useState(false);
  const [loadImage, setLoadImage] = useState(true);
  useEffect(() => {
    if (!isSelective) {
      toDoShowMusicPlayer();
    } else {
      toDoHideMusicPlayer();
    }
  }, [isSelective]);
  const renderStrawberry =
    dataStudioSeries && dataStudioSeries.length > 0 ? (
      dataStudioSeries &&
      dataStudioSeries.map((item, index) => {
        const idActive = audioOption.filter((items) => items === item.id);
        return (
          <div
            className={`strawberry__listAudio__items ${
              idActive && idActive[0] === item.id ? 'active' : ''
            }`}
            key={item.id}
          >
            <div
              className="d-flex box-left"
              onClick={() => {
                isSelective
                  ? handleChangeOption(item.id, dataStudioSeries[index])
                  : history.push(`${ROUTERS.STUDIO}/${item.id}`);
                handleSetActiveTab();
              }}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <div className="strawberry__listAudio__items__left">
                <img
                  src={
                    `https://down.wjthinkbig.com${item.thumbnailUrl}` ||
                    IMAGES.image_not_found
                  }
                  alt="Images"
                  onError={(e) => {
                    if (loadImage) {
                      setLoadImage({
                        loadImage: false,
                      });
                      e.target.src = IMAGES.image_not_found;
                    }
                  }}
                />
              </div>
              <div className="strawberry__listAudio__items__center">
                <h3>{item.title}</h3>
              </div>
            </div>
            <div className="strawberry__listAudio__items__right">
              <img
                src={IMAGES.iconAudio}
                alt=""
                onClick={() => !isSelective && handleShowPlayer(item.id)}
                role="presentation"
              />
            </div>
          </div>
        );
      })
    ) : (
      <NoData text="공지사항이 없습니다." />
    );
  return (
    <>
      <div className="strawberry">
        {dataStudioSeries?.length > 0 && (
          <div className="strawberry__top">
            <div className="strawberry__top__total">
              총 {dataStudioSeries?.length}개
            </div>
            <div className="strawberry__top__chooseOption">
              <p
                onClick={() => {
                  setIsSelective(false);
                  handleSetAudioAll();
                }}
                role="presentation"
              >
                전체 듣기
              </p>
              <p
                onClick={() => {
                  setIsSelective(!isSelective);
                  handleSetAudio();
                }}
                role="presentation"
              >
                {isSelective ? '취소' : '선택 듣기'}
              </p>
            </div>
          </div>
        )}
        <div className="strawberry__listAudio">{renderStrawberry}</div>
        {listAudio.length > 0 && (
          <div className="strawberry__btn-play">
            <Button
              customClass="button--primary"
              onClick={() => {
                listPlayerSelective();
                toDoShowMusicPlayer();
                setIsSelective(false);
              }}
            >
              <p>선택 듣기</p>
              <img src={IMAGES.iconPlayNormal} alt="" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default memo<Props>(ItemSeries);
