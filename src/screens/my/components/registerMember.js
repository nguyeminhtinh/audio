// @flow
import React from 'react';
import images from 'themes/images';

type Props = {
  title: string,
  titleButton: string,
  backgroundColor: any,
  contentLeft: string,
  btnColor: string,
  image: string,
};

const RegisterMember = ({
  title,
  titleButton,
  backgroundColor,
  contentLeft,
  btnColor,
  image,
}: Props) => {
  return (
    <>
      <img className="member__character3" src={images.character03} alt="" />
      <div
        className="member__content"
        style={{ backgroundColor: `${backgroundColor}` }}
      >
        <div className="member__content__title">{title}</div>
        <div className="member__content__text">
          <p>
            {contentLeft}
            <span className="line-through light">W9,900 </span>
            <span>&gt; </span>
            <span className="line-through">W</span>
            <span className="text-bold">7,500</span>&#41;제공!
          </p>
        </div>
        <div className="member__content__button">
          <p style={{ color: `${btnColor}` }}>{titleButton}</p>
          {image === 'yellow' && <img src={images.icon_next_yellow} alt="" />}
          {image === 'blue' && <img src={images.icon_next_blue} alt="" />}
        </div>
      </div>
    </>
  );
};

export default RegisterMember;
