import {animatePresence} from './animatePresence';
import AnimatePresenceComponent from './AnimatePresenceComponent';
import getAnimationKeyframes from './getAnimationKeyframes';

export enum AnimationTypes {
  'slideLeft',
  'slideRight',
  'slideDown',
  'slideUp',
  'scaleIn',
  'scaleOut',
  'onlyFadeIn',
}

export type Animation = keyof typeof AnimationTypes;

export type AnimationTimingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out';

export interface AnimatePresenceComponentProps {
  className?: string;
  animationOptions?: {
    animationType?: Animation;
    animationTimingFunction?: AnimationTimingFunction;
    animationDuration?: string;
  };
}

export {animatePresence, AnimatePresenceComponent, getAnimationKeyframes};

export default animatePresence;
