// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getListMy: ['data'],
  getListMySuccess: null,
  getListMyFailed: null,
  activeTabMy: ['data'],
  getInformationUser: null,
  getInformationUserSuccess: null,
  getInformationUserFailed: null,
  updateAvatar: ['id'],
  updateAvatarSuccess: null,
  updateAvatarFailed: null,
  resetDataMy: null,
  getListRecordUser: ['data'],
  getListRecordUserSuccess: null,
  getListRecordUserFailed: null,
  showPopupStudio: null,
  hiddenPopupStudio: null,
  updateStudio: ['data'],
  updateStudioSuccess: null,
  updateStudioFailed: null,
  deleteStudio: ['id'],
  deleteStudioSuccess: null,
  deleteStudioFailed: null,
  showPopupPlaylist: null,
  hiddenPopupPlaylist: null,
  getDataStudio: ['data'],
  getListPlaylist: ['data'],
  getListPlaylistSuccess: null,
  getListPlaylistFailed: null,
  updatePlayGroup: ['data'],
  updatePlayGroupSuccess: null,
  updatePlayGroupFailed: null,
  deleteGroupStudio: ['id'],
  deleteGroupStudioSuccess: null,
  deleteGroupStudioFailed: null,
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  isProcessingChangeAvatar: false,
  errors: '',
  listDataUserPlay: {},
  tabActive: '1',
  infoUser: {},
  totalAudio: '',
  totalPlay: '',
  totalMusic: '',
  dataCategoryMusic: [],
  dataCategoryAudio: [],
  dataCategoryVideo: [],
  dataRecordUser: [],
  totalRecord: 0,
  isShowPopupStudio: false,
  isShowPopupPlaylist: false,
  studioSelected: [],
  dataPlaylist: [],
  totalGroup: 0,
  studioPlaySubject: [],
});

const getListMy = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListMySuccess = (state, action) => {
  const dataVideo = action?.data?.response?.playBook;
  const dataMusic = action?.data?.response?.music;
  const dataAudio = action?.data?.response?.audioBook;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataCategoryVideo: [...state.dataCategoryVideo, ...dataVideo],
    dataCategoryMusic: [...state.dataCategoryMusic, ...dataMusic],
    dataCategoryAudio: [...state.dataCategoryAudio, ...dataAudio],
    totalAudio: action?.data?.response?.audioBookCount,
    totalPlay: action?.data?.response?.playBookCount,
    totalMusic: action?.data?.response?.musicCount,
    listDataUserPlay: action.data.response,
  });
};

const getListMyFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const activeTabMy = (state, action) => {
  return state.merge({
    tabActive: action.data,
  });
};

const getInformationUser = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const getInformationUserSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    infoUser: action.data,
  });
};

const getInformationUserFailed = (state, action) => {
  return state.merge({
    type: action.type,
  });
};

const updateAvatar = (state, action) => {
  return state.merge({
    isProcessingChangeAvatar: true,
    type: action.type,
  });
};

const updateAvatarSuccess = (state, action) => {
  return state.merge({
    isProcessingChangeAvatar: false,
    type: action.type,
  });
};

const updateAvatarFailed = (state, action) => {
  return state.merge({
    isProcessingChangeAvatar: false,
    type: action.type,
  });
};

const getListRecordUser = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListRecordUserSuccess = (state, action) => {
  const dataRecord = action?.data?.studioBooks;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataRecordUser: [...state.dataRecordUser, ...dataRecord],
    totalRecord: action?.data?.studioBookCount,
  });
};

const getListRecordUserFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetDataMy = (state) => {
  return state.merge({
    type: '',
    dataCategoryVideo: [],
    dataCategoryMusic: [],
    dataCategoryAudio: [],
    dataRecordUser: [],
    pageMyActive: 0,
    studioSelected: [],
  });
};

const showPopupStudio = (state) => {
  return state.merge({
    isShowPopupStudio: true,
  });
};

const hiddenPopupStudio = (state) => {
  return state.merge({
    isShowPopupStudio: false,
  });
};

const updateStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updateStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updateStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const showPopupPlaylist = (state) => {
  return state.merge({
    isShowPopupPlaylist: true,
  });
};

const hiddenPopupPlaylist = (state) => {
  return state.merge({
    isShowPopupPlaylist: false,
  });
};

const getDataStudio = (state, action) => {
  return state.merge({
    type: action.type,
    studioSelected: action.data,
  });
};

const getListPlaylist = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const getListPlaylistSuccess = (state, action) => {
  const dataPlaylist = action?.data?.studioGroups;
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataPlaylist: [...dataPlaylist],
    totalGroup: action?.data?.groupCount,
    studioPlaySubject: action?.data?.studioGroups?.map((item) =>
      item?.studioPlaySubjectDtos.map((ele) => ele.id)
    ),
  });
};

const getListPlaylistFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePlayGroup = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const updatePlayGroupSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const updatePlayGroupFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteGroupStudio = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const deleteGroupStudioSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const deleteGroupStudioFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_MY]: getListMy,
  [Types.GET_LIST_MY_SUCCESS]: getListMySuccess,
  [Types.GET_LIST_MY_FAILED]: getListMyFailed,

  [Types.ACTIVE_TAB_MY]: activeTabMy,

  [Types.GET_INFORMATION_USER]: getInformationUser,
  [Types.GET_INFORMATION_USER_SUCCESS]: getInformationUserSuccess,
  [Types.GET_INFORMATION_USER_FAILED]: getInformationUserFailed,

  [Types.UPDATE_AVATAR]: updateAvatar,
  [Types.UPDATE_AVATAR_SUCCESS]: updateAvatarSuccess,
  [Types.UPDATE_AVATAR_FAILED]: updateAvatarFailed,

  [Types.GET_LIST_RECORD_USER]: getListRecordUser,
  [Types.GET_LIST_RECORD_USER_SUCCESS]: getListRecordUserSuccess,
  [Types.GET_LIST_RECORD_USER_FAILED]: getListRecordUserFailed,

  [Types.RESET_DATA_MY]: resetDataMy,
  [Types.SHOW_POPUP_STUDIO]: showPopupStudio,
  [Types.HIDDEN_POPUP_STUDIO]: hiddenPopupStudio,
  [Types.SHOW_POPUP_PLAYLIST]: showPopupPlaylist,
  [Types.HIDDEN_POPUP_PLAYLIST]: hiddenPopupPlaylist,

  [Types.UPDATE_STUDIO]: updateStudio,
  [Types.UPDATE_STUDIO_SUCCESS]: updateStudioSuccess,
  [Types.UPDATE_STUDIO_FAILED]: updateStudioFailed,

  [Types.DELETE_STUDIO]: deleteStudio,
  [Types.DELETE_STUDIO_SUCCESS]: deleteStudioSuccess,
  [Types.DELETE_STUDIO_FAILED]: deleteStudioFailed,

  [Types.GET_DATA_STUDIO]: getDataStudio,

  [Types.GET_LIST_PLAYLIST]: getListPlaylist,
  [Types.GET_LIST_PLAYLIST_SUCCESS]: getListPlaylistSuccess,
  [Types.GET_LIST_PLAYLIST_FAILED]: getListPlaylistFailed,

  [Types.UPDATE_PLAY_GROUP]: updatePlayGroup,
  [Types.UPDATE_PLAY_GROUP_SUCCESS]: updatePlayGroupSuccess,
  [Types.UPDATE_PLAY_GROUP_FAILED]: updatePlayGroupFailed,

  [Types.DELETE_GROUP_STUDIO]: deleteGroupStudio,
  [Types.DELETE_GROUP_STUDIO_SUCCESS]: deleteGroupStudioSuccess,
  [Types.DELETE_GROUP_STUDIO_FAILED]: deleteGroupStudioFailed,
};

// Create reducers by pass state and handlers
export const myReducer = createReducer(INITIAL_STATE, HANDLERS);
