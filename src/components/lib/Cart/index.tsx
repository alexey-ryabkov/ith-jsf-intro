import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  API_BASE_URL,
  APP_ROUTES,
  priceFormatterDefOpts,
} from '@app/constants';
import { createOrder } from '@app/services';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { formatPrice, pluralized } from '@app/utils';
import {
  showError,
  reportSuccess,
  delCartItem,
  updCartItem,
  clearCart,
} from '@store/actions';
import {
  selectInCartCount,
  selectCartItems,
  selectIsNotificationShowing,
  selectInCartSum,
} from '@store/selectors';
import Counter from '@ui/Counter';
import TitleBox from '@ui/TitleBox';
import UserDataForm from '@components/UserDataForm';
import { ReactComponent as CrossIcon } from '@assets/icons/cross.svg';

const priceFormatterSumOpts = priceFormatterDefOpts;
priceFormatterSumOpts.minimumFractionDigits = 2;

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const count = useAppSelector(selectInCartCount);
  const sum = useAppSelector(selectInCartSum);

  const isNotificationShowing = useAppSelector(selectIsNotificationShowing);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isNotificationShowing && isOrderPlaced) {
      dispatch(clearCart());
      setIsOrderPlaced(false);
    }
  }, [isNotificationShowing, isOrderPlaced, dispatch]);

  return cartItems.length ? (
    <div className="grid-left-bigger">
      <div className="space-y-step-2">
        {cartItems.map((cartItem) => {
          const { id, title, price, discont_price, image, quantity } = cartItem;
          return (
            <div
              key={id}
              className="bg-white bordered rounded flex h-[11.25rem] items-stretch overflow-hidden"
            >
              <Link
                to={`${APP_ROUTES.PRODUCTS}/${id}`}
                className="flex-none w-[12.5rem] border-e border-outline"
              >
                <img
                  className="size-full object-cover"
                  src={`${API_BASE_URL}${image}`}
                  alt={title}
                />
              </Link>
              <div className="flex-auto  padded-4 space-y-step-4">
                <div className="flex items-start justify-between space-x-step-2">
                  <div className="max-w-[29.375rem] truncate">{title}</div>
                  <button onClick={() => dispatch(delCartItem(id))}>
                    <CrossIcon className="w-step-3" />
                  </button>
                </div>
                <div className="flex items-center space-x-step-4">
                  <Counter
                    onChange={(value) =>
                      dispatch(updCartItem({ ...cartItem, quantity: value }))
                    }
                    defaultValue={quantity}
                    className=""
                  />
                  <div className="flex items-baseline space-x-step-2">
                    <span className="text-lg-b">
                      {formatPrice(discont_price ?? price)}
                    </span>
                    {discont_price && (
                      <span className="text-quiet line-through">
                        {formatPrice(price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card-info">
        <TitleBox level={3} className="*:first:!font-bold">
          Order details
        </TitleBox>
        <div className="text-lg text-quiet">{pluralized(count)}</div>
        <div className="flex justify-between items-baseline text-lg text-quiet">
          Total
          <span className="text-xl text-black">
            {formatPrice(
              sum,
              new Intl.NumberFormat('en-US', priceFormatterSumOpts),
            )}
          </span>
        </div>
        <UserDataForm
          btnLabel="Order"
          fulfilledLabel="Order is Placed"
          className="mt-step-4"
          onSubmit={async (user) => {
            const result = await createOrder({ user, items: cartItems });
            if (result) {
              const { status, message } = result;
              dispatch(
                status === 'OK'
                  ? reportSuccess(
                      'Your order has been successfully placed on the website.\n\nA manager will contact you shortly to confirm your order.',
                    )
                  : showError(message),
              );
              if (status === 'OK') {
                setIsOrderPlaced(true);
              }
            }
          }}
        />
      </div>
    </div>
  ) : (
    <div className="space-y-step-4">
      <div>Looks like you have no items in your basket currently.</div>
      <Link to={APP_ROUTES.PRODUCTS} className="btn text-center w-[19.5rem]">
        Continue Shopping
      </Link>
    </div>
  );
};
export default Cart;
