import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import type { DropdownProps, DropdownItem } from './types';

const Dropdown = ({
  items,
  defaultValue,
  className: cls,
  onChange,
  ...attrs
}: DropdownProps) => {
  const getItem = (value: DropdownItem['value']) =>
    normalizedItems.find(({ value: val }) => value === val) || null;
  const getOptionSelCls = (value: DropdownItem['value']) =>
    selected?.value === value ? 'text-black' : 'text-quiet';

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // make all items got values
  const normalizedItems = useMemo(
    () =>
      items.map(({ label, value = label }) => ({
        label,
        value,
      })),
    [items],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(
    getItem(defaultValue),
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const item = getItem(value);
    if (item) {
      handleOptionClick(item);
    }
  };
  const handleOptionClick = (item: DropdownItem) => {
    setSelected(item);
    setIsOpen(false);
    onChange?.(item.value!);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn(
        cls,
        `relative bg-white text-sm-b padded-1-2 bordered rounded-small cursor-pointer
        focus-within:focused has-[select:disabled]:disabled-control`,
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <select
        className="sr-only peer"
        value={selected?.value}
        onChange={handleSelectChanged}
        {...attrs}
      >
        {normalizedItems.map(({ label, value }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span className="text-quiet">{selected?.label || 'no set'}</span>
      <ArrowIcon
        className={cn(
          { 'rotate-180': isOpen },
          'absolute w-[0.88rem] top-1/2 -translate-y-1/2 right-step-2 text-black peer-disabled:text-outline',
        )}
      />
      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-px w-full space-y-step-half padded-2 bg-white bordered rounded-small">
          {normalizedItems.map(({ label, value }, i) => (
            <li
              key={i}
              className={cn(
                getOptionSelCls(value),
                'text-sm-b cursor-pointer hover:text-black',
              )}
              onClick={() => handleOptionClick({ label, value })}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
