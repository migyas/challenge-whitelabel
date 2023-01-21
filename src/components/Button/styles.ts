import styled, {css} from 'styled-components';

export type ButtonVariants = 'primary' | 'outlined';

interface VariantProps {
  variant: ButtonVariants;
}

export const ButtonContainer = styled.button<VariantProps>`
  height: 45px;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  font-size: 1.063rem;
  margin-top: 3rem;
  gap: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  padding: 1rem;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background: ${(props) => props.theme['blue-500']};
      color: ${(props) => props.theme['white']};

      &:hover {
        background: ${(props) => props.theme['blue-700']};
      }
    `}

  ${(props) =>
    props.variant === 'outlined' &&
    css`
      background: transparent;
      border: 1px solid ${(props) => props.theme['gray-100']};
      color: ${(props) => props.theme['green-700']};

      &:hover {
        background: ${(props) => props.theme['blue-700']};
        color: ${(props) => props.theme['white']};
      }
    `}
`;
