// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getDataMain: null,
  getDataMainSuccess: null,
  getDataMainFailed: null,
  getDataStrawberry: ['data'],
  getDataStrawberrySuccess: null,
  getDataStrawberryFailed: null,
  getDataStrawberryDj: ['data'],
  getDataStrawberryDjSuccess: null,
  getDataStrawberryDjFailed: null,
  getDataStrawberrySchool: ['data'],
  getDataStrawberrySchoolSuccess: null,
  getDataStrawberrySchoolFailed: null,
  getDataBestFriend: ['id'],
  getDataBestFriendSuccess: null,
  getDataBestFriendFailed: null,
  getDataMonthTopic: ['data'],
  getDataMonthTopicSuccess: null,
  getDataMonthTopicFailed: null,
  getDataCharacter: ['data'],
  getDataCharacterSuccess: null,
  getDataCharacterFailed: null,
  getDataThemeDj: ['id'],
  getDataThemeDjSuccess: null,
  getDataThemeDjFailed: null,
  getDataThemeMonth: ['data'],
  getDataThemeMonthSuccess: null,
  getDataThemeMonthFailed: null,
  getDataThemeMonthDetail: ['id'],
  getDataThemeMonthDetailSuccess: null,
  getDataThemeMonthDetailFailed: null,
  getDataThemeCharacterDetail: ['id'],
  getDataThemeCharacterDetailSuccess: null,
  getDataThemeCharacterDetailFailed: null,
  getDataThemeSchool: ['id'],
  getDataThemeSchoolSuccess: null,
  getDataThemeSchoolFailed: null,
  getDataThemeLikeThis: ['id'],
  getDataThemeLikeThisSuccess: null,
  getDataThemeLikeThisFailed: null,
  paymentValidate: null,
  paymentValidateSuccess: null,
  paymentValidateFailed: null,
  getDataThemeBanner: ['id'],
  getDataThemeBannerSuccess: null,
  getDataThemeBannerFailed: null,
  getDataThemeDefault: ['id'],
  getDataThemeDefaultSuccess: null,
  getDataThemeDefaultFailed: null,
  getDataSlideToday: null,
  getDataSlideTodaySuccess: null,
  getDataSlideTodayFailed: null,
  setActiveSlide: ['slide'],
  saveTypeApp: ['data'],
  setClassItemLeft: ['data'],
  saveActiveTabDetail: ['data'],
  resetActiveTabDetail: ['data'],
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  errors: '',
  dataStrawberry: [],
  dataStrawberryDj: [],
  dataStrawberrySchool: [],
  dataBestFriend: [],
  dataMonthTopic: [],
  dataCharacter: [],
  dataMain: [],
  listKeyAge: [],
  dataThemeDj: {},
  dataThemeMonth: {},
  dataThemeMonthDetail: {},
  dataThemeCharacterDetail: {},
  dataThemeSchool: [],
  dataThemeLikeThis: {},
  activeSlide: 0,
  ageIdMain: '',
  typeApp: '',
  dataThemeBannerDetail: {},
  dataThemeDefaultDetail: {},
  dataSlideToday: [],
  isIndex: false,
});

const getDataMain = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataMainSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataMain: action.data,
    ageIdMain: action.data.ageId,
    dataSlideToday: action.data.todays,
    listKeyAge:
      action?.data?.schools?.response &&
      Object.keys(action?.data?.schools?.response).sort(),
  });
};

const getDataMainFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataStrawberry = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataStrawberrySuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataStrawberryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataStrawberryDj = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};
const saveActiveTabDetail = (state, action) => {
  return state.merge({
    type: action.type,
    valActiveTab: action.data,
  });
};

const resetActiveTabDetail = (state, action) => {
  return state.merge({
    type: action.type,
    valActiveTab: '',
  });
};

const getDataStrawberryDjSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataStrawberryDjFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataStrawberrySchool = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataStrawberrySchoolSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataStrawberrySchoolFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataBestFriend = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataBestFriendSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataBestFriend: action.data,
  });
};

const getDataBestFriendFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataMonthTopic = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataMonthTopicSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataMonthTopicFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataCharacter = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataCharacterSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataCharacterFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataThemeDj = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeDjSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeDj: action.data,
  });
};

const getDataThemeDjFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataThemeMonth = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeMonthSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeMonth: action.data,
  });
};

const getDataThemeMonthFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataThemeMonthDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeMonthDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeMonthDetail: action.data,
  });
};

const getDataThemeMonthDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataThemeCharacterDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeCharacterDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeCharacterDetail: action.data,
  });
};

const getDataThemeCharacterDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataThemeSchool = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeSchoolSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeSchool: action.data,
  });
};

const getDataThemeSchoolFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataThemeLikeThis = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeLikeThisSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeLikeThis: action.data,
  });
};

const getDataThemeLikeThisFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const paymentValidate = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const paymentValidateSuccess = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const paymentValidateFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const getDataThemeBanner = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeBannerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeDefaultDetail: action.data,
  });
};

const getDataThemeBannerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataThemeDefault = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataThemeDefaultSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataThemeDefaultDetail: action.data,
  });
};

const getDataThemeDefaultFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getDataSlideToday = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataSlideTodaySuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataSlideToday: action.data,
  });
};

const getDataSlideTodayFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const setActiveSlide = (state, action) => {
  return state.merge({
    activeSlide: action.slide,
  });
};

const saveTypeApp = (state, action) => {
  return state.merge({
    typeApp: action.data,
  });
};

