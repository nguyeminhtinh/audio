// @flow

import React, { useState, memo, useEffect } from 'react';
import IMAGES from 'themes/images';
import Button from 'components/Button';
import ROUTERS from 'constants/router';
import NoData from 'components/NoData';
import {
  toDoShowMusicPlayer,
  toDoHideMusicPlayer,
} from '../../../utils/Helpers';

type Props = {
  dataAudioBookSeries: Array<{
    productId: number,
    mediaType: any,
    productName: string,
    thumbnailUrl: string,
    duration: number,
    contentsUrl: string,
  }>,
  audioOption: Array<{}>,
  handleChangeOption: Function,
  handleSetAudio: Function,
  listAudio: Array<{
    productId: number,
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
const TabSeriesMusic = ({
  dataAudioBookSeries,
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
  // render list data strawberry
  const renderStrawberry =
    dataAudioBookSeries && dataAudioBookSeries.length > 0 ? (
      dataAudioBookSeries &&
      dataAudioBookSeries.map((item, index) => {
        const idActive = audioOption.filter(
          (items) => items === item.productId
        );
        return (
          <div
            className={`strawberry__listAudio__items ${
              idActive && idActive[0] === item.productId ? 'active' : ''
            }`}
            key={item.productId}
          >
            <div
              className="d-flex box-left"
              onClick={() => {
                isSelective
                  ? handleChangeOption(
                      item.productId,
                      dataAudioBookSeries[index]
                    )
                  : history.push(`${ROUTERS.AUDIO_BOOK}/${item.productId}`);
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
                {item.mediaType === '플레이북' && (
                  <div className="strawberry__listAudio__items__left__icon-play">
                    <img src={IMAGES.icon_play} alt="" />
                  </div>
                )}
              </div>
              <div className="strawberry__listAudio__items__center">
                <h3>{item.productName}</h3>
              </div>
            </div>
            <div className="strawberry__listAudio__items__right">
              {item.mediaType === '플레이북' ? (
                <img src={IMAGES.iconVideo} alt="" />
              ) : (
                <img
                  src={IMAGES.iconAudio}
                  alt=""
                  onClick={() =>
                    !isSelective && handleShowPlayer(dataAudioBookSeries[index])
                  }
                  role="presentation"
                />
              )}
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
        {dataAudioBookSeries?.length > 0 && (
          <div className="strawberry__top">
            <div className="strawberry__top__total">
              총 {dataAudioBookSeries?.length}개
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

export default memo<Props>(TabSeriesMusic);
