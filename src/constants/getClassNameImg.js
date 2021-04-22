// eslint-disable-next-line import/prefer-default-export
export const getClassName = (number) => {
  let classNames = 'strawberry__listAudio__items__left';

  switch (number) {
    case 1:
      classNames = 'strawberry__listAudio__items__left';
      break;
    case 2:
      classNames = 'strawberry__listAudio__items__left items-left2';
      break;
    case 3:
      classNames = 'strawberry__listAudio__items__left items-left3';
      break;

    default:
      classNames = 'strawberry__listAudio__items__left items-left4';
      break;
  }

  return classNames;
};
