// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  signIn: ['user'],
  signInSuccess: null,
  signInFailed: null,

  signUp: ['user'],
  signUpSuccess: null,
  signUpFailed: null,

  checkEmail: ['email'],
  checkEmailSuccess: null,
  checkEmailFailed: null,

  signInFacebook: ['data'],
  signInFacebookSuccess: null,
  signInFacebookFailed: null,

  signInKakao: ['data'],
  signInKakaoSuccess: null,
  signInKakaoFailed: null,

  signInNaver: ['data'],
  signInNaverSuccess: null,
  signInNaverFailed: null,

  findPassword: ['data'],
  findPasswordSuccess: null,
  findPasswordFailed: null,

  signInApple: ['data'],
  signInAppleSuccess: null,
  signInAppleFailed: null,

  checkUserSnsLogin: ['data'],
  checkUserSnsLoginSuccess: null,
  checkUserSnsLoginFailed: null,

  resetData: null,

  getTypeLogin: ['data'],
});

// Initial state
export const INITIAL_STATE = Immutable({
  userInfo: {},
  isProcessing: false,
  seqNo: '',
  codeCheckEmail: '',
  codeSignIn: '',
  typeLogin: '',
  codeFindPass: '',
  statusCheck: '',
});

const signIn = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
    errorServer: {},
  });
};

const signInSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    seqNo: action.data.body,
    codeSignIn: action.data.code,
  });
};

const signInFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const signUp = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const signUpSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    seqNo: action.data.body,
    codeSignIn: action.data.code,
  });
};

const signUpFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const checkEmail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const checkEmailSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    codeCheckEmail: action.data.code,
  });
};

const checkEmailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const signInFacebook = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
    errorServer: {},
  });
};

const signInFacebookSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    seqNo: action.data.body,
    codeSignIn: action.data.code,
  });
};

const signInFacebookFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const signInKakao = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
    errorServer: {},
  });
};

const signInKakaoSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    seqNo: action.data.body,
    codeSignIn: action.data.code,
  });
};

const signInKakaoFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const signInNaver = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
    errorServer: {},
  });
};

const signInNaverSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    seqNo: action.data.body,
    codeSignIn: action.data.code,
  });
};

const signInNaverFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const findPassword = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const findPasswordSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    codeFindPass: action.data.code,
  });
};

const findPasswordFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const signInApple = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: '',
    errorServer: {},
  });
};

const signInAppleSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    seqNo: action.data.body,
    codeSignIn: action.data.code,
  });
};

const signInAppleFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const checkUserSnsLogin = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
  });
};

const checkUserSnsLoginSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    statusCheck: action.data.body,
  });
};

const checkUserSnsLoginFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
  });
};

const resetData = (state) => {
  return state.merge({
    codeCheckEmail: '',
    type: '',
    codeSignIn: '',
    codeFindPass: '',
    statusCheck: '',
  });
};

const getTypeLogin = (state, action) => {
  return state.merge({
    typeLogin: action.data,
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILED]: signInFailed,

  [Types.SIGN_UP]: signUp,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILED]: signUpFailed,

  [Types.CHECK_EMAIL]: checkEmail,
  [Types.CHECK_EMAIL_SUCCESS]: checkEmailSuccess,
  [Types.CHECK_EMAIL_FAILED]: checkEmailFailed,

  [Types.SIGN_IN_FACEBOOK]: signInFacebook,
  [Types.SIGN_IN_FACEBOOK_SUCCESS]: signInFacebookSuccess,
  [Types.SIGN_IN_FACEBOOK_FAILED]: signInFacebookFailed,

  [Types.SIGN_IN_KAKAO]: signInKakao,
  [Types.SIGN_IN_KAKAO_SUCCESS]: signInKakaoSuccess,
  [Types.SIGN_IN_KAKAO_FAILED]: signInKakaoFailed,

  [Types.SIGN_IN_NAVER]: signInNaver,
  [Types.SIGN_IN_NAVER_SUCCESS]: signInNaverSuccess,
  [Types.SIGN_IN_NAVER_FAILED]: signInNaverFailed,

  [Types.FIND_PASSWORD]: findPassword,
  [Types.FIND_PASSWORD_SUCCESS]: findPasswordSuccess,
  [Types.FIND_PASSWORD_FAILED]: findPasswordFailed,

  [Types.SIGN_IN_APPLE]: signInApple,
  [Types.SIGN_IN_APPLE_SUCCESS]: signInAppleSuccess,
  [Types.SIGN_IN_APPLE_FAILED]: signInAppleFailed,

  [Types.CHECK_USER_SNS_LOGIN]: checkUserSnsLogin,
  [Types.CHECK_USER_SNS_LOGIN_SUCCESS]: checkUserSnsLoginSuccess,
  [Types.CHECK_USER_SNS_LOGIN_FAILED]: checkUserSnsLoginFailed,

  [Types.RESET_DATA]: resetData,

  [Types.GET_TYPE_LOGIN]: getTypeLogin,
};

// Create reducers by pass state and handlers
export const accountReducer = createReducer(INITIAL_STATE, HANDLERS);
