import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ReactComponent as CheckIcon } from '@assets/icons/check.svg';
import type CheckboxProps from './types';

const Checkbox = ({
  id,
  value = false,
  onChange,
  children,
  className: cls,
  ...attrs
}: CheckboxProps) => {
  const [checked, setChecked] = useState(value);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <label className={cn(cls, 'flex items-baseline space-x-step-2')}>
      <input
        checked={checked}
        type="checkbox"
        className="sr-only peer"
        onChange={(e) => {
          const value = e.target.checked;
          setChecked(value);
          onChange?.(value);
        }}
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
