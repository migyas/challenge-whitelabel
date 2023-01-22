import {forwardRef, HTMLProps, useEffect} from 'react';
import {FieldValues, UseFormSetValue} from 'react-hook-form';
import {classNames} from '@/utils/classNames';
import {mask} from '@/utils/remask';
import {InputContainer} from './styles';

interface InputProps extends HTMLProps<HTMLInputElement> {
  labelText?: string;
  helperText?: string;
  mask?: string;
  success?: boolean;
  error?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {labelText, helperText, mask: _mask, success, error, setValue, ...props},
  ref,
): JSX.Element {
  useEffect(() => {
    if (setValue) {
      setValue(props.name as string, (props.value as string) || '');
    }
  }, [props.value]);

  return (
    <InputContainer
      className={classNames('custom-input', {
        '--success': success,
        '--error': error,
      })}
    >
      <label className="custom-input__label" htmlFor={props.name}>
        {labelText}
      </label>
      <div className="custom-input__wrapper">
        <input
          {...props}
          id={props.name}
          type={props.type}
          ref={ref}
          style={{}}
          onChange={(e) => {
            setValue && _mask
              ? setValue(props.name as string, mask(e.target.value, _mask))
              : setValue && setValue(props.name as string, e.target.value);
          }}
        />
      </div>
      {helperText && (
        <span className="custom-input__helper-text">{helperText}</span>
      )}
    </InputContainer>
  );
});

export default Input;
