import { useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { API_BASE_URL, APP_ROUTES } from '@app/constants';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { discountPercent, formatPrice } from '@app/utils';
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

  const ignoreOnlyDiscounted = onlyDiscounted !== undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectIsProductsFilterUsed = useCallback(
    makeSelectIsProductsFilterUsed(ignoreOnlyDiscounted),
    [ignoreOnlyDiscounted],
  );
  const isFilterUsed = useAppSelector(selectIsProductsFilterUsed);

  const productsInCart = useMemo(() => {
    const cartItemsIds = new Set(cartItems.map(({ id }) => id));
    return items
      .map(({ id }) => (cartItemsIds.has(id) ? id : null))
      .filter((id) => id !== null);
  }, [cartItems, items]);

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
      {items.slice(0, limit).map((product) => {
        const { id, title, image, price, discont_price } = product;
        return (
          <Link
            key={id}
            to={`${APP_ROUTES.PRODUCTS}/${id}`}
            className="bg-white bordered rounded group overflow-hidden"
          >
            <div className="relative border-b border-outline">
              {discont_price && (
                <span className="badge absolute top-step-2 right-step-2">
                  -{discountPercent(price, discont_price)}%
                </span>
              )}
              <img
                className="w-full h-[17.75rem] object-cover"
                src={`${API_BASE_URL}${image}`}
                alt={title}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    productsInCart.includes(id)
                      ? delCartItem(id)
                      : addCartItem({ ...product, quantity: 1 }),
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
          </Link>
        );
      })}
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
