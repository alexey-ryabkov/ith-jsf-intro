import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ReactComponent as CrossIcon } from '@assets/icons/cross.svg';
import TitleBox from '@ui/TitleBox';
import type ModalProps from './types';

const Modal = ({
  title,
  opened,
  type = 'default',
  closable = true,
  veil = true,
  children,
  className: cls,
  ...attrs
}: ModalProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (opened !== undefined) {
      setIsOpened(opened);
    }
  }, [opened]);

  let cardType: string;
  switch (type) {
    case 'success':
      cardType = 'card-accent';
      break;
    case 'error':
      cardType = 'card-danger';
      break;
    case 'default':
    default:
      cardType = 'card';
      break;
  }

  return isOpened ? (
    <div
      className={cn(cls, 'fixed inset-0 z-10', { veil }, { hidden: !isOpened })}
      {...attrs}
    >
      <div
        className={cn(
          cardType,
          'absolute start-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34.25rem]',
        )}
      >
        <div className="flex items-start space-x-step-1">
          <div>
            <TitleBox level={3} className="flex-auto">
              {title}
            </TitleBox>
            <div>{children}</div>
          </div>
          {closable && (
            <button className="flex-none" onClick={() => setIsOpened(false)}>
              <CrossIcon className="w-[2.75rem]" />
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
export default Modal;
