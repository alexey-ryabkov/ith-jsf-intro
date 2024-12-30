import { Link } from 'react-router';
import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import { createOrder, getAllProducts } from '@app/services';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  showError,
  reportSuccess,
  delCartItem,
  updCartItem,
  clearCart,
} from '@store/actions';
import Counter from '@ui/Counter';
import TitleBox from '@ui/TitleBox';
import UserDataForm from '@ui/UserDataForm';
import { ReactComponent as CrossIcon } from '@assets/icons/cross.svg';
import {
  selectInCartCount,
  selectCartItems,
  selectIsNotificationShowing,
} from '@store/selectors';
import { Product, ProductsList, CartItem } from '@app/types';
import { API_BASE_URL, APP_ROUTES } from '@app/constants';
import { pluralized } from '@app/utils';

type CartProduct = CartItem &
  Pick<Product, 'title' | 'price' | 'discont_price' | 'image'> &
  Partial<Omit<Product, 'id' | 'title' | 'price' | 'discont_price' | 'image'>>;

const Cart: FC = () => {
  const count = useAppSelector(selectInCartCount);
  const items = useAppSelector(selectCartItems);
  const products = useRef<ProductsList>([]);
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);

  const isNotificationShowing = useAppSelector(selectIsNotificationShowing);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const sum = useMemo(
    () =>
      cartProducts?.reduce(
        (sum, { discont_price, price, quantity }) =>
          sum + quantity * (discont_price || price),
        0,
      ) ?? 0,
    [cartProducts],
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!products.current || !products.current.length) {
        const result = await getAllProducts();
        if (result && !('status' in result)) {
          products.current = result;
        }
      }
      setCartProducts(
        items.map(({ productId, quantity }) => {
          const product = products.current.find(({ id }) => id === productId);
          return product
            ? { productId, ...product, quantity }
            : {
                productId,
                title: 'Unknown product',
                price: 0,
                discont_price: 0,
                image: '',
                quantity,
              };
        }),
      );
    })();
  }, [items]);

  useEffect(() => {
    if (!isNotificationShowing && isOrderPlaced) {
      dispatch(clearCart());
      setIsOrderPlaced(false);
    }
  }, [isNotificationShowing, isOrderPlaced, dispatch]);

  return cartProducts?.length ? (
    <div className="grid-left-bigger">
      <div className="space-y-step-2">
        {cartProducts?.map(
          ({ productId, title, price, discont_price, image, quantity }) => (
            <div
              key={productId}
              className="bg-white bordered rounded flex space-x-step-4"
            >
              <div className="flex-none border-e border-outline">
                <img
                  className="w-[12.5rem] rounded"
                  src={`${API_BASE_URL}${image}`}
                  alt={title}
                />
              </div>
              <div className="flex-auto padded-4 space-y-step-4">
                <div className="flex items-start justify-between space-x-step-2">
                  <div>{title}</div>
                  <button onClick={() => dispatch(delCartItem(productId))}>
                    <CrossIcon className="w-step-3" />
                  </button>
                </div>
                <div className="flex items-center space-x-step-4">
                  <Counter
                    onChange={(value) =>
                      dispatch(updCartItem({ productId, quantity: value }))
                    }
                    defaultValue={quantity}
                    className=""
                  />
                  <div className="flex items-baseline space-x-step-2">
                    <span className="text-lg-b">${discont_price ?? price}</span>
                    {discont_price && (
                      <span className="text-quiet line-through">${price}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="card-info">
        <TitleBox level={3} className="*:first:!font-bold">
          Order details
        </TitleBox>
        <div className="text-lg text-quiet">{pluralized(count)}</div>
        <div className="flex justify-between items-baseline text-lg text-quiet">
          Total
          <span className="text-xl text-black">${sum}</span>
        </div>
        <UserDataForm
          btnLabel="Order"
          fulfilledLabel="Order is Placed"
          className="mt-step-4"
          onSubmit={async (user) => {
            const result = await createOrder({ user, items });
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
