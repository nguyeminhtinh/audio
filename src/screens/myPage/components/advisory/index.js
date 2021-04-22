// @flow

import React, { useState, memo, useEffect } from 'react';
import MainLayout from 'layout/MainLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import ModalPopup from 'components/Modal';
import Loading from 'components/Loading';
import { Spinner } from 'react-bootstrap';
import NoData from 'components/NoData';
import ERROR_MESSAGE from 'constants/errorMsg';
import ROUTERS from 'constants/router';
import ItemConsultation from './ItemConsultation';

type Props = {
  history: {
    push: Function,
  },
  getListConsultation: Function,
  listConsultation: Array<{
    qnaId: number,
  }>,
  isProcessing: boolean,
  deleteConsultation: Function,
  statusCode: number,
  typeAction: string,
  resetData: Function,
  totalConsultation: number,
};

const Advisory = ({
  history,
  getListConsultation,
  listConsultation,
  isProcessing,
  deleteConsultation,
  statusCode,
  typeAction,
  resetData,
  totalConsultation,
}: Props) => {
  useEffect(() => {
    if (
      window.msPerformance ||
      window.webkitPerformance ||
      window.performance
    ) {
      resetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [page, setPage] = useState(0);
  const [isShowAction, setIsShowAction] = useState(false);
  const [listItemConsultation, setListItemConsultation] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalValidate, setModalValidate] = useState({
    isOpen: false,
    content: '',
  });
  const [listId, setListId] = useState([]);
  /**
   *
   *Call api get data list consultation
   */

  useEffect(() => {
    getListConsultation({ page });
  }, [getListConsultation, page]);

  useEffect(() => {
    setListItemConsultation(listConsultation);
    // eslint-disable-next-line
  }, [listConsultation]);

  useEffect(() => {
    switch (typeAction) {
      case 'DELETE_CONSULTATION_SUCCESS':
        if (statusCode === 200) {
          getListConsultation({ page: 0 });
          resetData();
        } else {
          setModalValidate({
            ...modalValidate,
            isOpen: true,
            content: ERROR_MESSAGE.DELETE_FAILED,
          });
        }
        break;
      case 'DELETE_CONSULTATION_FAILED':
        setModalValidate({
          ...modalValidate,
          isOpen: true,
          content: ERROR_MESSAGE.DELETE_FAILED,
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [typeAction, statusCode]);

  const handleCheckBox = (qnaId) => {
    let dataSubmit = [];
    if (listId.includes({ ...qnaId }[0])) {
      dataSubmit = listId.filter((items) => items !== { ...qnaId }[0]);
    } else {
      dataSubmit = [...listId, ...qnaId];
    }
    setListId(dataSubmit);
  };

  const renderListItem =
    listItemConsultation && listItemConsultation.length > 0 ? (
      listItemConsultation.map((item) => (
        <ItemConsultation
          itemObj={item}
          key={item.qnaId}
          history={history}
          listId={listId}
          handleCheckBox={handleCheckBox}
          isShowAction={isShowAction}
        />
      ))
    ) : (
      <NoData text="문의 내역이 없습니다." />
    );
  const handleEditor = () => {
    setIsShowAction(true);
  };

  let updateListItemAll = [];

  updateListItemAll =
    listItemConsultation &&
    listItemConsultation.map((item) => {
      return item.qnaId;
    });
  const handleSelectAll = () => {
    if (listId && listId.length > 1) {
      setListId([]);
    } else {
      setListId(updateListItemAll);
    }
  };

  const handleDelete = () => {
    if (listId.length > 0) {
      setIsOpen(true);
    }
  };

  const handleRemoveConfirm = () => {
    setIsOpen(false);
    deleteConsultation({
      qnaIds: listId,
    });
  };
  return (
    <MainLayout customClass="" titleHeader="1:1 문의" isShowHeader isLink>
      <div className="page-advisory">
        {isProcessing && page < 1 ? (
          <Loading />
        ) : (
          <>
            {listConsultation && listConsultation.length > 0 && (
              <>
                <div className="title-advisory">문의 내역</div>
                <div className="d-flex align-items-center">
                  <div
                    className={`sub-title ${
                      isShowAction ? 'd-none' : 'd-block'
                    }`}
                    onClick={handleEditor}
                    role="presentation"
                    onKeyUp={() => {}}
                  >
                    {isShowAction ? '삭제' : '편집'}
                  </div>
                  <div
                    className={`sub-title ${
                      isShowAction ? 'd-block' : 'd-none'
                    }`}
                    onClick={handleDelete}
                    role="presentation"
                    onKeyUp={() => {}}
                  >
                    {isShowAction ? '삭제' : '편집'}
                  </div>
                  {isShowAction && (
                    <div
                      className="sub-title pl-2"
                      onClick={() => {
                        setIsShowAction(false);
                        setListId([]);
                      }}
                      role="presentation"
                      onKeyUp={() => {}}
                    >
                      취소
                    </div>
                  )}
                  <div
                    onClick={handleSelectAll}
                    role="presentation"
                    onKeyUp={() => {}}
                    className={`${isShowAction ? 'd-block' : 'd-none'} ml-auto`}
                  >
                    전체선택
                  </div>
                </div>
              </>
            )}
            <InfiniteScroll
              dataLength={(listConsultation && listConsultation.length) || 0}
              next={() => {
                setPage(page + 1);
              }}
              hasMore={
                listConsultation && listConsultation.length < totalConsultation
              }
              height={500}
              loader={
                <div className="d-flex justify-content-center pt-20">
                  <Spinner animation="border" variant="success" />
                </div>
              }
            >
              {renderListItem}
            </InfiniteScroll>
          </>
        )}
        <div
          className="btn-consultation text-center"
          onClick={() => history.push(ROUTERS.ADVISORY_REGISTER)}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <span>
            1:1 <br />
            문의하기
          </span>
        </div>
      </div>

      <ModalPopup
        isOpen={modalValidate.isOpen}
        isShowFooter
        handleClose={() =>
          setModalValidate({ ...modalValidate, isOpen: false })
        }
        handleSubmit={() =>
          setModalValidate({ ...modalValidate, isOpen: false })
        }
        customClassButton="w-100 buttonConfirm"
        textBtnRight="확인"
        isShowHeader
        title="알림"
      >
        <div className="title-content">{modalValidate.content}</div>
      </ModalPopup>

      <ModalPopup
        isOpen={isOpen}
        isShowFooter
        handleClose={() => {
          setIsOpen(false);
        }}
        handleSubmit={() => {
          handleRemoveConfirm();
        }}
        isShowTwoBtn
        customClassButton="w-100"
        textBtnLeft="취소"
        textBtnRight="확인"
        isShowHeader
        title="알림"
        classNameBtnRight="btn-right"
        classNameBtnLeft="btn-left"
      >
        <div className="title-content">선택하신 문의를 삭제하시겠습니까?</div>
      </ModalPopup>
    </MainLayout>
  );
};

export default memo<Props>(Advisory);
