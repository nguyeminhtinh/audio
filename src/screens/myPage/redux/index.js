// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

// Define action creators
export const { Types, Creators } = createActions({
  getListNotice: ['data'],
  getListNoticeSuccess: null,
  getListNoticeFailed: null,

  consultationSave: ['data'],
  consultationSaveSuccess: null,
  consultationSaveFailed: null,

  getListConsultation: ['page'],
  getListConsultationSuccess: null,
  getListConsultationFailed: null,

  getDetailConsultation: ['qnaId'],
  getDetailConsultationSuccess: null,
  getDetailConsultationFailed: null,

  getAnnouncementHistory: ['data'],
  getAnnouncementHistorySuccess: null,
  getAnnouncementHistoryFailed: null,

  getAnnouncementDetail: ['id'],
  getAnnouncementDetailSuccess: null,
  getAnnouncementDetailFailed: null,

  resetData: null,

  deleteConsultation: ['listQnaId'],
  deleteConsultationSuccess: null,
  deleteConsultationFailed: null,

  settingUserCategory: null,
  settingUserCategorySuccess: null,
  settingUserCategoryFailed: null,

  settingContentUser: ['data'],
  settingContentUserSuccess: null,
  settingContentUserFailed: null,

  saveFile: ['id', 'data'],
  saveFileSuccess: null,
  saveFileFailed: null,

  logout: null,

  saveHistoryBanner: ['id'],
  saveHistoryBannerSuccess: null,
  saveHistoryBannerFailed: null,

  handlePush: ['data'],
  handlePushSuccess: null,
  handlePushFailed: null,

  updatePhone: ['data'],
  updatePhoneSuccess: null,
  updatePhoneFailed: null,

  updatePassword: ['data'],
  updatePasswordSuccess: null,
  updatePasswordFailed: null,

  settingWiFi: ['data'],
  settingWiFiSuccess: null,
  settingWiFiFailed: null,

  registerCoupon: ['data'],
  registerCouponSuccess: null,
  registerCouponFailed: null,

  registerHistoryPage: ['data'],
  registerHistoryPageSuccess: null,
  registerHistoryPageFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  errors: '',
  listNotice: [],
  listConsultation: [],
  dataDetailConsultation: {},
  dataAnnouncementHistory: [],
  dataAnnouncementDetail: {},
  statusCode: 0,
  totalAnnouncement: 0,
  totalConsultation: 0,
  listDataCategorySetting: {},
  qnaId: '',
  codeStatus: '',
  codeRegisterCoupon: '',
});

const getListNotice = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListNoticeSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getListNoticeFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const consultationSave = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    statusCode: 0,
  });
};

const consultationSaveSuccess = (state, action) => {
  const { data } = action;
  return state.merge({
    isProcessing: false,
    type: action.type,
    statusCode: (data && data.code && data.code) || 0,
    qnaId: data.body.id,
  });
};

const consultationSaveFailed = (state, action) => {
  const { data } = action;
  return state.merge({
    isProcessing: false,
    type: action.type,
    statusCode: (data && data.code && data.code) || 0,
  });
};

/**
 *
 * Action get list consultation
 */
const getListConsultation = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListConsultationSuccess = (state, action) => {
  const dataQna = action.data.qnaDetails;
  return state.merge({
    isProcessing: false,
    type: action.type,
    listConsultation: [...state.listConsultation, ...dataQna],
    totalConsultation: action.data.totalCount,
  });
};

const getListConsultationFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getAnnouncementHistory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getAnnouncementHistorySuccess = (state, action) => {
  const dataAnnouncement = action.data.noticeDetails;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataAnnouncementHistory: [
      ...state.dataAnnouncementHistory,
      ...dataAnnouncement,
    ],
    totalAnnouncement: action.data.totalCount,
  });
};

const getAnnouncementHistoryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const getAnnouncementDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getAnnouncementDetailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataAnnouncementDetail: action.data,
  });
};

const getAnnouncementDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

