import {X} from 'phosphor-react';
import {ToastContentProps} from 'react-toastify';

type Colors = 'success' | 'error';

interface ToastAlertProps {
  color?: Colors;
  message?: string;
}

export default function ToastAlert({
  closeToast,
  data,
}: Partial<ToastContentProps<ToastAlertProps>>) {
  if (!data?.color) {
    data = {
      ...data,
      color: 'success',
    };
  }

  return (
    <div className={`custom-toast__body --${data?.color}`}>
      <div className="body__info-icon">
        <span
          className="info-icon__message"
          dangerouslySetInnerHTML={{__html: data?.message || ''}}
        ></span>
      </div>
      <button className="body__close-button" onClick={closeToast}>
        <X />
      </button>
    </div>
  );
}
