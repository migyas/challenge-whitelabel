import {motion, AnimatePresence} from 'framer-motion';
import {useEffect} from 'react';
import {classNames} from '@/utils/classNames';
import {Container} from './styles';
import {X} from 'phosphor-react';

export default function Modal({
  isOpen,
  toggle,
  children,
  size = 'md',
  allowOverflow,
  headerIcon: HeaderIcon,
}: {
  headerIcon?: JSX.Element;
  isOpen?: boolean;
  allowOverflow?: boolean;
  toggle?: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  if (!['sm', 'md', 'lg', 'xl'].includes(size)) {
    size = 'md';
  }

  useEffect(() => {
    if (allowOverflow) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, allowOverflow]);

  return (
    <Container
      className={classNames({
        show: isOpen,
      })}
      size={size}
    >
      <div className="modal__overlay" onClick={() => toggle && toggle()}></div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal__content"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
              duration: 0.1,
            }}
          >
            <header className="content__header">
              {HeaderIcon && <div className="header__icon">{HeaderIcon}</div>}
              <button onClick={() => toggle && toggle()}>
                <X size={22} />
              </button>
            </header>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
