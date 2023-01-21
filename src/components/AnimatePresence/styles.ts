import styled, {Keyframes} from 'styled-components';
import {AnimatePresenceComponentProps} from '.';

type IAnimationPresenceContainerProps = Omit<
  Required<AnimatePresenceComponentProps['animationOptions']> & {
    animationKeyframes: Keyframes;
  },
  'animationType'
>;

export const Container = styled.div<IAnimationPresenceContainerProps>`
  display: flex;
  width: 100%;

  overflow: hidden;

  .animation-presence__wrapper {
    width: 100%;
    animation-name: ${(props) => props.animationKeyframes};
    animation-duration: ${(props) => props.animationDuration};
    animation-timing-function: ${(props) => props.animationTimingFunction};
  }
`;
