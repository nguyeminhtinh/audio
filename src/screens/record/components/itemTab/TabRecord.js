// @flow

import React, { useState } from 'react';
import images from 'themes/images';
import Nodata from 'components/NoData';
import ROUTERS from 'constants/router';
import { convertTime } from '../../../../utils/Helpers';

type Props = {
  history: {
    push: Function,
  },
  listRecord: Object,
  toDoSetStudioMusicList: Function,
  setStatusPlayRecord: Function,
};
const TabRecord = ({
  history,
  listRecord,
  toDoSetStudioMusicList,
  setStatusPlayRecord,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  // render class for age
  const renderClass = (type) => {
    let classAge = '';
    switch (type) {
      case '베이비':
        classAge = 'green';
        break;
      case '프리스쿨':
        classAge = 'yellow';
        break;
      case '스쿨1':
        classAge = 'purple';
        break;
      case '스쿨2':
        classAge = 'blue';
        break;

      default:
        break;
    }
    return classAge;
  };

  const handleSetStudioList = (item) => {
    const listId = [];
    listId.push(item);
    toDoSetStudioMusicList(listId);
    setStatusPlayRecord({
      productId: listId,
      status: 'init',
    });
  };

  const renderRecord =
    listRecord &&
    listRecord.studioContents &&
    listRecord.studioContents.map((item) => {
      return (
        <div
          className="record__tab__record__item"
          key={item.id}
          onClick={() => {
            window.localStorage.removeItem('status');
            history.push(`${ROUTERS.RECORD_STUDIO}/${item.id}`);
          }}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <div
            className={`record__tab__record__item__description ${renderClass(
              item.ageGroup
            )}`}
          >
            {item.ageGroup}
          </div>
          <img
            src={`https://down.wjthinkbig.com${item.backGroundImg}`}
            alt=""
            onError={(e) => {
              if (loadImage) {
                setLoadImage({
                  loadImage: false,
                });
                e.target.src = images.image_not_found;
              }
            }}
          />
          <div className="record__tab__record__item__box-shadow" />
          <p>{item.contentsName}</p>
        </div>
      );
    });

  const renderListStudioBooks =
    listRecord &&
    listRecord.studioBooks &&
    listRecord.studioBooks.map((item, index) => {
      return (
        <div className="record__tab__record__list m-0" key={item.id}>
          <div
            className="d-flex wrapper-content__best-friends align-items-center"
            onClick={() => history.push(`${ROUTERS.STUDIO}/${item.id}`)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <div className="strawberry__listAudio__items__left">
              <h2>{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</h2>
              <img
                src={`https://down.wjthinkbig.com${item.backgroundImg}`}
                alt=""
                onError={(e) => {
                  if (loadImage) {
                    setLoadImage({
                      loadImage: false,
                    });
                    e.target.src = images.image_not_found;
                  }
                }}
              />
            </div>
          </div>
          <div
            className="strawberry__listAudio__items__center"
            onClick={() => history.push(`${ROUTERS.STUDIO}/${item.id}`)}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
          >
            <h3 className="content">{item.title}</h3>
            {item.recorder.length > 0 && (
              <div className="services">
                {item.recorder && item.recorder.slice(0, 2)}*
              </div>
            )}
            <div className="strawberry__listAudio__items__center__status">
              <div className="strawberry__listAudio__items__center__status__list-status">
                <div className="strawberry__listAudio__items__center__status__list-status--time">
                  <img src={images.iconTime} alt="" />
                  <p>{item && item.duration && convertTime(item.duration)}</p>
                </div>
                <div className="strawberry__listAudio__items__center__status__list-status--time view">
                  <img src={images.iconPlayMini} alt="" />
                  <p>{item.playCount && item.playCount.toLocaleString('en')}</p>
                </div>
                <div className="strawberry__listAudio__items__center__status__list-status--time favorite">
                  <img src={images.iconHeartMini} alt="" />
                  <p>{item.likeCount && item.likeCount.toLocaleString('en')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="play">
            <img
              src={images.btn_record}
              alt=""
              onClick={() => handleSetStudioList(item.id)}
              role="presentation"
            />
          </div>
        </div>
      );
    });

  const renderChallengeStudio =
    listRecord &&
    listRecord.challengeBooks &&
    listRecord.challengeBooks.map((item) => {
      return (
        <div
          className="challenge-studio__list__items"
          key={item.id}
          onClick={() => history.push(`${ROUTERS.STUDIO}/${item.id}`)}
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
        >
          <div className="challenge-studio__list__items__item">
            <img
              src={`https://down.wjthinkbig.com${item.backgroundImg}`}
              alt=""
              onError={(e) => {
                if (loadImage) {
                  setLoadImage({
                    loadImage: false,
                  });
                  e.target.src = images.image_not_found;
                }
              }}
            />
            <h3>{item.title}</h3>
            {item.recorder.length > 0 && (
              <p>{item.recorder && item.recorder.slice(0, 2)}*</p>
            )}
          </div>
        </div>
      );
    });
  return (
    <>
      {listRecord?.studioContents?.length +
        listRecord?.studioBooks?.length +
        listRecord?.challengeBooks?.length >
      0 ? (
        <div className="record__tab">
          {listRecord &&
            listRecord.studioContents &&
            listRecord.studioContents.length > 0 && (
              <h1 className="record__tab__title">이달의 스튜디오북</h1>
            )}
          <div className="record__tab__record">{renderRecord}</div>
          {listRecord &&
            listRecord.studioBooks &&
            listRecord.studioBooks.length > 0 && (
              <div className="title-studio">
                <h2>베스트 스튜디오북</h2>
                {/* <div
                  className="title-studio__detail"
                  onClick={() => history.push(ROUTERS.BEST_STUDIO)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                >
                  <p>월간 베스트</p>
                  <img src={images.icon_arrow_update} alt="" />
                </div> */}
              </div>
            )}
          {renderListStudioBooks}

          <div className="challenge-studio">
            {listRecord &&
              listRecord.challengeBooks &&
              listRecord.challengeBooks.length > 0 && (
                <div className="challenge-studio__title ">
                  <div className="challenge-studio__title__item">
                    도전! 스튜디오 북
                  </div>
                  <div
                    className="action"
                    onClick={() => history.push(ROUTERS.CHALLENGE_STUDIO)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                  >
                    <img src={images.btnDetail} alt="" />
                  </div>
                </div>
              )}
            <div className="challenge-studio__list">
              {renderChallengeStudio}
            </div>
          </div>
        </div>
      ) : (
        <Nodata text="준비 중입니다." />
      )}
    </>
  );
};

export default TabRecord;
