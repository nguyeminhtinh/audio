/* eslint-disable react/no-array-index-key */
// @flow

import React, { useState, memo, useEffect } from 'react';
import Truncate from 'react-truncate';
import Immutable from 'seamless-immutable';
import IMAGES from 'themes/images';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Rating from 'components/Rating';
import Button from 'components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import ModalPopup from 'components/Modal';
import moment from 'moment';
import { listSelectReview } from 'constants/listDataCategory';
import ROUTERS from 'constants/router';
import ModalReport from './modalReport';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type Props = {
  listAudioBook: Array<{
    thumbnailUrl: string,
    productId: number,
    materialName: string,
  }>,
  history: {
    push: Function,
  },
  dataAudioBookDetail: Object,
  getKeySearchDetail: Function,
  listItemReport: Array<{
    id: number,
    report: string,
  }>,
  // avgRate: number,
  listReview: Array<{
    id: number,
    name: string,
    rate: number,
    iconImg: string,
    comment: string,
    reviewId: number,
    createdAt: string,
    userId: number,
  }>,
  saveReview: Function,
  saveReport: Function,
  infoUser: Object,
  typeReport: number,
  listMyReview: Array<{
    id: number,
    name: string,
    rate: number,
    iconImg: string,
    comment: string,
    reviewId: number,
    createdAt: string,
    userId: number,
  }>,
  totalReview: number,
  handleLoadMore: Function,
  deleteReview: Function,
  type: string,
  getListReview: Function,
  resetData: Function,
  isShowReview: boolean,
};

