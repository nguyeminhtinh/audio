// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getDataAudioBook: ['id'],
  getDataAudioBookSuccess: null,
  getDataAudioBookFailed: null,
  getAudioBookSeries: ['groupId', 'mediaTypeId'],
  getAudioBookSeriesSuccess: null,
  getAudioBookSeriesFailed: null,
  setStatusPlay: ['data'],
  setStatusPlaySuccess: null,
  setStatusPlayFailed: null,
  likePlayer: ['data'],
  likePlayerSuccess: null,
  likePlayerFailed: null,
  setAutoPlay: ['data'],
  actionLike: ['name'],
  getContentVideo: ['data'],
  getContentVideoSuccess: null,
  getContentVideoFailed: null,
  checkPlay: null,
  checkPlaySuccess: null,
  checkPlayFailed: null,
  getListReview: ['id', 'data'],
  getListReviewSuccess: null,
  getListReviewFailed: null,
  saveReview: ['data'],
  saveReviewSuccess: null,
  saveReviewFailed: null,
  getListTypeReport: null,
  getListTypeReportSuccess: null,
  getListTypeReportFailed: null,
  saveReport: ['data'],
  saveReportSuccess: null,
  saveReportFailed: null,
  saveTypeReport: ['data'],
  resetData: null,
  deleteReview: ['data'],
  deleteReviewSuccess: null,
  deleteReviewFailed: null,
  checkAudioPlayerValid: ['data'],
  checkAudioPlayerValidSuccess: null,
  checkAudioPlayerValidFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  errors: '',
  dataAudioBookDetail: {},
  dataAudioBookSeries: {},
  isProcessingSeries: false,
  dataPlayerSeries: [],
  dataPlayer: {},
  autoPlay: false,
  likeCount: '',
  contentUrl: '',
  statusVideo: '',
  listReview: [],
  avgRate: 0,
  listTypeReport: [],
  typeReport: '',
  listMyReview: [],
  totalReview: '',
  dataDetailVideo: {},
  isShowReview: true,
});

const getDataAudioBook = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataAudioBookSuccess = (state, action) => {
  const objPlayer = {
    seq: action?.data?.audioBookDetail?.productId,
    title: action?.data?.audioBookDetail?.productName,
    thumbnail:
      action?.data?.audioBookDetail?.thumbnailUrl ||
      'https://down.wjthinkbig.com//DDALGICONG/CONTENTS/THUMBNAIL/DEFAULT/BEAN.PNG',
    audioFile: action?.data?.audioBookDetail?.contentsUrl,
    introTime: 0,
  };
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataAudioBookDetail: action.data,
    dataPlayers: objPlayer,
    likeCount: action.data.likeCount,
  });
};

const getDataAudioBookFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getAudioBookSeries = (state, action) => {
  return state.merge({
    isProcessingSeries: true,
    type: action.type,
  });
};

const getAudioBookSeriesSuccess = (state, action) => {
  const listPlayer = action.data.map((items) => ({
    seq: items.productId,
    title: items.productName,
    thumbnail: items.thumbnailUrl,
    audioFile: items.contentsUrl,
    introTime: 0,
  }));

  return state.merge({
    isProcessingSeries: false,
    type: action.type,
    dataAudioBookSeries: action.data,
    dataPlayerSeries: listPlayer,
  });
};

const getAudioBookSeriesFailed = (state, action) => {
  return state.merge({
    isProcessingSeries: false,
    type: action.type,
  });
};

const setStatusPlay = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const setStatusPlaySuccess = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const setStatusPlayFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const likePlayer = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const likePlayerSuccess = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const likePlayerFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const setAutoPlay = (state, action) => {
  return state.merge({
    autoPlay: action.data,
  });
};

const getContentVideo = (state, action) => {
  return state.merge({
    isProcessingSeries: true,
    type: action.type,
  });
};

const getContentVideoSuccess = (state, action) => {
  return state.merge({
    isProcessingSeries: false,
    type: action.type,
    contentsUrl: action.data,
  });
};

const getContentVideoFailed = (state, action) => {
  return state.merge({
    isProcessingSeries: false,
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

const checkPlay = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const checkPlaySuccess = (state, action) => {
  return state.merge({
    type: action.type,
    statusVideo: action.data,
  });
};

const checkPlayFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const getListReview = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListReviewSuccess = (state, action) => {
  const dataReview = action?.data?.reviews;
  return state.merge({
    isProcessing: false,
    type: action.type,
    listReview: action.data ? [...state.listReview, ...dataReview] : [],
    listMyReview: action?.data?.myReviews,
    avgRate: action?.data?.avgRate || 0,
    totalReview: action?.data?.reviewCount,
    isShowReview: action.data !== null,
  });
};

const getListReviewFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveReview = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const saveReviewSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveReviewFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListTypeReport = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListTypeReportSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listTypeReport: action.data,
  });
};

const getListTypeReportFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveReport = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const saveReportSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveReportFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveTypeReport = (state, action) => {
  return state.merge({
    typeReport: action.data,
  });
};

const resetData = (state) => {
  return state.merge({
    type: '',
    listReview: [],
  });
};

const deleteReview = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteReviewSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listMyReview: [],
  });
};

const deleteReviewFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const checkAudioPlayerValid = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const checkAudioPlayerValidSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailVideo:
      action &&
      action.data &&
      action.data.body &&
      action.data.body[0] &&
      action.data.body[0],
  });
};

const checkAudioPlayerValidFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_DATA_AUDIO_BOOK]: getDataAudioBook,
  [Types.GET_DATA_AUDIO_BOOK_SUCCESS]: getDataAudioBookSuccess,
  [Types.GET_DATA_AUDIO_BOOK_FAILED]: getDataAudioBookFailed,

  [Types.GET_AUDIO_BOOK_SERIES]: getAudioBookSeries,
  [Types.GET_AUDIO_BOOK_SERIES_SUCCESS]: getAudioBookSeriesSuccess,
  [Types.GET_AUDIO_BOOK_SERIES_FAILED]: getAudioBookSeriesFailed,

  [Types.SET_STATUS_PLAY]: setStatusPlay,
  [Types.SET_STATUS_PLAY_SUCCESS]: setStatusPlaySuccess,
  [Types.SET_STATUS_PLAY_FAILED]: setStatusPlayFailed,

  [Types.LIKE_PLAYER]: likePlayer,
  [Types.LIKE_PLAYER_SUCCESS]: likePlayerSuccess,
  [Types.LIKE_PLAYER_FAILED]: likePlayerFailed,

  [Types.SET_AUTO_PLAY]: setAutoPlay,

  [Types.ACTION_LIKE]: actionLike,

  [Types.GET_CONTENT_VIDEO]: getContentVideo,
  [Types.GET_CONTENT_VIDEO_SUCCESS]: getContentVideoSuccess,
  [Types.GET_CONTENT_VIDEO_FAILED]: getContentVideoFailed,

  [Types.CHECK_PLAY]: checkPlay,
  [Types.CHECK_PLAY_SUCCESS]: checkPlaySuccess,
  [Types.CHECK_PLAY_FAILED]: checkPlayFailed,

  [Types.GET_LIST_REVIEW]: getListReview,
  [Types.GET_LIST_REVIEW_SUCCESS]: getListReviewSuccess,
  [Types.GET_LIST_REVIEW_FAILED]: getListReviewFailed,

  [Types.SAVE_REVIEW]: saveReview,
  [Types.SAVE_REVIEW_SUCCESS]: saveReviewSuccess,
  [Types.SAVE_REVIEW_FAILED]: saveReviewFailed,

  [Types.GET_LIST_TYPE_REPORT]: getListTypeReport,
  [Types.GET_LIST_TYPE_REPORT_SUCCESS]: getListTypeReportSuccess,
  [Types.GET_LIST_TYPE_REPORT_FAILED]: getListTypeReportFailed,

  [Types.SAVE_REPORT]: saveReport,
  [Types.SAVE_REPORT_SUCCESS]: saveReportSuccess,
  [Types.SAVE_REPORT_FAILED]: saveReportFailed,

  [Types.SAVE_TYPE_REPORT]: saveTypeReport,

  [Types.RESET_DATA]: resetData,

  [Types.DELETE_REVIEW]: deleteReview,
  [Types.DELETE_REVIEW_SUCCESS]: deleteReviewSuccess,
  [Types.DELETE_REVIEW_FAILED]: deleteReviewFailed,

  [Types.CHECK_AUDIO_PLAYER_VALID]: checkAudioPlayerValid,
  [Types.CHECK_AUDIO_PLAYER_VALID_SUCCESS]: checkAudioPlayerValidSuccess,
  [Types.CHECK_AUDIO_PLAYER_VALID_FAILED]: checkAudioPlayerValidFailed,
};

// Create reducers by pass state and handlers
export const playBookReducer = createReducer(INITIAL_STATE, HANDLERS);
