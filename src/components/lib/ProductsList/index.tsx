import { useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { API_BASE_URL, APP_ROUTES } from '@app/constants';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { discountPercent } from '@app/utils';
import {
  addCartItem,
  clearCategoryProducts,
  delCartItem,
  fetchProducts,
  setProductsFilter,
} from '@store/actions';
import {
  makeSelectIsProductsFilterUsed,
  selectCartItems,
  selectIsProductsLoading,
  selectProducts,
} from '@store/selectors';
import Preloader from '@ui/Preloader';
import { ProductsListProps } from './types';

const ProductsList = ({
  categoryId = null,
  limit,
  onlyDiscounted,
  className: cls,
}: ProductsListProps) => {
  const isLoading = useAppSelector(selectIsProductsLoading);
  const items = useAppSelector(selectProducts);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const productsInCart = useMemo(() => {
    const ids = [];
    for (const { productId } of cartItems) {
      ids.push(items.find(({ id }) => id === productId)?.id);
    }
    return ids.filter((id) => id);
  }, [cartItems, items]);

  const ignoreOnlyDiscounted = onlyDiscounted !== undefined;
  const selectIsProductsFilterUsed = useCallback(
    makeSelectIsProductsFilterUsed(ignoreOnlyDiscounted),
    [ignoreOnlyDiscounted],
  );
  const isFilterUsed = useAppSelector(selectIsProductsFilterUsed);

  useEffect(() => {
    dispatch(fetchProducts(categoryId));
    return () => {
      dispatch(clearCategoryProducts());
    };
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (onlyDiscounted !== undefined) {
      dispatch(setProductsFilter({ onlyDiscounted }));
    }
  }, [onlyDiscounted, dispatch]);

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
  ) : isLoading ? (
    <Preloader />
  ) : (
    <div className="card text-center">
      {isFilterUsed
        ? 'There are no products suitable for the specified filter'
        : 'Have no any products...'}
    </div>
  );
};
export default ProductsList;
