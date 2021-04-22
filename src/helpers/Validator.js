/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
// @flow
import REGEX from '../constants/regex';
import ERROR_MESSAGE from '../constants/errorMsg';

// eslint-disable-next-line import/prefer-default-export
export const Validator = (objectVal: Object, validate: Object) => {
  const error = {};
  const keys = Object.keys(objectVal);

  for (let i = 0, { length } = keys; i < length; i += 1) {
    const key = keys[i];
    const rules = validate[key];
    const value = objectVal[key];
    let errorMsg = '';

    for (let j = 0; j < rules.length; j += 1) {
      switch (rules[j]) {
        case 'email':
          if (!REGEX.EMAIL.test(value)) {
            errorMsg = ERROR_MESSAGE.EMAIL;
          }
          break;
        case 'userIdRequired':
          if (value === '' || value === null || value === undefined) {
            errorMsg = ERROR_MESSAGE.ID_REQUIRED;
          }
          break;
        case 'passwordRequired':
          if (value === '' || value === null || value === undefined) {
            errorMsg = ERROR_MESSAGE.PASSWORD_REQUIRED;
          }
          break;
        case 'id':
          if (!REGEX.USER_ID.test(value)) {
            errorMsg = ERROR_MESSAGE.USER_ID;
          }
          break;
        case 'password':
          if (!REGEX.PASSWORD.test(value)) {
            errorMsg = ERROR_MESSAGE.PASSWORD_FORMAT;
          }
          break;
        default:
          break;
      }
      if (errorMsg) {
        error[key] = errorMsg;
      }
    }
  }

  return error;
};
