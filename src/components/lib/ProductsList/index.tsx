import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { ProductsList as ProductsListT } from '@app/types';
import { getAllProducts, getCategoryProducts } from '@app/services';
import { API_BASE_URL, APP_ROUTES } from '@app/constants';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { addCartItem, delCartItem } from '@store/actions';
import { discountPercent } from '@app/utils';
import { ProductsListProps } from './types';
import { selectCartItems } from '@store/selectors';

const ProductsList = ({
  category,
  limit,
  className: cls,
}: ProductsListProps) => {
  const cartItems = useAppSelector(selectCartItems);
  const [items, setItems] = useState<ProductsListT>([]);
  const dispatch = useAppDispatch();

  const productsInCart = useMemo(() => {
    const ids = [];
    for (const { productId } of cartItems) {
      ids.push(items.find(({ id }) => id === productId)?.id);
    }
    return ids.filter((id) => id);
  }, [cartItems, items]);

  useEffect(() => {
    (category ? getCategoryProducts(category) : getAllProducts()).then(
      (result) => {
        if (result && !('status' in result)) {
          if (!('status' in result))
            setItems('data' in result ? result.data : result);
        }
      },
    );
  }, [category]);

  return items.length ? (
    <div className={cn(cls, 'grid grid-cols-4 gap-step-4')}>
      {items
        .slice(0, limit)
        .map(({ id, title, image, price, discont_price }) => (
          <Link
            key={id}
            to={`${APP_ROUTES.PRODUCTS}/${id}`}
            className="bg-white bordered rounded group"
          >
            <div className="relative border-b border-outline">
              {discont_price && (
                <span className="badge absolute top-step-2 right-step-2">
                  -{discountPercent(price, discont_price)}%
                </span>
              )}
              <img
                className="w-[19.75rem] rounded"
                src={`${API_BASE_URL}${image}`}
                alt={title}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    productsInCart.includes(id)
                      ? delCartItem(id)
                      : addCartItem({ productId: id, quantity: 1 }),
                  );
                }}
                className="btn absolute inset-x-step-2 bottom-step-2 hidden group-hover:block"
              >
                {productsInCart.includes(id)
                  ? 'Remove from cart'
                  : 'Add to cart'}
              </button>
            </div>
            <div className="padded-4 !pt-[1.25rem] space-y-step-2">
              <div className="truncate">{title}</div>
              <div className="flex items-baseline space-x-step-2">
                <span className="text-lg-b">${discont_price ?? price}</span>
                {discont_price && (
                  <span className="text-quiet line-through">${price}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
    </div>
  ) : (
    <div className="">Have no any products...</div>
  );
};
export default ProductsList;
