// eslint-disable-next-line import/prefer-default-export
export const getDataInputName = (input) => {
  const reg = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ.,`~+=<>_!:|;"'@#$%^&*?/|{}]/g;
  let result = '';
  const arr = input.split('');
  arr.forEach((item) => {
    if (!reg.test(item)) {
      result += item;
    }
  });
  return result;
};

export const checkValidateEmailCharacter = (text) => {
  let max = '40';
  if (text.length >= 21) {
    if (text.includes('@')) {
      max = '40';
    } else max = '20';
  }
  return max;
};