/**
 * End Action consultation
 */

/**
 *
 * Action get Detail consultation
 */
const getDetailConsultation = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    statusCode: 0,
  });
};

const getDetailConsultationSuccess = (state, action) => {
  const { data } = action;

  let itemSelect = {
    id: 0,
    value: '',
    label: '',
  };

  switch (data && data.name) {
    case '회원 관련':
      itemSelect = {
        id: 1,
        value: 1,
        label: '회원 관련',
      };
      break;
    case '결제 관련':
      itemSelect = {
        id: 2,
        value: 2,
        label: '결제관련',
      };
      break;
    case '콘텐츠 관련':
      itemSelect = {
        id: 3,
        value: 3,
        label: '콘텐츠관련',
      };
      break;
    case '불편사항 및 오류':
      itemSelect = {
        id: 4,
        value: 4,
        label: '불편사항 및 오류',
      };
      break;
    case '이벤트':
      itemSelect = {
        id: 5,
        value: 5,
        label: '이벤트',
      };
      break;
    case '기타':
      itemSelect = {
        id: 6,
        value: 6,
        label: '기타',
      };
      break;
    default:
      break;
  }

  const dataDetailConsultation = {
    type: itemSelect,
    title: (data && data.title) || '',
    content: (data && data.content) || '',
    filePath: (data && data.filePath) || '',
    reply: data && data.reply,
    date: moment(data?.createdAt).format('YYYY.MM.DD'),
  };

  return state.merge({
    isProcessing: false,
    type: action.type,
    dataDetailConsultation,
  });
};

const getDetailConsultationFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetData = (state) => {
  return state.merge({
    type: '',
    dataAnnouncementHistory: [],
    totalAnnouncement: 0,
    listConsultation: [],
    codeStatus: '',
    codeRegisterCoupon: '',
  });
};

const deleteConsultation = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true,
    statusCode: 0,
  });
};

const deleteConsultationSuccess = (state, action) => {
  const { dataBody } = action?.data;
  return state.merge({
    type: action.type,
    isProcessing: false,
    statusCode: (dataBody && dataBody.code && dataBody.code) || 0,
  });
};

const deleteConsultationFailed = (state, action) => {
  const { data } = action;
  return state.merge({
    isProcessing: false,
    type: action.type,
    statusCode: (data && data.code && data.code) || 0,
  });
};

const settingUserCategory = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const settingUserCategorySuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    listDataCategorySetting: action.data,
  });
};

const settingUserCategoryFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const settingContentUser = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const settingContentUserSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const settingContentUserFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveFile = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const saveFileSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveFileFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const logout = (state) => {
  return state.merge({
    ...INITIAL_STATE,
  });
};

const saveHistoryBanner = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const saveHistoryBannerSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const saveHistoryBannerFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const handlePush = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const handlePushSuccess = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const handlePushFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const updatePhone = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updatePhoneSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePhoneFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePassword = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updatePasswordSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    codeStatus: action.data.code,
    errors: action.data.message,
  });
};

const updatePasswordFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const settingWiFi = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const settingWiFiSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const settingWiFiFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerCoupon = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerCouponSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    codeRegisterCoupon: action.data,
  });
};

const registerCouponFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// register history page
const registerHistoryPage = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const registerHistoryPageSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const registerHistoryPageFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_NOTICE]: getListNotice,
  [Types.GET_LIST_NOTICE_SUCCESS]: getListNoticeSuccess,
  [Types.GET_LIST_NOTICE_FAILED]: getListNoticeFailed,

  [Types.CONSULTATION_SAVE]: consultationSave,
  [Types.CONSULTATION_SAVE_SUCCESS]: consultationSaveSuccess,
  [Types.CONSULTATION_SAVE_FAILED]: consultationSaveFailed,

  [Types.GET_LIST_CONSULTATION]: getListConsultation,
  [Types.GET_LIST_CONSULTATION_SUCCESS]: getListConsultationSuccess,
  [Types.GET_LIST_CONSULTATION_FAILED]: getListConsultationFailed,

  [Types.GET_DETAIL_CONSULTATION]: getDetailConsultation,
  [Types.GET_DETAIL_CONSULTATION_SUCCESS]: getDetailConsultationSuccess,
  [Types.GET_DETAIL_CONSULTATION_FAILED]: getDetailConsultationFailed,

  [Types.GET_ANNOUNCEMENT_HISTORY]: getAnnouncementHistory,
  [Types.GET_ANNOUNCEMENT_HISTORY_SUCCESS]: getAnnouncementHistorySuccess,
  [Types.GET_ANNOUNCEMENT_HISTORY_FAILED]: getAnnouncementHistoryFailed,

  [Types.GET_ANNOUNCEMENT_DETAIL]: getAnnouncementDetail,
  [Types.GET_ANNOUNCEMENT_DETAIL_SUCCESS]: getAnnouncementDetailSuccess,
  [Types.GET_ANNOUNCEMENT_DETAIL_FAILED]: getAnnouncementDetailFailed,

  [Types.DELETE_CONSULTATION]: deleteConsultation,
  [Types.DELETE_CONSULTATION_SUCCESS]: deleteConsultationSuccess,
  [Types.DELETE_CONSULTATION_FAILED]: deleteConsultationFailed,

  [Types.RESET_DATA]: resetData,

  [Types.SETTING_USER_CATEGORY]: settingUserCategory,
  [Types.SETTING_USER_CATEGORY_SUCCESS]: settingUserCategorySuccess,
  [Types.SETTING_USER_CATEGORY_FAILED]: settingUserCategoryFailed,

  [Types.SETTING_CONTENT_USER]: settingContentUser,
  [Types.SETTING_CONTENT_USER_SUCCESS]: settingContentUserSuccess,
  [Types.SETTING_CONTENT_USER_FAILED]: settingContentUserFailed,

  [Types.SAVE_FILE]: saveFile,
  [Types.SAVE_FILE_SUCCESS]: saveFileSuccess,
  [Types.SAVE_FILE_FAILED]: saveFileFailed,

  [Types.LOGOUT]: logout,

  [Types.SAVE_HISTORY_BANNER]: saveHistoryBanner,
  [Types.SAVE_HISTORY_BANNER_SUCCESS]: saveHistoryBannerSuccess,
  [Types.SAVE_HISTORY_BANNER_FAILED]: saveHistoryBannerFailed,

  [Types.HANDLE_PUSH]: handlePush,
  [Types.HANDLE_PUSH_SUCCESS]: handlePushSuccess,
  [Types.HANDLE_PUSH_FAILED]: handlePushFailed,

  [Types.UPDATE_PHONE]: updatePhone,
  [Types.UPDATE_PHONE_SUCCESS]: updatePhoneSuccess,
  [Types.UPDATE_PHONE_FAILED]: updatePhoneFailed,

  [Types.UPDATE_PASSWORD]: updatePassword,
  [Types.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess,
  [Types.UPDATE_PASSWORD_FAILED]: updatePasswordFailed,

  [Types.SETTING_WI_FI]: settingWiFi,
  [Types.SETTING_WI_FI_SUCCESS]: settingWiFiSuccess,
  [Types.SETTING_WI_FI_FAILED]: settingWiFiFailed,

  [Types.REGISTER_COUPON]: registerCoupon,
  [Types.REGISTER_COUPON_SUCCESS]: registerCouponSuccess,
  [Types.REGISTER_COUPON_FAILED]: registerCouponFailed,

  [Types.REGISTER_HISTORY_PAGE]: registerHistoryPage,
  [Types.REGISTER_HISTORY_PAGE_SUCCESS]: registerHistoryPageSuccess,
  [Types.REGISTER_HISTORY_PAGE_FAILED]: registerHistoryPageFailed,
};

// Create reducers by pass state and handlers
export const myPageReducer = createReducer(INITIAL_STATE, HANDLERS);
