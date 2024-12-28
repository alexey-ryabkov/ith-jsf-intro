import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import TitleBox from '@ui/TitleBox';
import Counter from '@ui/Counter';
import { ProductDetailsProps } from './types';
import { Product } from '@app/types';
import { getProduct } from '@app/services';
import { discountPercent } from '@app/utils';
import { API_BASE_URL } from '@app/constants';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectCartItems } from '@store/selectors';
import { addCartItem, delCartItem } from '@store/actions';

const ProductDetails = ({ id, className: cls }: ProductDetailsProps) => {
  const cartItems = useAppSelector(selectCartItems);
  const [data, setData] = useState<Product | null>(null);
  const { title, image, price, discont_price, description } = data ?? {};
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const isInCart = useMemo(
    () => cartItems.some(({ productId }) => data?.id === productId),
    [cartItems, data],
  );

  useEffect(() => {
    getProduct(Number(id)).then((result) => {
      if (result && !('status' in result)) {
        if (!('status' in result)) {
          setData(result[0]);
        }
      }
    });
  });

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
                  onClick={() =>
                    dispatch(addCartItem({ productId: data.id, quantity }))
                  }
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
  ) : (
    <div className="">No data for this product...</div>
  );
};
export default ProductDetails;
