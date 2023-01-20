import {HTMLAttributes} from 'react';

export default function ModalFooterBlank({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className="blank-footer" {...props} />;
}
