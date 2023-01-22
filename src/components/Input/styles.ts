import styled from 'styled-components';
import {easeInOutQuartic} from '@/config/customAnimation';

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: max-content;
  transition: all 0.3s ${easeInOutQuartic};
  flex-direction: column;
  border: 0;

  .custom-input__label {
    margin-bottom: 5px;
    font-size: 0.875rem;
    color: ${(props) => props.theme['gray-700']};
  }

  .custom-input__helper-text {
    font-size: 0.75rem;
  }

  .custom-input__wrapper {
    position: relative;
    display: flex;
    border: 1px solid ${(props) => props.theme['gray-100']};
    border-radius: 5px;
    align-items: center;
    width: 100%;

    > svg {
      min-width: 16px;
      color: ${(props) => props.theme['gray-900']};
      margin: 10px;

      &:first-child {
        margin-right: 0;
      }
      &:last-child {
        margin-left: 0;
      }
    }

    input {
      width: 100%;
      min-height: 45px;
      font-size: 1rem;
      outline: none;
      border: 0;
      transition: all 0.3s;
      background: none;
      padding: 0 10px;
      border-radius: 5px;

      &::placeholder {
        color: #c2c2c2;
        font-weight: 300;
      }
    }
  }

  &.--success {
    .custom-input__helper-text {
      color: ${(props) => props.theme['green-300']};
    }

    .custom-input__wrapper {
      border-color: ${(props) => props.theme['green-300']} !important;
    }
  }

  &.--error {
    .custom-input__helper-text {
      color: ${(props) => props.theme['red-500']};
    }

    .custom-input__wrapper {
      border-color: ${(props) => props.theme['red-500']} !important;
    }
  }
`;
