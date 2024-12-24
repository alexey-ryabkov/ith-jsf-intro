import { FC } from 'react';
import { ReactComponent as BasketIcon } from '@assets/icons/basket.svg';

const BasketBox: FC = () => {
  // TODO recieve from redux store
  const count = 3;
  return (
    <div className="relative">
      {count ? (
        <span className="badge-rounded absolute top-step-half -left-step-half">
          {count}
        </span>
      ) : null}
      <BasketIcon className="w-11" />
    </div>
  );
};

export default BasketBox;
