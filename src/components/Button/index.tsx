import {ButtonHTMLAttributes} from 'react';
import {ButtonContainer, ButtonVariants} from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: ButtonVariants;
}

export function Button({text, variant = 'primary', ...props}: ButtonProps) {
  return (
    <ButtonContainer variant={variant} {...props}>
      {text}
    </ButtonContainer>
  );
}
