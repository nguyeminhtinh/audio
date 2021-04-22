// @flow
// libs
import React from 'react';
import Lottie from 'react-lottie';
import loading from '../../assets/json/loading.json';

const iconLoading = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const Loading = () => (
  <div className="icon-loading">
    <Lottie options={iconLoading} isStopped={false} isPaused={false} />
  </div>
);

export default Loading;
