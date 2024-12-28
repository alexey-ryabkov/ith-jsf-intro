import { useAppSelector } from '@app/hooks';
import { selectInCartCount } from '@store/selectors';
import { ReactComponent as BasketIcon } from '@assets/icons/basket.svg';

const CartBox = () => {
  const count = useAppSelector(selectInCartCount);
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
export default CartBox;
