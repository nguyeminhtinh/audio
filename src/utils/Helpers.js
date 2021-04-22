// eslint-disable-next-line import/prefer-default-export
/* eslint-disable no-plusplus */
import IMAGES from 'themes/images';

export function isNumberKey(e) {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
    return false;
  }
  return true;
}

export function isOnPasteNumber(e) {
  const pastedData = e.clipboardData.getData('text/plain');
  const regex = /[0-9]/;
  if (!regex.test(pastedData)) {
    e.preventDefault();
    return false;
  }
  return true;
}

export const formatValue = (value: any) => {
  let mask = '';
  switch (value?.length) {
    case 10:
      mask = 'XXX-XXX-XXXX';
      break;
    case 11:
      mask = 'XXX-XXXX-XXXX';
      break;
    default:
      mask = 'XXX-XXXXXX-XXXXXX';
      break;
  }
  const s = `${value}`;
  let r = '';
  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask[im] === 'X' ? s.charAt(is++) : mask.charAt(im);
  }
  return r;
};

export const renderNameAge = (value: any) => {
  let name = '';
  switch (value) {
    case null:
      name = '전체';
      break;
    case 1:
      name = '베이비(1-3세)';
      break;
    case 4:
      name = '프리스쿨(4-6세)';
      break;
    case 7:
      name = '스쿨1(7-9세)';
      break;
    case 10:
      name = '스쿨2(10-13세)';
      break;
    default:
      break;
  }
  return name;
};

export const renderTabSchool = (value: any) => {
  let name = '';
  switch (value) {
    case 'baby':
      name = '베이비';
      break;
    case 'freeSchool':
      name = '프리스쿨';
      break;
    case 'school1':
      name = '스쿨1';
      break;
    case 'school2':
      name = '스쿨2';
      break;
    default:
      break;
  }
  return name;
};

export const renderTabActiveSchool = (value: any) => {
  let name = '';
  switch (value) {
    case 1:
      name = 'baby';
      break;
    case 2:
      name = 'freeSchool';
      break;
    case 3:
      name = 'school1';
      break;
    case 4:
      name = 'school2';
      break;
    default:
      break;
  }
  return name;
};

export const checkPlatform = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const checker = {
    iphone:
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document),
    android: userAgent.match(/Android/),
  };
  return checker;
};

// show music player
export const toDoShowMusicPlayer = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoShowMusicPlayer();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoShowMusicPlayer';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// set data sound
export const toDoSetMusicList = (data) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoSetMusicList(data);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoSetMusicList';
    bridgeParam.param = data;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// play sound
export const toDoAudioPlay = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoAudioPlay();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoAudioPlay';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// convert time
export const convertTime = (value: any) => {
  const hours = Math.floor(value / 3600);
  const minute = Math.floor(value / 60) % 60;
  const seconds = Math.floor(value % 60);
  return `${hours >= 10 ? hours : `0${hours || 0}`}:${
    minute >= 10 ? minute : `0${minute || 0}`
  }:${seconds >= 10 ? seconds : `0${seconds || 0}`}`;
};

export const toDoHideMusicPlayer = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoHideMusicPlayer();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoHideMusicPlayer';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoExternal = (url, externalYn, subViewYn, header) => {
  const jsonObj = {};
  jsonObj.url = encodeURIComponent(url.trim());
  if (externalYn === 'Y') {
    jsonObj.isExternal = true;
  } else {
    jsonObj.isExternal = false;
  }
  if (subViewYn === 'Y') {
    jsonObj.subViewYn = true;
  } else {
    jsonObj.subViewYn = false;
  }

  if (header !== undefined) {
    const headerList = [];
    for (let i = 0; i < header.length; i++) {
      let headerObj = [];
      headerObj = header[i];
      headerList.push(headerObj);
    }

    jsonObj.header = headerList;
  }

  const jsonData = JSON.stringify(jsonObj);
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoLoadUrl(jsonData);
  } else if (currentOS.iphone) {
    window.location = `ios://toDoLoadUrl?${jsonData}`;
  }
  return true;
};

export const toDoBackKey = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoBackKey();
  } else if (currentOS.iphone) {
    window.location = 'ios://toDoBackKey2';
  }
  return true;
};

