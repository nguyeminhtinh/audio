// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import IMAGES from 'themes/images';

// Define action creators
export const { Types, Creators } = createActions({
  settingInterest: ['data'],
  settingInterestSuccess: null,
  settingInterestFailed: null,
  getAgeCategory: null,
  getAgeCategorySuccess: null,
  getAgeCategoryFailed: null,
  getSubjectCategory: null,
  getSubjectCategorySuccess: null,
  getSubjectCategoryFailed: null,
  resetType: null,
  checkUserAccess: ['data'],
  checkUserAccessSuccess: null,
  checkUserAccessFailed: null,
  paramSearch: ['data'],
  logout: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  errors: '',
  listSetting: [],
  listSettingUser: [],
  ageCategory: [],
  subjectCategory: [],
  ageCategorySearch: [],
  code: '',
  token: '',
  dataParamSearch: '',
});

const settingInterest = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    listSettingUser: action.data,
  });
};

const settingInterestSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    token: action?.data?.jwt,
  });
};

const settingInterestFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getAgeCategory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getAgeCategorySuccess = (state, action) => {
  const arrayAll = { ageFrom: null, ageGoup: 'all', ageTo: null, id: 0 };
  return state.merge({
    isProcessing: false,
    type: action.type,
    ageCategory: action.data,
    ageCategorySearch: [arrayAll, ...state.ageCategory],
  });
};

const getAgeCategoryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getSubjectCategory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getSubjectCategorySuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    subjectCategory: action?.data?.map((item) => ({
      ...item,
      image: `${IMAGES.btnCategory[item.id]}`,
    })),
  });
};

const getSubjectCategoryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetType = (state) => {
  return state.merge({
    type: '',
    code: '',
  });
};

const checkUserAccess = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true,
  });
};

const checkUserAccessSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false,
    listSetting: action.data,
    code: action.data.code,
    token: action?.data?.body?.jwt,
  });
};

const checkUserAccessFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false,
  });
};

const paramSearch = (state, action) => {
  return state.merge({
    dataParamSearch: action.data,
  });
};

const logout = (state) => {
  return state.merge({
    token: '',
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.SETTING_INTEREST]: settingInterest,
  [Types.SETTING_INTEREST_SUCCESS]: settingInterestSuccess,
  [Types.SETTING_INTEREST_FAILED]: settingInterestFailed,
  [Types.GET_AGE_CATEGORY]: getAgeCategory,
  [Types.GET_AGE_CATEGORY_SUCCESS]: getAgeCategorySuccess,
  [Types.GET_AGE_CATEGORY_FAILED]: getAgeCategoryFailed,
  [Types.GET_SUBJECT_CATEGORY]: getSubjectCategory,
  [Types.GET_SUBJECT_CATEGORY_SUCCESS]: getSubjectCategorySuccess,
  [Types.GET_SUBJECT_CATEGORY_FAILED]: getSubjectCategoryFailed,
  [Types.RESET_TYPE]: resetType,
  [Types.CHECK_USER_ACCESS]: checkUserAccess,
  [Types.CHECK_USER_ACCESS_SUCCESS]: checkUserAccessSuccess,
  [Types.CHECK_USER_ACCESS_FAILED]: checkUserAccessFailed,
  [Types.PARAM_SEARCH]: paramSearch,
  [Types.LOGOUT]: logout,
};

// Create reducers by pass state and handlers
export const settingReducer = createReducer(INITIAL_STATE, HANDLERS);
