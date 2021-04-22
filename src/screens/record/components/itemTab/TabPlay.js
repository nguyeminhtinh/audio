// @flow

import React, { useState, memo, useEffect } from 'react';
import ROUTERS from 'constants/router';
import Immutable from 'seamless-immutable';
import images from 'themes/images';
import NoData from 'components/NoData';
import { toast, ToastContainer } from 'react-toastify';
import { listFilterStudio } from 'constants/listDataCategory';
import ModalPopupItem from 'components/Modal';
import { getClassName } from 'constants/getClassNameImg';

type Props = {
  listSubject: Array<{
    id: number,
    subjectImg: string,
  }>,
  history: {
    push: Function,
  },
  listPlayStudio: Object,
  showDetail: Function,
  isBackFunction: boolean,
  saveTabActive: Function,
  saveIdActive: Function,
  getDetailStudio: Function,
  getListPlayStudio: Function,
  toDoSetMusicGroup: Function,
};

const TabPlay = ({
  listSubject,
  history,
  listPlayStudio,
  showDetail,
  isBackFunction,
  saveTabActive,
  saveIdActive,
  getDetailStudio,
  getListPlayStudio,
  toDoSetMusicGroup,
}: Props) => {
  const [loadImage, setLoadImage] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [defaultSelect, setDefaultSelect] = useState(listFilterStudio[0]);
  const [dataSort, setDataSort] = useState(
    listPlayStudio && listPlayStudio.studioGroups
  );
  const handleSetMusicGroup = (item, status) => {
    const data = {
      groupId: item,
      play: status,
    };
    toDoSetMusicGroup(JSON.stringify(data));
  };

  useEffect(() => {
    setDataSort(listPlayStudio && listPlayStudio.studioGroups);
  }, [listPlayStudio]);

  const renderListSubject =
    listSubject && listSubject.length > 0 ? (
      listSubject.map((item) => {
        return (
          <div
            className="record__tab__list-subject__item"
            onClick={() => {
              getDetailStudio(item.id);
              showDetail(true);
              saveIdActive(item.id);
              getListPlayStudio(item.id);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            key={item.id}
          >
            <img
              src={
                `https://down.wjthinkbig.com${item.subjectImg}` ||
                images.image_not_found
              }
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
        );
      })
    ) : (
      <NoData text="준비 중입니다." />
    );

  const handleSort = (item) => {
    const result =
      listPlayStudio && Immutable.asMutable(listPlayStudio.studioGroups);
    switch (item) {
      case 0:
        return setDataSort(
          listPlayStudio && Immutable.asMutable(listPlayStudio.studioGroups)
        );
      case 1:
        result.sort((dataFirst, dataLast) => {
          return dataFirst.createdAt.localeCompare(dataLast.createdAt) * -1;
        });
        break;
      case 2:
        result.sort((dataFirst, dataLast) => {
          return dataLast.likeCount - dataFirst.likeCount;
        });
        break;
      default:
        break;
    }
    setDataSort(result);
    return result;
  };

  const renderListStudio =
    dataSort && dataSort.length > 0 ? (
      dataSort.map((item) => {
        const notifyAddGroup = () =>
          toast.error(`재생 목록에 ${item?.totalCount}곡이 추가되었습니다`);
        return (
          <div className="record__tab__record__list m-0" key={item.id}>
            <div
              className="d-flex wrapper-content__best-friends align-items-center"
              onClick={() => {
                history.push(`${ROUTERS.PLAY_STUDIO}/${item.id}`);
                saveTabActive('tab2');
              }}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <div className={getClassName(item?.thumbnailUrl?.length)}>
                {item &&
                  item.thumbnailUrl &&
                  item.thumbnailUrl.map((items) => (
                    <img
                      src={`https://down.wjthinkbig.com${items.thumbnailUrl}`}
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
                  ))}
              </div>
            </div>
            <div
              className="strawberry__listAudio__items__center"
              onClick={() => {
                history.push(`${ROUTERS.PLAY_STUDIO}/${item.id}`);
                saveTabActive('tab2');
              }}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <h3 className="content">{item.groupName}</h3>
              <div className="interactive">
                <div className="username">{item.nickName}</div>
                <div className="like-user">
                  <img src={images.iconHeartMini} alt="" />
                  <p>{item.likeCount.toLocaleString('en')}</p>
                </div>
              </div>
              <div className="list-category">
                {item.studioPlaySubjectDtos.map((items) => {
                  return (
                    <p
                      key={items.id}
                      className={`${
                        listPlayStudio.subjectName === items.subject
                          ? 'active'
                          : ''
                      }`}
                    >
                      #{items.subject}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="play">
              <img
                src={images.iconAudio}
                alt=""
                onClick={() => {
                  handleSetMusicGroup(item.id, 'Y');
                  notifyAddGroup();
                }}
                role="presentation"
              />
              <img
                src={images.btn_save_studio}
                alt=""
                onClick={() => {
                  handleSetMusicGroup(item.id, 'N');
                  notifyAddGroup();
                }}
                role="presentation"
              />
            </div>
          </div>
        );
      })
    ) : (
      <NoData text="준비 중입니다." />
    );

  return (
    <div className="record__tab">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isBackFunction ? (
        <>
          {listPlayStudio &&
            listPlayStudio.studioGroups &&
            listPlayStudio.studioGroups.length > 0 && (
              <div className="title-studio">
                <h2># {listPlayStudio.subjectName}</h2>
                <div
                  className="title-studio__detail"
                  onClick={() => setIsOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                >
                  <p>{defaultSelect.value}</p>
                  <img
                    src={images.icon_arrow_update}
                    alt=""
                    className="arrow-down"
                  />
                </div>
              </div>
            )}
          {renderListStudio}
        </>
      ) : (
        <div className="record__tab__list-subject">{renderListSubject}</div>
      )}
      <ModalPopupItem
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        customClass="w-100 modal-edit"
      >
        <div className="title-content">
          {listFilterStudio &&
            listFilterStudio.map((item) => {
              return (
                <p
                  className={`item-edit ${
                    defaultSelect.value === item.value ? 'active' : ''
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    setDefaultSelect(item);
                    handleSort(item.id);
                  }}
                  role="presentation"
                  key={item.id}
                >
                  {item.value}
                </p>
              );
            })}
        </div>
      </ModalPopupItem>
    </div>
  );
};

export default memo<Props>(TabPlay);