const TabDescription = ({
  listAudioBook,
  history,
  dataAudioBookDetail,
  getKeySearchDetail,
  listItemReport,
  // avgRate,
  listReview,
  saveReview,
  saveReport,
  infoUser,
  typeReport,
  listMyReview,
  totalReview,
  handleLoadMore,
  deleteReview,
  type,
  getListReview,
  resetData,
  isShowReview,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const [loadImage, setLoadImage] = useState(true);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [ratingStar, setRatingStar] = useState(0);
  const [review, setReview] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [defaultSelect, setDefaultSelect] = useState(listSelectReview[0]);
  const [dataReview, setDataReview] = useState(listReview);
  const [page, setPage] = useState(0);
  const [isPage, setIsPage] = useState(false);
  const [avgRate, setAvgRate] = useState(0);

  const renderListItem =
    listAudioBook &&
    listAudioBook.length > 0 &&
    listAudioBook.map((item) => (
      <SwiperSlide key={item.productId}>
        <div
          className=""
          key={item.productId}
          onClick={() =>
            history.push(`${ROUTERS.AUDIO_BOOK}/${item.productId}`)
          }
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <div className="item--image">
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
          <div className="item--title">{item.materialName}</div>
        </div>
      </SwiperSlide>
    ));

  const handleShowReport = (id) => {
    setReviewId(id);
    setIsShowModal(true);
  };

  const sendDataPopup = (dataReport) => {
    if (dataReport.content.length === 0) {
      setIsShowConfirm(true);
      setIsShowModal(false);
    } else {
      setIsShowModal(false);
      saveReport({
        contents: dataReport.content,
        tbReportCategoryId: dataReport.idReport,
        tbTargetId: reviewId,
        tbTypeId: typeReport,
      });
    }
  };

  useEffect(() => {
    if (isPage) {
      if (listReview.length < totalReview) {
        setPage(page + 1);
        handleLoadMore(page + 1);
        setIsPage(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPage]);

  useEffect(() => {
    setDataReview(listReview);
  }, [listReview]);

  useEffect(() => {
    if (type === 'DELETE_REVIEW_SUCCESS') {
      const { productId } = dataAudioBookDetail?.audioBookDetail;
      resetData();
      getListReview(productId);
    }
  }, [dataAudioBookDetail, getListReview, resetData, type]);

  const handleSort = (types) => {
    const result = listReview && Immutable.asMutable(listReview);
    switch (types) {
      case 0:
        result.sort((dataFirst, dataLast) => {
          return dataFirst.createdAt.localeCompare(dataLast.createdAt) * -1;
        });
        break;
      case 1:
        result.sort((dataFirst, dataLast) => {
          return (dataFirst.rate - dataLast.rate) * -1;
        });
        break;
      case 2:
        result.sort((dataFirst, dataLast) => {
          return dataFirst.rate - dataLast.rate;
        });
        break;
      default:
        break;
    }
    setDataReview(result);
  };

  const handleDeleteComment = (id) => {
    setIsShowDelete(true);
    setReviewId(id);
  };

  const handleSubmitDelete = () => {
    deleteReview(reviewId);
    setIsShowDelete(false);
  };

  const renderReview =
    listMyReview &&
    listMyReview.map((item) => {
      return (
        <>
          <div
            className={`review__list-rating ${
              item.userId === infoUser.id ? 'active' : ''
            }`}
          >
            <div className="review__user__title">내가 작성한 리뷰</div>
            <div className="review__list-rating__title">
              <img
                src={
                  `https://down.wjthinkbig.com${item.iconImg}` ||
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
              <div>
                <p>{item.name && item.name.slice(0, 2)}*</p>
                <p>
                  {item.createdAt &&
                    moment(item.createdAt).format('YYYY.MM.DD HH:mm')}
                </p>
              </div>
              <div className="review__list-rating__title__star">
                {Array(Math.floor(item.rate)).fill(
                  <img src={IMAGES.iconStar} alt="" />
                )}
                {item.rate - Math.floor(item.rate) > 0 &&
                  item.rate - Math.floor(item.rate) < 1 && (
                    <img src={IMAGES.iconStar2} alt="" />
                  )}
                {Array(Math.floor(5 - item.rate)).fill(
                  <img src={IMAGES.iconStar3} alt="" />
                )}
              </div>
            </div>
            <h4>{item.comment}</h4>
            {item.userId === infoUser.id ? (
              <div
                className="report"
                onClick={() => handleDeleteComment(item.reviewId)}
                role="button"
                tabIndex={0}
                onKeyUp={() => {}}
              >
                <img
                  src={IMAGES.icon_delete_report}
                  alt=""
                  // onClick={() => setIsShowDelete(true)}
                  role="presentation"
                />
                <p role="presentation">삭제</p>
              </div>
            ) : (
              <div className="report">
                <img
                  src={IMAGES.iconReport}
                  alt=""
                  onClick={() => handleShowReport(item.reviewId)}
                  role="presentation"
                />
                <p
                  onClick={() => handleShowReport(item.reviewId)}
                  role="presentation"
                >
                  신고
                </p>
              </div>
            )}
          </div>
        </>
      );
    });

  const resultTotal =
    dataReview && dataReview.reduce((first, second) => first + second.rate, 0);

  useEffect(() => {
    if (resultTotal) {
      setAvgRate(Math.round((resultTotal / listReview.length) * 10) / 10);
    }
  }, [resultTotal, listReview]);

  const renderOtherReview =
    dataReview &&
    dataReview.map((item) => {
      return (
        <div className="review__list-rating ">
          <div className="review__list-rating__title">
            <img
              src={
                `https://down.wjthinkbig.com${item.iconImg}` ||
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
            <div>
              <p>{item.name && item.name.slice(0, 2)}*</p>
              <p>
                {item.createdAt &&
                  moment(item.createdAt).format('YYYY.MM.DD HH:mm')}
              </p>
            </div>
            <div className="review__list-rating__title__star">
              {Array(Math.floor(item.rate)).fill(
                <img src={IMAGES.iconStar} alt="" />
              )}
              {item.rate - Math.floor(item.rate) > 0 &&
                item.rate - Math.floor(item.rate) < 1 && (
                  <img src={IMAGES.iconStar2} alt="" />
                )}
              {Array(Math.floor(5 - item.rate)).fill(
                <img src={IMAGES.iconStar3} alt="" />
              )}
            </div>
          </div>
          <h4>{item.comment}</h4>
          {item.userId === infoUser.id ? (
            <div
              className="report"
              onClick={() => handleDeleteComment(item.reviewId)}
              role="button"
              tabIndex={0}
              onKeyUp={() => {}}
            >
              <img
                src={IMAGES.icon_delete_report}
                alt=""
                // onClick={() => setIsShowDelete(true)}
                role="presentation"
              />
              <p role="presentation">삭제</p>
            </div>
          ) : (
            <div className="report">
              <img
                src={IMAGES.iconReport}
                alt=""
                onClick={() => handleShowReport(item.reviewId)}
                role="presentation"
              />
              <p
                onClick={() => handleShowReport(item.reviewId)}
                role="presentation"
              >
                신고
              </p>
            </div>
          )}
        </div>
      );
    });

  const handleTruncate = (status) => {
    if (truncated !== status) {
      setTruncated(truncated);
    }
  };

  const handleReview = () => {
    if (ratingStar !== 0) {
      saveReview({
        comment: review.length > 0 ? review : '.',
        id: 0,
        rate: ratingStar,
        tbProductId: dataAudioBookDetail?.audioBookDetail?.productId,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleReview();
    }
  };

  return (
    <>
      <div
        className={`audioBook__tab__introduction ${
          dataAudioBookDetail?.audioBookDetail?.description?.length > 0
            ? ''
            : 'd-none'
        }`}
      >
        <h2 className="audioBook__tab__introduction__title">소개</h2>
        <div className="audioBook__tab__introduction__content">
          <Truncate
            lines={!expanded && 3}
            ellipsis={
              <span>
                ...{' '}
                <div
                  className={`audioBook__tab__introduction__content__more ${
                    dataAudioBookDetail?.audioBookDetail?.description?.length >
                    0
                      ? ''
                      : 'd-none'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyUp={() => {}}
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                >
                  <p>더보기</p>
                  <img src={IMAGES.iconArrowMiniBottom} alt="" />
                </div>
              </span>
            }
            onTruncate={() => handleTruncate(truncated)}
          >
            {dataAudioBookDetail?.audioBookDetail?.description}
            {!truncated && expanded && (
              <span>
                {' '}
                <div
                  className={`audioBook__tab__introduction__content__more ${
                    dataAudioBookDetail?.audioBookDetail?.description?.length >
                    0
                      ? ''
                      : 'd-none'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyUp={() => {}}
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                >
                  <p>접기</p>
                  <img
                    src={IMAGES.iconArrowMiniBottom}
                    alt=""
                    className="rotate"
                  />
                </div>
              </span>
            )}
          </Truncate>
        </div>
      </div>
      {isShowReview && (
        <div className="review">
          <h1 className="review__title">리뷰</h1>
          {listMyReview && listMyReview.length === 0 && (
            <>
              <div className="review__rating">
                <p>오디오북 내용은 어떠셨나요?</p>
                <Rating
                  onChange={(e) => setRatingStar(e)}
                  valueStar={ratingStar}
                />
              </div>
              <div className="review__writing">
                <textarea
                  placeholder="리뷰를 남겨주세요."
                  type="text"
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  rows={10}
                  maxLength={300}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <div className="action-review">
                  <p className="action-review__count">
                    {review.length} / <span>300</span>
                  </p>
                  <Button customClass="" onClick={handleReview}>
                    <p>등록</p>
                  </Button>
                </div>
              </div>
            </>
          )}
          <div className="review__total-rating">
            <h4>사용자 총 평점</h4>
            <div className="review__total-rating__star">
              <div className="review__total-rating__star__items">
                <div className="list-star">
                  {Array(Math.floor(avgRate)).fill(
                    <img src={IMAGES.iconStar} alt="" />
                  )}
                  {avgRate - Math.floor(avgRate) > 0 &&
                    avgRate - Math.floor(avgRate) < 1 && (
                      <img src={IMAGES.iconStar2} alt="" />
                    )}
                  {Array(Math.floor(5 - avgRate)).fill(
                    <img src={IMAGES.iconStar3} alt="" />
                  )}
                </div>
              </div>
              <p>
                {resultTotal &&
                  Math.round((resultTotal / dataReview.length) * 10) / 10}{' '}
                <span>/ 5.0</span>
              </p>
            </div>
          </div>
          {listMyReview && listMyReview.length > 0 && (
            <div className="review__user">{renderReview}</div>
          )}
          {dataReview && dataReview.length > 0 && (
            <div className="review__filter">
              <h5>{totalReview.toLocaleString('en')}개의 리뷰가 있습니다.</h5>
              <div
                className="search-wrapper__total-search__right "
                onClick={() => setIsOpen(true)}
                tabIndex={0}
                role="button"
                onKeyDown={() => {}}
              >
                <p>{defaultSelect.value}</p>
                <img src={IMAGES.icon_arrow_down} alt="" />
              </div>
            </div>
          )}

          {renderOtherReview}
          <div
            className={`audioBook__tab__introduction__content__more ${
              totalReview > 5 && dataReview.length < totalReview ? '' : 'd-none'
            }`}
            role="button"
            tabIndex={0}
            onKeyUp={() => {}}
            onClick={() => {
              setIsPage(true);
            }}
          >
            <p>더보기</p>
            <img src={IMAGES.iconArrowMiniBottom} alt="" />
          </div>
        </div>
      )}

      <div className="audioBook__tab__related">
        {dataAudioBookDetail?.keywords?.length > 0 && (
          <h2 className="audioBook__tab__related__title">관련 키워드</h2>
        )}
        <div className="audioBook__tab__related__list-category">
          {dataAudioBookDetail &&
            dataAudioBookDetail.keywords &&
            dataAudioBookDetail.keywords.map((item, index) => {
              return (
                <div
                  className="strawberry__listAudio__items__center__status__list-category--category"
                  key={index}
                  onClick={() => {
                    history.push(
                      `${ROUTERS.SEARCH_FOR_KEYS}/${item.keywordId}`
                    );
                    getKeySearchDetail(item.name);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                >
                  #{item.name}
                </div>
              );
            })}
        </div>
      </div>
      <div className="audioBook__tab__related__list-audio">
        {dataAudioBookDetail?.linkeds?.length > 0 && (
          <div className="audioBook__tab__related__list-audio__wrapper d-flex justify-content-between align-items-center">
            <div className="audioBook__tab__related__list-audio__wrapper__title">
              함께 들으면 좋은 오디오북
            </div>
          </div>
        )}
        <div className="audioBook__tab__related__list-audio__wrapper__content">
          <Swiper slidesPerView="auto" spaceBetween={9}>
            {renderListItem}
          </Swiper>
        </div>
      </div>
      <ModalReport
        isShowModal={isShowModal}
        handleIsShowModal={sendDataPopup}
        listItemReport={listItemReport}
        handleIsCloseModal={() => setIsShowModal(false)}
      />
      <ModalPopup
        isOpen={isShowConfirm}
        handleClose={() => setIsShowConfirm(false)}
        handleSubmit={() => setIsShowConfirm(false)}
        customClass="w-100"
        isShowFooter
        isShowTwoBtn
        customClassButton="w-100"
        textBtnRight="확인"
        textBtnLeft="취소"
      >
        신고사유와 내용을 모두 입력해주세요
      </ModalPopup>
      <ModalPopup
        isOpen={isShowDelete}
        handleClose={() => setIsShowDelete(false)}
        handleSubmit={() => handleSubmitDelete()}
        customClass="w-100"
        isShowFooter
        isShowHeader
        title="알림"
        customClassButton="w-100"
        textBtnRight="확인"
        textBtnLeft="취소"
      >
        등록하신 리뷰를 삭제하시겠습니까?
      </ModalPopup>
      <ModalPopup
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        handleSubmit={() => setIsOpen(false)}
        customClass="w-100 modal-edit"
      >
        <div className="title-content">
          {listSelectReview &&
            listSelectReview.map((item) => {
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
      </ModalPopup>
    </>
  );
};

export default memo<Props>(TabDescription);
