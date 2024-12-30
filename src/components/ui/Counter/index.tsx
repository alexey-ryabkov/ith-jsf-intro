import { type ChangeEvent, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { ReactComponent as MinusIcon } from '@assets/icons/minus.svg';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import type CounterProps from './types';

const BTN_CLS_UTILS = `absolute top-0 w-large aspect-square text-quiet bordered rounded-small 
  flex items-center justify-center  *:disabled:opacity-25 disabled:cursor-not-allowed`;

const Counter = ({
  min = 1,
  max = Infinity,
  defaultValue = 1,
  onChange,
  disabled,
  children,
  className: cls,
  ...attrs
}: CounterProps) => {
  const { normalizedMin, normalizedMax } = useMemo(() => {
    const isRangeInvalid = min >= max;
    return {
      normalizedMin: isRangeInvalid ? -Infinity : min,
      normalizedMax: isRangeInvalid ? Infinity : max,
    };
  }, [min, max]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [quantity, setQuantity] = useState(
    Math.min(Math.max(defaultValue, normalizedMin), normalizedMax),
  );
  const [inputValue, setInputValue] = useState(String(quantity));

  const notifyChange = (value: number) => {
    onChange?.(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value === '' || (value === '-' && normalizedMin < 0)) {
      setInputValue(value);
      return;
    }

    const numberValue = Number(value);
    if (
      !isNaN(numberValue) &&
      numberValue >= normalizedMin &&
      numberValue <= normalizedMax
    ) {
      setInputValue(value);
      setQuantity(numberValue);
      notifyChange(numberValue);
    }
  };
  const handleInputBlur = () => {
    let normalizedQuantity = quantity;
    if (inputValue === '' && normalizedMin <= 0) {
      normalizedQuantity = 0;
    } else if (inputValue === '-' && normalizedMin < 0) {
      normalizedQuantity = normalizedMin;
    } else if (quantity < normalizedMin) {
      normalizedQuantity = normalizedMin;
    } else if (quantity > normalizedMax) {
      normalizedQuantity = normalizedMax;
    }
    setQuantity(normalizedQuantity);
    setInputValue(String(normalizedQuantity));
    notifyChange(normalizedQuantity);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => {
      const next = Math.max(prev - 1, normalizedMin);
      setInputValue(String(next));
      notifyChange(next);
      return next;
    });
  };
  const incrementQuantity = () => {
    setQuantity((prev) => {
      const next = Math.min(prev + 1, normalizedMax);
      setInputValue(String(next));
      notifyChange(next);
      return next;
    });
  };

  return (
    <div className={cn(cls, 'relative')}>
      <button
        className={cn(BTN_CLS_UTILS, 'left-0')}
        onClick={decrementQuantity}
        disabled={quantity <= normalizedMin || disabled}
      >
        <MinusIcon className="w-step-3" />
      </button>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        className="h-large padded-2 !px-step-6 text-base-b text-center bordered rounded-small 
          appearance-none w-[12.5rem] enabled:bg-white"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        {...attrs}
      />
      <button
        className={cn(BTN_CLS_UTILS, 'right-0')}
        onClick={incrementQuantity}
        disabled={quantity >= normalizedMax || disabled}
      >
        <PlusIcon className="w-step-3" />
      </button>
    </div>
  );
};
export default Counter;
