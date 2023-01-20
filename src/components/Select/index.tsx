import {useEffect, useRef, useState} from 'react';
import arrowDown from '@/assets/arrow-down.svg';
import useClickOutside from '@/hooks/useClickOutside';
import useDisclosure from '@/hooks/useDisclosure';
import {classNames} from '@/utils/classNames';
import {Container} from './styles';

interface Option<T = any> {
  label: string;
  value: T;
}

type Position = 'top' | 'bottom';

interface SelectProps {
  value?: Option;
  onChange?: (data: Option) => void;
  options?: Option[];
  labelText?: string;
  helperText?: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export function Select({
  value,
  onChange,
  options,
  labelText,
  error,
  helperText,
  success,
  disabled,
}: SelectProps) {
  const {isOpen, toggle, close} = useDisclosure();
  const [position, setPosition] = useState<Position>('bottom');
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, close);

  useEffect(() => {
    if (isOpen && dropdownRef.current && inputRef.current) {
      const {height} = dropdownRef.current.getBoundingClientRect();
      const inputRect = inputRef.current.getBoundingClientRect();
      const topY = height + height * 0.1 + inputRect.height + 5 + inputRect.y;

      if (topY < window.innerHeight) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }

    window.addEventListener(
      'scroll',
      () => {
        if (isOpen) {
          close();
        }
      },
      {passive: true},
    );

    return () =>
      window.removeEventListener('scroll', () => {
        if (isOpen) {
          close();
        }
      });
  }, [isOpen]);

  function handleClick(opt: Option) {
    onChange && onChange(opt);
    close();
  }

  return (
    <Container
      className={classNames('select', {
        '--success': success,
        '--error': error,
        '--disabled': disabled,
      })}
    >
      {labelText && (
        <div className="select__label-wrapper">
          <label className="label-wrapper__label">{labelText}</label>
        </div>
      )}
      <div className="select__input-wrapper" ref={wrapperRef}>
        <div className="input-wrapper__input" onClick={toggle} ref={inputRef}>
          <span
            className={classNames('input__value', {
              '--placeholder': !value,
            })}
          >
            {value ? value.label : 'Selecione...'}
          </span>
          <img
            src={arrowDown}
            className={classNames('input__arrow', {
              '--rotate': isOpen,
            })}
          />
        </div>
        <ul
          className={classNames(`input-wrapper__select-options --${position}`, {
            '--is-open': isOpen,
          })}
          ref={dropdownRef}
        >
          {options && options.length > 0 ? (
            options.map((opt, index) => (
              <li
                key={index}
                className="select-options__option"
                onClick={() => handleClick(opt)}
              >
                <span className="option__label">{opt.label}</span>
              </li>
            ))
          ) : (
            <li className="select-options__option --no-options">
              Nenhuma opção
            </li>
          )}
        </ul>
      </div>
      {helperText && <span className="select__helper-text">{helperText}</span>}
    </Container>
  );
}
