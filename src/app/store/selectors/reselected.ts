// import { createSelector } from 'reselect';
import { createSelector } from '@reduxjs/toolkit';
import { ProductsSorting } from '@app/types';
import {
  selectCartItems,
  selectProductsFilter,
  selectProductsSorting,
  selectRawProducts,
} from './sliced';

export const selectSortedProducts = createSelector(
  [selectRawProducts, selectProductsSorting],
  (products, sorting) => {
    return sorting === 'default'
      ? products
      : [...products].sort((a, b) => {
          switch (sorting) {
            case ProductsSorting.newest:
              return (
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
              );
            case 'price_high2low':
            case 'price_low2high':
              return (
                (b.price - a.price) * (sorting === 'price_low2high' ? -1 : 1)
              );
            default:
              return 0;
          }
        });
  },
);

export const selectProducts = createSelector(
  [selectSortedProducts, selectProductsFilter],
  (products, { price: [priceFrom, priceTo], onlyDiscounted }) => {
    return !onlyDiscounted &&
      ((!isFinite(priceFrom) && !isFinite(priceTo)) || priceFrom > priceTo)
      ? products
      : products.filter((product) => {
          const resultPrice = product.discont_price ?? product.price;
          return (
            (!isFinite(priceFrom) || resultPrice >= priceFrom) &&
            (!isFinite(priceTo) || resultPrice <= priceTo) &&
            (!onlyDiscounted || resultPrice < product.price)
          );
        });
  },
);

export const makeSelectIsProductsFilterUsed = (ignoreOnlyDiscounted = false) =>
  createSelector(
    [selectProductsFilter],
    ({ price: [priceFrom, priceTo], onlyDiscounted }) => {
      return (
        ((isFinite(priceFrom) || isFinite(priceTo)) && priceFrom <= priceTo) ||
        (onlyDiscounted && !ignoreOnlyDiscounted)
      );
    },
  );

export const selectInCartSum = createSelector([selectCartItems], (items) => {
  return (
    items?.reduce(
      (sum, { discont_price, price, quantity }) =>
        sum + quantity * (discont_price ?? price),
      0,
    ) ?? 0
  );
});
