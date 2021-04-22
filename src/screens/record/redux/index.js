// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListSubject: ['data'],
  getListSubjectSuccess: null,
  getListSubjectFailed: null,
  getListPlayStudio: ['id'],
  getListPlayStudioSuccess: null,
  getListPlayStudioFailed: null,
  getListPlayStudioDetail: ['id'],
  getListPlayStudioDetailSuccess: null,
  getListPlayStudioDetailFailed: null,
  getListRecord: ['data'],
  getListRecordSuccess: null,
  getListRecordFailed: null,
  getListStudioMonth: ['data'],
  getListStudioMonthSuccess: null,
  getListStudioMonthFailed: null,
  getListStudioChallenge: ['data'],
  getListStudioChallengeSuccess: null,
  getListStudioChallengeFailed: null,
  saveTabActive: ['tab'],
  saveIdActive: ['id'],
  getDetailPlayStudio: ['id'],
  getDetailPlayStudioSuccess: null,
  getDetailPlayStudioFailed: null,
  resetDataRecord: null,
  getListReviewStudio: ['id', 'data'],
  getListReviewStudioSuccess: null,
  getListReviewStudioFailed: null,
  saveReviewStudio: ['data'],
  saveReviewStudioSuccess: null,
  saveReviewStudioFailed: null,
  deleteReviewStudio: ['id'],
  deleteReviewStudioSuccess: null,
  deleteReviewStudioFailed: null,
  likeStudio: ['data'],
  likeStudioSuccess: null,
  likeStudioFailed: null,
  actionLike: ['name'],
  getListFilterStudio: null,
  getListFilterStudioSuccess: null,
  getListFilterStudioFailed: null,
  getDetailRecordStudio: ['id'],
  getDetailRecordStudioSuccess: null,
  getDetailRecordStudioFailed: null,
  getListSeriesStudio: ['id'],
  getListSeriesStudioSuccess: null,
  getListSeriesStudioFailed: null,
  likeDetailStudio: ['data'],
  likeDetailStudioSuccess: null,
  likeDetailStudioFailed: null,
  setStatusPlayRecord: ['data'],
  setStatusPlayRecordSuccess: null,
  setStatusPlayRecordFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  errors: '',
  listSubject: [],
  listPlayStudio: {},
  listPlayStudioDetail: {},
  listRecord: {},
  listStudioMonth: [],
  listStudioChallenge: {},
  tabActive: 'tab1',
  isActiveDetail: false,
  idActive: '',
  totalStudioChallenge: 0,
  likeCount: 0,
  dataDetailPlayStudio: {},
  listReview: [],
  listMyReview: [],
  totalReview: '',
  avgRate: 0,
  listFilterStudio: [],
  dataDetailRecordStudio: {},
  listSeriesStudio: [],
  isShowReviewStudio: true,
});

const getListSubject = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListSubjectSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listSubject: action.data,
  });
};

const getListSubjectFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListPlayStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPlayStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listPlayStudio: action.data,
  });
};

const getListPlayStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListRecord = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListRecordSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listRecord: action.data,
  });
};

const getListRecordFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListPlayStudioDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPlayStudioDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listPlayStudioDetail: action.data,
    likeCount: action.data.likeCount,
  });
};

const getListPlayStudioDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListStudioMonth = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListStudioMonthSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listStudioMonth: action.data,
  });
};

const getListStudioMonthFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListStudioChallenge = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListStudioChallengeSuccess = (state, action) => {
  const dataStudioChallenge = action.data.studioBooks;
  return state.merge({
    isProcessing: false,
    type: action.type,
    listStudioChallenge: [...state.listStudioChallenge, ...dataStudioChallenge],
    totalStudioChallenge: action.data.bookCount,
  });
};

const getListStudioChallengeFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveTabActive = (state, action) => {
  return state.merge({
    tabActive: action.tab,
    isActiveDetail: action.tab !== 'tab1',
  });
};

const saveIdActive = (state, action) => {
  return state.merge({
    idActive: action.id,
  });
};

const getDetailPlayStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDetailPlayStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailPlayStudio: action.data,
    likeCount: action.data.likeCount,
  });
};

const getDetailPlayStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListReviewStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListReviewStudioSuccess = (state, action) => {
  const dataReview = action?.data?.reviews;
  return state.merge({
    isProcessing: false,
    type: action.type,
    listReview: action.data ? [...state.listReview, ...dataReview] : [],
    listMyReview: action?.data?.myReviews,
    avgRate: action?.data?.avgRate || 0,
    totalReview: action?.data?.reviewCount,
    isShowReviewStudio: action.data !== null,
  });
};

const getListReviewStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveReviewStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const saveReviewStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveReviewStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteReviewStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteReviewStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteReviewStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetDataRecord = (state) => {
  return state.merge({
    listStudioChallenge: [],
    listReview: [],
    listMyReview: [],
  });
};

const likeStudio = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const likeStudioSuccess = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const likeStudioFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

// eslint-disable-next-line consistent-return
const actionLike = (state, action) => {
  switch (action.name) {
    case 'plus':
      return state.merge({
        likeCount: state.likeCount + 1,
      });

    case 'minus':
      return state.merge({
        likeCount: state.likeCount - 1,
      });

    default:
      break;
  }
};

const getListFilterStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListFilterStudioSuccess = (state, action) => {
  const defaultFilter = {
    contentId: 0,
    name: '전체',
  };
  return state.merge({
    isProcessing: false,
    type: action.type,
    listFilterStudio: [defaultFilter, ...action.data],
  });
};

const getListFilterStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDetailRecordStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDetailRecordStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailRecordStudio: action.data,
  });
};

const getDetailRecordStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListSeriesStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListSeriesStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listSeriesStudio: action.data,
  });
};

const getListSeriesStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const likeDetailStudio = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const likeDetailStudioSuccess = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const likeDetailStudioFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const setStatusPlayRecord = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const setStatusPlayRecordSuccess = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const setStatusPlayRecordFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_SUBJECT]: getListSubject,
  [Types.GET_LIST_SUBJECT_SUCCESS]: getListSubjectSuccess,
  [Types.GET_LIST_SUBJECT_FAILED]: getListSubjectFailed,

  [Types.GET_LIST_PLAY_STUDIO]: getListPlayStudio,
  [Types.GET_LIST_PLAY_STUDIO_SUCCESS]: getListPlayStudioSuccess,
  [Types.GET_LIST_PLAY_STUDIO_FAILED]: getListPlayStudioFailed,

  [Types.GET_LIST_PLAY_STUDIO_DETAIL]: getListPlayStudioDetail,
  [Types.GET_LIST_PLAY_STUDIO_DETAIL_SUCCESS]: getListPlayStudioDetailSuccess,
  [Types.GET_LIST_PLAY_STUDIO_DETAIL_FAILED]: getListPlayStudioDetailFailed,

  [Types.GET_LIST_RECORD]: getListRecord,
  [Types.GET_LIST_RECORD_SUCCESS]: getListRecordSuccess,
  [Types.GET_LIST_RECORD_FAILED]: getListRecordFailed,

  [Types.GET_LIST_STUDIO_MONTH]: getListStudioMonth,
  [Types.GET_LIST_STUDIO_MONTH_SUCCESS]: getListStudioMonthSuccess,
  [Types.GET_LIST_STUDIO_MONTH_FAILED]: getListStudioMonthFailed,

  [Types.GET_LIST_STUDIO_CHALLENGE]: getListStudioChallenge,
  [Types.GET_LIST_STUDIO_CHALLENGE_SUCCESS]: getListStudioChallengeSuccess,
  [Types.GET_LIST_STUDIO_CHALLENGE_FAILED]: getListStudioChallengeFailed,

  [Types.SAVE_TAB_ACTIVE]: saveTabActive,

  [Types.SAVE_ID_ACTIVE]: saveIdActive,

  [Types.GET_DETAIL_PLAY_STUDIO]: getDetailPlayStudio,
  [Types.GET_DETAIL_PLAY_STUDIO_SUCCESS]: getDetailPlayStudioSuccess,
  [Types.GET_DETAIL_PLAY_STUDIO_FAILED]: getDetailPlayStudioFailed,

  [Types.GET_LIST_REVIEW_STUDIO]: getListReviewStudio,
  [Types.GET_LIST_REVIEW_STUDIO_SUCCESS]: getListReviewStudioSuccess,
  [Types.GET_LIST_REVIEW_STUDIO_FAILED]: getListReviewStudioFailed,

  [Types.SAVE_REVIEW_STUDIO]: saveReviewStudio,
  [Types.SAVE_REVIEW_STUDIO_SUCCESS]: saveReviewStudioSuccess,
  [Types.SAVE_REVIEW_STUDIO_FAILED]: saveReviewStudioFailed,

  [Types.DELETE_REVIEW_STUDIO]: deleteReviewStudio,
  [Types.DELETE_REVIEW_STUDIO_SUCCESS]: deleteReviewStudioSuccess,
  [Types.DELETE_REVIEW_STUDIO_FAILED]: deleteReviewStudioFailed,

  [Types.RESET_DATA_RECORD]: resetDataRecord,

  [Types.LIKE_STUDIO]: likeStudio,
  [Types.LIKE_STUDIO_SUCCESS]: likeStudioSuccess,
  [Types.LIKE_STUDIO_FAILED]: likeStudioFailed,

  [Types.ACTION_LIKE]: actionLike,

  [Types.GET_LIST_FILTER_STUDIO]: getListFilterStudio,
  [Types.GET_LIST_FILTER_STUDIO_SUCCESS]: getListFilterStudioSuccess,
  [Types.GET_LIST_FILTER_STUDIO_FAILED]: getListFilterStudioFailed,

  [Types.GET_DETAIL_RECORD_STUDIO]: getDetailRecordStudio,
  [Types.GET_DETAIL_RECORD_STUDIO_SUCCESS]: getDetailRecordStudioSuccess,
  [Types.GET_DETAIL_RECORD_STUDIO_FAILED]: getDetailRecordStudioFailed,

  [Types.GET_LIST_SERIES_STUDIO]: getListSeriesStudio,
  [Types.GET_LIST_SERIES_STUDIO_SUCCESS]: getListSeriesStudioSuccess,
  [Types.GET_LIST_SERIES_STUDIO_FAILED]: getListSeriesStudioFailed,

  [Types.LIKE_DETAIL_STUDIO]: likeDetailStudio,
  [Types.LIKE_DETAIL_STUDIO_SUCCESS]: likeDetailStudioSuccess,
  [Types.LIKE_DETAIL_STUDIO_FAILED]: likeDetailStudioFailed,

  [Types.SET_STATUS_PLAY_RECORD]: setStatusPlayRecord,
  [Types.SET_STATUS_PLAY_RECORD_SUCCESS]: setStatusPlayRecordSuccess,
  [Types.SET_STATUS_PLAY_RECORD_FAILED]: setStatusPlayRecordFailed,
};

// Create reducers by pass state and handlers
export const recordReducer = createReducer(INITIAL_STATE, HANDLERS);
