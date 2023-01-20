import {HTMLAttributes} from 'react';

export default function ModalFooter({
  children,
  ...props
}: {children: React.ReactNode} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="content__footer" {...props}>
      {children}
    </div>
  );
}
