import cn from 'classnames';
import type CheckboxProps from './types';
import { ReactComponent as CheckIcon } from '@assets/icons/check.svg';

const Checkbox = ({
  id,
  value,
  children,
  className: cls,
  ...attrs
}: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={cn(cls, 'flex items-baseline space-x-step-2')}
    >
      <input
        id={id}
        value={value}
        type="checkbox"
        className="sr-only peer"
        {...attrs}
      />
      <span className="text-base-b peer-disabled:cursor-not-allowed">
        {children}
      </span>
      <span
        className="inline-flex items-center justify-center size-middle bg-white bordered 
        text-white rounded-small cursor-pointer 
        peer-disabled:disabled-control peer-focus-visible:focused
        peer-checked:*:visible peer-checked:bg-primary peer-checked:border-primary"
      >
        <CheckIcon className="w-step-2 invisible" />
      </span>
    </label>
  );
};
export default Checkbox;
