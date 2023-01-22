import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .select__label-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;

    .label-wrapper__label {
      font-size: 0.875rem;
      color: ${(props) => props.theme['gray-800']};
    }
  }

  .select__input-wrapper {
    width: 100%;
    position: relative;
    color: ${(props) => props.theme['gray-700']};

    .input-wrapper__input {
      width: 100%;
      min-height: 41px;
      font-size: 0.875rem;
      outline: none;
      transition: all 0.3s;
      background: none;
      border: 1px solid ${(props) => props.theme['gray-100']};
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      cursor: default;

      .input__value.--placeholder {
        color: #3c3c3c;
      }

      &.--disabled {
        cursor: default;
        opacity: 0.7;
      }

      .input__arrow {
        transform: rotate(0deg);
        transition: transform 0.3s;
        margin-left: 10px;
        min-width: 16px;

        &.--rotate {
          transform: rotate(-180deg);
        }
      }
    }

    .input-wrapper__select-options {
      width: 100%;
      position: absolute;
      background-color: #fff;
      border-radius: 5px;
      list-style: none;
      z-index: ${(props) => props.theme.zIndexes.popover};
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      transform: scaleY(0.9);
      box-shadow: 0 0 10px 0px #0000001a;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      overflow: hidden;

      .select-options__option {
        width: 100%;
        padding: 0.875rem;
        cursor: pointer;
        background-color: #fff;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${(props) => props.theme['gray-800']};
        font-size: 0.875rem;

        &:hover {
          background-color: ${(props) => props.theme['gray-100']};
        }

        &.--no-options {
          cursor: default;
          justify-content: center;
          color: ${(props) => props.theme['bg-sidebar-default']};

          &:hover {
            background-color: #fff;
          }
        }
      }

      &.--top {
        bottom: calc(100% + 5px);
        left: 0;
        transform-origin: bottom;
      }

      &.--bottom {
        top: calc(100% + 5px);
        left: 0;
        transform-origin: top;
      }

      &.--is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: scaleY(1);
      }
    }
  }

  .select__helper-text {
    font-size: 0.75rem;
    margin-top: 7px;
  }

  &.--success {
    .select__helper-text {
      color: ${(props) => props.theme['yellow-500']};
    }

    .select__input {
      border-color: ${(props) => props.theme['yellow-500']};
    }
  }

  &.--error {
    .select__helper-text {
      color: ${(props) => props.theme['red-500']};
    }

    .input-wrapper__input {
      border-color: ${(props) => props.theme['red-500']};
    }
  }
`;
