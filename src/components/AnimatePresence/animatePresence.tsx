import React from 'react';
import AnimatePresenceComponent from './AnimatePresenceComponent';
import {AnimatePresenceComponentProps} from '.';
import {NavigateProps} from 'react-router-dom';

function animatePresence(
  AnimationTarget: React.FC | any,
  options?: AnimatePresenceComponentProps['animationOptions'],
) {
  return function AnimatePresence({...props}) {
    return (
      <AnimatePresenceComponent animationOptions={options}>
        <AnimationTarget {...props} />
      </AnimatePresenceComponent>
    );
  };
}

export {animatePresence};