const setClassItemLeft = (state, action) => {
  return state.merge({
    isIndex: action.data,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_DATA_MAIN]: getDataMain,
  [Types.GET_DATA_MAIN_SUCCESS]: getDataMainSuccess,
  [Types.GET_DATA_MAIN_FAILED]: getDataMainFailed,

  [Types.GET_DATA_STRAWBERRY]: getDataStrawberry,
  [Types.GET_DATA_STRAWBERRY_SUCCESS]: getDataStrawberrySuccess,
  [Types.GET_DATA_STRAWBERRY_FAILED]: getDataStrawberryFailed,

  [Types.GET_DATA_STRAWBERRY_DJ]: getDataStrawberryDj,
  [Types.GET_DATA_STRAWBERRY_DJ_SUCCESS]: getDataStrawberryDjSuccess,
  [Types.GET_DATA_STRAWBERRY_DJ_FAILED]: getDataStrawberryDjFailed,

  [Types.GET_DATA_STRAWBERRY_SCHOOL]: getDataStrawberrySchool,
  [Types.GET_DATA_STRAWBERRY_SCHOOL_SUCCESS]: getDataStrawberrySchoolSuccess,
  [Types.GET_DATA_STRAWBERRY_SCHOOL_FAILED]: getDataStrawberrySchoolFailed,

  [Types.GET_DATA_BEST_FRIEND]: getDataBestFriend,
  [Types.GET_DATA_BEST_FRIEND_SUCCESS]: getDataBestFriendSuccess,
  [Types.GET_DATA_BEST_FRIEND_FAILED]: getDataBestFriendFailed,

  [Types.GET_DATA_MONTH_TOPIC]: getDataMonthTopic,
  [Types.GET_DATA_MONTH_TOPIC_SUCCESS]: getDataMonthTopicSuccess,
  [Types.GET_DATA_MONTH_TOPIC_FAILED]: getDataMonthTopicFailed,

  [Types.GET_DATA_CHARACTER]: getDataCharacter,
  [Types.GET_DATA_CHARACTER_SUCCESS]: getDataCharacterSuccess,
  [Types.GET_DATA_CHARACTER_FAILED]: getDataCharacterFailed,

  [Types.GET_DATA_THEME_DJ]: getDataThemeDj,
  [Types.GET_DATA_THEME_DJ_SUCCESS]: getDataThemeDjSuccess,
  [Types.GET_DATA_THEME_DJ_FAILED]: getDataThemeDjFailed,

  [Types.GET_DATA_THEME_MONTH]: getDataThemeMonth,
  [Types.GET_DATA_THEME_MONTH_SUCCESS]: getDataThemeMonthSuccess,
  [Types.GET_DATA_THEME_MONTH_FAILED]: getDataThemeMonthFailed,

  [Types.GET_DATA_THEME_MONTH_DETAIL]: getDataThemeMonthDetail,
  [Types.GET_DATA_THEME_MONTH_DETAIL_SUCCESS]: getDataThemeMonthDetailSuccess,
  [Types.GET_DATA_THEME_MONTH_DETAIL_FAILED]: getDataThemeMonthDetailFailed,

  [Types.GET_DATA_THEME_CHARACTER_DETAIL]: getDataThemeCharacterDetail,
  [Types.GET_DATA_THEME_CHARACTER_DETAIL_SUCCESS]: getDataThemeCharacterDetailSuccess,
  [Types.GET_DATA_THEME_CHARACTER_DETAIL_FAILED]: getDataThemeCharacterDetailFailed,

  [Types.GET_DATA_THEME_SCHOOL]: getDataThemeSchool,
  [Types.GET_DATA_THEME_SCHOOL_SUCCESS]: getDataThemeSchoolSuccess,
  [Types.GET_DATA_THEME_SCHOOL_FAILED]: getDataThemeSchoolFailed,

  [Types.GET_DATA_THEME_LIKE_THIS]: getDataThemeLikeThis,
  [Types.GET_DATA_THEME_LIKE_THIS_SUCCESS]: getDataThemeLikeThisSuccess,
  [Types.GET_DATA_THEME_LIKE_THIS_FAILED]: getDataThemeLikeThisFailed,

  [Types.PAYMENT_VALIDATE]: paymentValidate,
  [Types.PAYMENT_VALIDATE_SUCCESS]: paymentValidateSuccess,
  [Types.PAYMENT_VALIDATE_FAILED]: paymentValidateFailed,

  [Types.GET_DATA_THEME_BANNER]: getDataThemeBanner,
  [Types.GET_DATA_THEME_BANNER_SUCCESS]: getDataThemeBannerSuccess,
  [Types.GET_DATA_THEME_BANNER_FAILED]: getDataThemeBannerFailed,

  [Types.GET_DATA_THEME_DEFAULT]: getDataThemeDefault,
  [Types.GET_DATA_THEME_DEFAULT_SUCCESS]: getDataThemeDefaultSuccess,
  [Types.GET_DATA_THEME_DEFAULT_FAILED]: getDataThemeDefaultFailed,

  [Types.GET_DATA_SLIDE_TODAY]: getDataSlideToday,
  [Types.GET_DATA_SLIDE_TODAY_SUCCESS]: getDataSlideTodaySuccess,
  [Types.GET_DATA_SLIDE_TODAY_FAILED]: getDataSlideTodayFailed,

  [Types.SET_ACTIVE_SLIDE]: setActiveSlide,
  [Types.SAVE_ACTIVE_TAB_DETAIL]: saveActiveTabDetail,
  [Types.RESET_ACTIVE_TAB_DETAIL]: resetActiveTabDetail,

  [Types.SAVE_TYPE_APP]: saveTypeApp,
  [Types.SET_CLASS_ITEM_LEFT]: setClassItemLeft,
};

// Create reducers by pass state and handlers
export const mainReducer = createReducer(INITIAL_STATE, HANDLERS);
