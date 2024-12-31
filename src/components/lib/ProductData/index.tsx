import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { API_BASE_URL } from '@app/constants';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { discountPercent } from '@app/utils';
import {
  selectCartItems,
  selectIsProductDataLoading,
  selectProductData,
} from '@store/selectors';
import {
  addCartItem,
  clearProductData,
  delCartItem,
  fetchProductData,
} from '@store/actions';
import TitleBox from '@ui/TitleBox';
import Counter from '@ui/Counter';
import Preloader from '@ui/Preloader';
import { ProductDataProps } from './types';

const ProductData = ({ id, className: cls }: ProductDataProps) => {
  const isLoading = useAppSelector(selectIsProductDataLoading);
  const data = useAppSelector(selectProductData);
  const { title, image, price, discont_price, description } = data ?? {};
  const cartItems = useAppSelector(selectCartItems);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const isInCart = useMemo(
    () => data && cartItems.some(({ id }) => data.id === id),
    [cartItems, data],
  );

  useEffect(() => {
    dispatch(fetchProductData(id));
    return () => {
      dispatch(clearProductData());
    };
  }, [id, dispatch]);

  return data ? (
    <div className={cn(cls, 'grid-left-bigger')}>
      <div className="">
        <img className="rounded" src={`${API_BASE_URL}${image}`} alt={title} />
      </div>
      <div className="">
        <TitleBox level={3}>{title}</TitleBox>
        <div className="space-y-step-4">
          <div className="inline-flex items-baseline space-x-step-2 relative">
            <span className="text-xl text-black">
              ${discont_price ?? price}
            </span>
            {discont_price && (
              <span className="text-lg text-quiet line-through">${price}</span>
            )}
            {discont_price && (
              <span className="badge absolute top-0 -right-step-2 transform translate-x-full !mx-0">
                -{discountPercent(price!, discont_price)}%
              </span>
            )}
          </div>
          <div className="flex space-x-step-2">
            {isInCart ? (
              <button
                onClick={() => dispatch(delCartItem(data.id))}
                className="btn flex-none"
              >
                Remove from cart
              </button>
            ) : (
              <>
                <Counter
                  defaultValue={quantity}
                  onChange={(value) => setQuantity(value)}
                  className="flex-none"
                />
                <button
                  onClick={() => dispatch(addCartItem({ ...data, quantity }))}
                  className="btn flex-auto"
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
          {description && (
            <div>
              <TitleBox level={4}>Description</TitleBox>
              <p className="paragraph">{description}</p>
              {/* <div className="h-[14rem] line-clamp-[10]">
                <p className="paragraph">{description}</p>
              </div> */}
              {/* <div className="mt-step-1">
                <a href="#" className="link">
                  Read more
                </a>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : isLoading ? (
    <Preloader />
  ) : (
    <div className="card text-center">No data for this product...</div>
  );
};
export default ProductData;
