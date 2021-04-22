// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import IMAGES from 'themes/images';

// Define action creators
export const { Types, Creators } = createActions({
  getKeySearchAutoComplete: ['keyword'],
  getKeySearchAutoCompleteSuccess: null,
  getKeySearchAutoCompleteFailed: null,
  getDataSearchDetail: ['keyword', 'data'],
  getDataSearchDetailSuccess: null,
  getDataSearchDetailFailed: null,
  getCondition: ['data'],
  getConditionSuccess: null,
  getConditionFailed: null,
  searchCategory: ['data'],
  searchCategorySuccess: null,
  searchCategoryFailed: null,
  searchKeywordDetail: ['data'],
  searchKeywordDetailSuccess: null,
  searchKeywordDetailFailed: null,
  resetData: null,
  getPage: ['data'],
  getTabActive: ['tab'],
  getTabActiveSubject: ['tab'],
  getKeySearch: ['key'],
  getKeySearchDetail: ['key'],
  getLibrary: ['data'],
  getLibrarySuccess: null,
  getLibraryFailed: null,

  getLibraryDetail: ['groupId', 'mediaTypeId'],
  getLibraryDetailSuccess: null,
  getLibraryDetailFailed: null,

  saveHistorySearch: ['data'],
  saveHistorySearchSuccess: null,
  saveHistorySearchFailed: null,

  saveHistorySearchDetail: ['data'],
  saveHistorySearchDetailSuccess: null,
  saveHistorySearchDetailFailed: null,

  getTabActiveSeries: ['tab'],
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  isProcessingSearch: false,
  errors: '',
  listAudioBookAutoComplete: [],
  listPlayBookAutoComplete: [],
  listMusicAutoComplete: [],
  listSeriesAutoComplete: [],
  listCondition: {},
  subjectCategory: [],
  topKeywords: [],
  dataSearchCategoryVideo: [],
  ageCategorySearch: [],
  categorySearch: [],
  subjectCategorySearch: [],
  totalAudio: '',
  totalPlay: '',
  totalMusic: '',
  dataSearchCategoryMusic: [],
  dataSearchCategoryAudio: [],
  pageActive: 0,
  tabActive: '',
  tabActiveSubject: '',
  keySearch: {},
  keySearchDetail: '',
  dataSearchEmpty: [],
  totalSeries: '',
  dataSearchCategorySeries: [],
  dataLibraryDetail: [],
  tabActiveSeries: '',
});

const getKeySearchAutoComplete = (state, action) => {
  return state.merge({
    isProcessingSearch: true,
    type: action.type,
  });
};

const getKeySearchAutoCompleteSuccess = (state, action) => {
  const { data } = action;
  const { audioBook, music, playBook, series } = data;
  const listAudioBookAutoComplete =
    audioBook &&
    audioBook.map((item) => {
      return {
        id: item.productId,
        name: item.name,
      };
    });
  const listPlayBookAutoComplete =
    playBook &&
    playBook.map((item) => {
      return {
        id: item.productId,
        name: item.name,
      };
    });
  const listMusicAutoComplete =
    music &&
    music.map((item) => {
      return {
        id: item.productId,
        name: item.name,
      };
    });
  const listSeriesAutoComplete =
    series &&
    series.map((item) => {
      return {
        id: item.groupId,
        name: item.groupName,
        mediaTypeId: item.mediaTypeId,
        groupName: item.groupName,
      };
    });
  return state.merge({
    isProcessingSearch: false,
    type: action.type,
    listAudioBookAutoComplete,
    listPlayBookAutoComplete,
    listMusicAutoComplete,
    listSeriesAutoComplete,
  });
};

const getKeySearchAutoCompleteFailed = (state, action) => {
  return state.merge({
    isProcessingSearch: false,
    type: action.type,
    listSearchAutoComplete: [],
    listAudioBookAutoComplete: [],
    listPlayBookAutoComplete: [],
    listMusicAutoComplete: [],
  });
};

const getDataSearchDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getDataSearchDetailSuccess = (state, action) => {
  const dataSearchAge = action?.data?.response?.playBook;
  const dataSearchMusic = action?.data?.response?.music;
  const dataSearchAudio = action?.data?.response?.audioBook;
  const dataSearchSeries = action?.data?.response?.series;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataSearchCategoryVideo: [
      ...state.dataSearchCategoryVideo,
      ...dataSearchAge,
    ],
    dataSearchCategoryMusic: [
      ...state.dataSearchCategoryMusic,
      ...dataSearchMusic,
    ],
    dataSearchCategoryAudio: [
      ...state.dataSearchCategoryAudio,
      ...dataSearchAudio,
    ],
    dataSearchCategorySeries: [
      ...state.dataSearchCategorySeries,
      ...dataSearchSeries,
    ],
    totalAudio: action?.data?.response?.audioBookCount,
    totalSeries: action?.data?.response?.seriesCount,
    totalPlay: action?.data?.response?.playBookCount,
    totalMusic: action?.data?.response?.musicCount,
    dataSearchEmpty: action?.data?.response?.emptyProduct,
  });
};

const getDataSearchDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getCondition = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getConditionSuccess = (state, action) => {
  const arrayAll = { ageFrom: null, ageGoup: 'all', ageTo: null, id: 0 };
  const arrayAllCategory = {
    subject: '전체',
    id: 0,
    image: IMAGES.btn_synthetic,
  };
  const dataCategory = action?.data?.subjectCategorys?.map((item) => ({
    ...item,
    image: `${IMAGES.btnCategory[item.id]}`,
  }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    listCondition: action?.data,
    subjectCategory: [arrayAllCategory, ...dataCategory],
    topKeywords: action?.data?.topKeywords,
    ageCategorySearch: [arrayAll, ...action?.data?.ageCategorys],
    categorySearch: action?.data?.ageCategorys,
    subjectCategorySearch: action?.data?.subjectCategorys,
  });
};

const getConditionFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const searchCategory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const searchCategorySuccess = (state, action) => {
  const dataSearchAge = action?.data?.response?.playBook;
  const dataSearchMusic = action?.data?.response?.music;
  const dataSearchAudio = action?.data?.response?.audioBook;
  const dataSearchSeries = action?.data?.response?.series;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataSearchCategoryVideo: [
      ...state.dataSearchCategoryVideo,
      ...dataSearchAge,
    ],
    dataSearchCategoryMusic: [
      ...state.dataSearchCategoryMusic,
      ...dataSearchMusic,
    ],
    dataSearchCategoryAudio: [
      ...state.dataSearchCategoryAudio,
      ...dataSearchAudio,
    ],
    dataSearchCategorySeries: [
      ...state.dataSearchCategorySeries,
      ...dataSearchSeries,
    ],
    totalAudio: action?.data?.response?.audioBookCount,
    totalPlay: action?.data?.response?.playBookCount,
    totalMusic: action?.data?.response?.musicCount,
    totalSeries: action?.data?.response?.seriesCount,
  });
};

const searchCategoryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const searchKeywordDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const searchKeywordDetailSuccess = (state, action) => {
  const dataSearchAge = action?.data?.response?.playBook;
  const dataSearchMusic = action?.data?.response?.music;
  const dataSearchAudio = action?.data?.response?.audioBook;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataSearchCategoryVideo: [
      ...state.dataSearchCategoryVideo,
      ...dataSearchAge,
    ],
    dataSearchCategoryMusic: [
      ...state.dataSearchCategoryMusic,
      ...dataSearchMusic,
    ],
    dataSearchCategoryAudio: [
      ...state.dataSearchCategoryAudio,
      ...dataSearchAudio,
    ],
    totalAudio: action?.data?.response?.audioBookCount,
    totalPlay: action?.data?.response?.playBookCount,
    totalMusic: action?.data?.response?.musicCount,
  });
};

const searchKeywordDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getLibrary = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getLibrarySuccess = (state, action) => {
  const dataSearchVideo = action?.data?.response?.playBook;
  const dataSearchMusic = action?.data?.response?.music;
  const dataSearchAudio = action?.data?.response?.audioBook;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataSearchCategoryVideo: [
      ...state.dataSearchCategoryVideo,
      ...dataSearchVideo,
    ],
    dataSearchCategoryMusic: [
      ...state.dataSearchCategoryMusic,
      ...dataSearchMusic,
    ],
    dataSearchCategoryAudio: [
      ...state.dataSearchCategoryAudio,
      ...dataSearchAudio,
    ],
    totalAudio: action?.data?.response?.audioBookCount,
    totalPlay: action?.data?.response?.playBookCount,
    totalMusic: action?.data?.response?.musicCount,
    dataSearchEmpty: action?.data?.response?.emptyProduct,
  });
};

const getLibraryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetData = (state) => {
  return state.merge({
    type: '',
    dataSearchCategoryVideo: [],
    dataSearchCategoryMusic: [],
    dataSearchCategoryAudio: [],
    dataSearchCategorySeries: [],
    pageActive: 0,
  });
};

const getPage = (state, action) => {
  return state.merge({
    type: '',
    pageActive: action.data,
  });
};

const getTabActive = (state, action) => {
  return state.merge({
    tabActive: action.tab,
  });
};

const getTabActiveSubject = (state, action) => {
  return state.merge({
    tabActiveSubject: action.tab,
  });
};

const getKeySearch = (state, action) => {
  return state.merge({
    keySearch: action.key,
  });
};

const getKeySearchDetail = (state, action) => {
  return state.merge({
    keySearchDetail: action.key,
  });
};

const getLibraryDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getLibraryDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataLibraryDetail: action.data,
  });
};

const getLibraryDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveHistorySearch = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const saveHistorySearchSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveHistorySearchFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveHistorySearchDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const saveHistorySearchDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveHistorySearchDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getTabActiveSeries = (state, action) => {
  return state.merge({
    tabActiveSeries: action.tab,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_KEY_SEARCH_AUTO_COMPLETE]: getKeySearchAutoComplete,
  [Types.GET_KEY_SEARCH_AUTO_COMPLETE_SUCCESS]: getKeySearchAutoCompleteSuccess,
  [Types.GET_KEY_SEARCH_AUTO_COMPLETE_FAILED]: getKeySearchAutoCompleteFailed,

  [Types.GET_DATA_SEARCH_DETAIL]: getDataSearchDetail,
  [Types.GET_DATA_SEARCH_DETAIL_SUCCESS]: getDataSearchDetailSuccess,
  [Types.GET_DATA_SEARCH_DETAIL_FAILED]: getDataSearchDetailFailed,

  [Types.GET_CONDITION]: getCondition,
  [Types.GET_CONDITION_SUCCESS]: getConditionSuccess,
  [Types.GET_CONDITION_FAILED]: getConditionFailed,

  [Types.SEARCH_CATEGORY]: searchCategory,
  [Types.SEARCH_CATEGORY_SUCCESS]: searchCategorySuccess,
  [Types.SEARCH_CATEGORY_FAILED]: searchCategoryFailed,

  [Types.SEARCH_KEYWORD_DETAIL]: searchKeywordDetail,
  [Types.SEARCH_KEYWORD_DETAIL_SUCCESS]: searchKeywordDetailSuccess,
  [Types.SEARCH_KEYWORD_DETAIL_FAILED]: searchKeywordDetailFailed,

  [Types.RESET_DATA]: resetData,

  [Types.GET_PAGE]: getPage,

  [Types.GET_TAB_ACTIVE]: getTabActive,

  [Types.GET_TAB_ACTIVE_SUBJECT]: getTabActiveSubject,

  [Types.GET_KEY_SEARCH]: getKeySearch,

  [Types.GET_KEY_SEARCH_DETAIL]: getKeySearchDetail,

  [Types.GET_LIBRARY]: getLibrary,
  [Types.GET_LIBRARY_SUCCESS]: getLibrarySuccess,
  [Types.GET_LIBRARY_FAILED]: getLibraryFailed,

  [Types.GET_LIBRARY_DETAIL]: getLibraryDetail,
  [Types.GET_LIBRARY_DETAIL_SUCCESS]: getLibraryDetailSuccess,
  [Types.GET_LIBRARY_DETAIL_FAILED]: getLibraryDetailFailed,

  [Types.SAVE_HISTORY_SEARCH]: saveHistorySearch,
  [Types.SAVE_HISTORY_SEARCH_SUCCESS]: saveHistorySearchSuccess,
  [Types.SAVE_HISTORY_SEARCH_FAILED]: saveHistorySearchFailed,

  [Types.SAVE_HISTORY_SEARCH_DETAIL]: saveHistorySearchDetail,
  [Types.SAVE_HISTORY_SEARCH_DETAIL_SUCCESS]: saveHistorySearchDetailSuccess,
  [Types.SAVE_HISTORY_SEARCH_DETAIL_FAILED]: saveHistorySearchDetailFailed,

  [Types.GET_TAB_ACTIVE_SERIES]: getTabActiveSeries,
};

// Create reducers by pass state and handlers
export const searchReducer = createReducer(INITIAL_STATE, HANDLERS);
