import {easeInOutQuartic} from '@/config/customAnimation';
import styled from 'styled-components';

interface ModalContainerProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
}

export const Container = styled.div<ModalContainerProps>`
  width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  z-index: ${(props) => props.theme.zIndexes.modal};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
  pointer-events: none;

  .modal__overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #00000066;
    z-index: ${(props) => props.theme.zIndexes.hide};
  }

  .modal__content {
    height: 100%;
    width: 100%;
    background-color: transparent;
    transition: all 0.3s ${easeInOutQuartic};
    padding-top: 58px;
    margin: 3.75rem 0;

    .content__header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-radius: 5px 5px 0 0;
      background-color: #fff;
      border-top: 8px solid ${(props) => props.theme['green-300']};
      position: relative;
      padding: 1rem;

      .header__icon {
        width: 80px;
        height: 80px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: calc(-42px - 4px);
        transform: translateX(-50%);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          font-size: 2.5rem;
          color: ${(props) => props.theme['green-300']};
        }

        &::before {
          content: '';
          background-color: #0fc2c010;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: ${(props) => props.theme.zIndexes.hide};
        }
      }

      button {
        display: flex;
        padding: 5px;
        border-radius: 5px;
        transition: all 0.3s;
        cursor: pointer;
        background-color: transparent;
        border: 0;

        &:hover {
          color: ${(props) => props.theme['red-500']};
        }
      }
    }

    .content__body {
      background-color: #fff;
    }

    .content__footer {
      background-color: #fff;
      border-radius: 0 0 5px 5px;
      display: flex;

      & > * {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .blank-footer {
      height: 56px;
      background-color: #fff;
      border-radius: 0 0 5px 5px;
      border-top: 1px solid #dedede;
    }

    ${(props) => {
      switch (props.size) {
        case 'sm':
          return `
            max-width: 386px;
          `;

        case 'md':
          return `
            max-width: 500px;
          `;

        case 'lg':
          return `
            max-width: 800px;
          `;

        case 'xl':
          return `
            max-width: 1140px;
          `;
      }
    }}
  }

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
`;
