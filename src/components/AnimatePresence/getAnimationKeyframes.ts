import {Keyframes, keyframes} from 'styled-components';
import {Animation} from '.';

const getAnimationKeyframes = (animationType: Animation): Keyframes => {
  switch (animationType) {
    case 'slideUp':
      return keyframes`
        from {
          opacity: 0;
          transform: translateY(3%);
        } to {
          opacity: 1;
          transform: translateY(0%);
        }
      `;
    case 'slideDown':
      return keyframes`
        from {
          opacity: 0;
          transform: translateY(-3%);
        } to {
          opacity: 1;
          transform: translateY(0%);
        }
      `;
    case 'slideLeft':
      return keyframes`
        from {
          opacity: 0;
          transform: translateX(3%);
        } to {
          opacity: 1;
          transform: translateX(0%);
        }
      `;
    case 'slideRight':
      return keyframes`
        from {
          opacity: 0;
          transform: translateX(-3%);
        } to {
          opacity: 1;
          transform: translateX(0%);
        }
      `;
    case 'scaleIn':
      return keyframes`
        from {
          opacity: 0;
          transform: scale(0.98);
        } to {
          opacity: 1;
          transform: scale(1);
        }
      `;
    case 'scaleOut':
      return keyframes`
        from {
          opacity: 0;
          transform: scale(1.02);
        } to {
          opacity: 1;
          transform: scale(1);
        }
      `;
    default:
      return keyframes`
        from {
          opacity: 0;
          
        } to {
          opacity: 1;
          
        }
      `;
  }
};

export default getAnimationKeyframes;