export const renderAvatar = (value: any) => {
  let name = '';
  switch (value) {
    case 1:
      name = IMAGES.icon_strawberry;
      break;
    case 2:
      name = IMAGES.icon_water;
      break;
    case 3:
      name = IMAGES.icon_orange;
      break;
    case 4:
      name = IMAGES.icon_grape;
      break;
    case 5:
      name = IMAGES.icon_banana;
      break;
    case 6:
      name = IMAGES.profile_01;
      break;
    case 7:
      name = IMAGES.profile_02;
      break;
    case 8:
      name = IMAGES.profile_03;
      break;
    case 9:
      name = IMAGES.profile_04;
      break;
    case 10:
      name = IMAGES.profile_05;
      break;
    case 11:
      name = IMAGES.profile_06;
      break;
    case 12:
      name = IMAGES.profile_07;
      break;
    case 13:
      name = IMAGES.profile_08;
      break;
    case 14:
      name = IMAGES.profile_09;
      break;
    default:
      break;
  }
  return name;
};

export const getValue = (array) => {
  const newArr = [];
  let arrDefault = [];
  let arrBanner = [];
  let j = 0;
  for (let i = 0; i < array?.length; i++) {
    if (array[i].flowType === 'DEFAULT') {
      arrDefault = array[i] && array[i];
      newArr.push(arrDefault);
      arrDefault = [];

      if (array[i + 1] && array[i + 1].flowType === 'BANNER') {
        arrBanner = [];
        j = 0;
      }
    }
    if (array[i].flowType === 'BANNER') {
      arrBanner.push(array[i]);
      j++;
      if (array[i + 1] && array[i + 1].flowType === 'DEFAULT') {
        j = 0;
      }

      if (i === array.length - 1) {
        j = 0;
      }
      if (j === 0) {
        newArr.push(arrBanner);
        arrBanner = [];
      }
    }
  }
  return newArr;
};

export const toDoAudioStop = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoAudioStop();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoHideMusicPlayer';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// set jwt
export const setJwtToken = (jwtToken) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.setJwtToken(jwtToken);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'setJwtToken';
    bridgeParam.param = jwtToken;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// set studio music
export const toDoSetStudioMusicList = (studioBookIds) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoSetStudioMusicList(JSON.stringify(studioBookIds));
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoSetStudioMusicList';
    bridgeParam.param = studioBookIds;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// set music group
export const toDoSetMusicGroup = (data) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoSetMusicGroup(data);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoSetMusicGroup';
    bridgeParam.param = data;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// logout
export const fnLogOut = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.logOut();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'logOut';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// start record
export const toDoStartRecord = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoStartRecord();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoStartRecord';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// pause record
export const toDoPauseRecord = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoPauseRecord();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoPauseRecord';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// stop record
export const toDoStopRecord = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoStopRecord();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoStopRecord';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

// stop record
export const toDoUploadRecord = (dataRecord) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoUploadRecord(dataRecord);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoUploadRecord';
    bridgeParam.param = dataRecord;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoCheckRecordAuth = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoCheckRecordAuth();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoCheckRecordAuth';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoAuthCheckPopup = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoAuthCheckPopup();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoAuthCheckPopup';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoPurchase = (dataPurchase) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoPurchase(dataPurchase);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoPurchase';
    bridgeParam.param = dataPurchase;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoPlayVideo = (status) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoPlayVideo(status);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoPlayVideo';
    bridgeParam.param = status;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const sendStatusWiFi = (status) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.sendStatusWiFi(status);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'sendStatusWiFi';
    bridgeParam.param = status;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoSetLike = (status, id) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoSetLike(status, id);
  } else if (currentOS.iphone) {
    const bridgeParam = {
      status,
      id,
    };
    bridgeParam.action = 'toDoSetLike';
    bridgeParam.param = JSON.stringify(bridgeParam);
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoGetCurrentAudio = (id) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoGetCurrentAudio(id);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoGetCurrentAudio';
    bridgeParam.param = id;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const todoLogout = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.todoLogout();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'todoLogout';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoShowGNB = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoShowGNB();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoShowGNB';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoHideGNB = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoHideGNB();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoHideGNB';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoOpenUrl = (url) => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoOpenUrl(url);
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoOpenUrl';
    bridgeParam.param = url;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const loginKakao = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.loginKakao();
  } else if (currentOS.iphone) {
    window.webkit.messageHandlers.loginKakao.postMessage('');
  }
};

export const toDoVersionInfo = () => {
  const currentOS = checkPlatform();
  if (currentOS.android) {
    window.android.toDoVersionInfo();
  } else if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoVersionInfo';
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};

export const toDoShowPayment = (isStatus) => {
  const currentOS = checkPlatform();
  if (currentOS.iphone) {
    const bridgeParam = {};
    bridgeParam.action = 'toDoShowPayment';
    bridgeParam.param = isStatus;
    window.webkit.messageHandlers.LoungeBridge.postMessage(bridgeParam);
  }
};
