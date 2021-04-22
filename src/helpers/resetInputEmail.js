// eslint-disable-next-line import/prefer-default-export
export const resetInputEmail = (text) => {
  const arr = text.split('');
  const result = arr.filter((item) => item !== '+');
  return result.join('');
};
