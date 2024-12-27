import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import TitleBox from '@ui/TitleBox';
import { ReactComponent as CrossIcon } from '@assets/icons/cross.svg';
import { NotificationType, type ModalProps } from './types';

const Modal = ({
  title,
  opened,
  type = NotificationType.default,
  veil = true,
  closable = true,
  closeByOutsideClick = false,
  onClose,
  children,
  className: cls,
  ...attrs
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const close = useCallback(() => {
    setIsOpened(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (opened !== undefined) {
      setIsOpened(opened);
    }
  }, [opened]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (closable && closeByOutsideClick) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closable, closeByOutsideClick, close]);

  let cardType: string;
  switch (type) {
    case NotificationType.success:
      cardType = 'card-accent';
      break;
    case NotificationType.error:
      cardType = 'card-danger';
      break;
    case NotificationType.default:
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
        ref={modalRef}
        className={cn(
          cardType,
          'absolute start-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34.25rem]',
        )}
      >
        <div className="flex items-start space-x-step-1">
          <div className="flex-auto">
            <TitleBox level={3} className="flex-auto">
              {title}
            </TitleBox>
            <div>{children}</div>
          </div>
          {closable && (
            <button className="flex-none" onClick={close}>
              <CrossIcon className="w-[2.75rem]" />
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
export default Modal;
