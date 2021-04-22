/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
const createClassInputName = (value) => {
  let className = '';
  switch (value.length) {
    case 0:
      return (className = 'pl0');
    case 1:
      return (className = 'pl1');
    case 2:
      return (className = 'pl2');
    case 3:
      return (className = 'pl3');
    case 4:
      return (className = 'pl4');
    case 5:
      return (className = 'pl5');
    case 6:
      return (className = 'pl6');
    default:
      return (className = 'pl7');
  }
};

export default createClassInputName;
