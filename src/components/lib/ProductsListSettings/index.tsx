import { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { ProductSortingVar, ProductsSorting } from '@app/types';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectProductsFilter, selectProductsSorting } from '@store/selectors';
import {
  resetProductsFilterAndSorting,
  setProductsFilter,
  setProductsSorting,
} from '@store/actions';
import Checkbox from '@ui/Checkbox';
import Dropdown from '@ui/Dropdown';
import { ProductsListSettingsField, ProductsListSettingsProps } from './types';
import { usePriceInput } from './usePriceInput';

const ProductsListSettings = ({
  fields,
  // preset,
  className: cls,
}: ProductsListSettingsProps) => {
  // TODO я этим компонентом задаю фильтр, а не беру что там кем то задано в сторе... либо из пропсов брать
  // нужно ли синхронизовать это?

  const {
    price: [priceFrom, priceTo],
    onlyDiscounted,
  } = useAppSelector(selectProductsFilter);

  // console.log('onlyDiscounted', onlyDiscounted);

  const sorting = useAppSelector(selectProductsSorting);
  const dispatch = useAppDispatch();

  const onChangePriceFrom = useCallback(
    (value: number | null) => {
      const newPriceFrom = value !== null ? value : -Infinity;
      dispatch(
        setProductsFilter({
          price: [newPriceFrom, priceTo],
        }),
      );
    },
    [dispatch, priceTo],
  );
  const [priceFromRef, priceFromValue] = usePriceInput(
    onChangePriceFrom,
    isFinite(priceFrom) ? String(priceFrom) : '',
  );

  const onChangePriceTo = useCallback(
    (value: number | null) => {
      const newPriceTo = value !== null ? value : Infinity;
      dispatch(
        setProductsFilter({
          price: [priceFrom, newPriceTo],
        }),
      );
    },
    [dispatch, priceFrom],
  );
  const [priceToRef, priceToValue] = usePriceInput(
    onChangePriceTo,
    isFinite(priceTo) ? String(priceTo) : '',
  );

  useEffect(
    () => () => {
      dispatch(resetProductsFilterAndSorting());
    },
    [dispatch],
  );

  return (
    <div className={cn(cls, 'flex gap-step-5 items-center mb-step-5')}>
      {(!fields || fields.includes(ProductsListSettingsField.price)) && (
        <div className="flex gap-step-2 items-baseline">
          <label htmlFor="price_from" className="text-base-b">
            Price
          </label>
          <input
            ref={priceFromRef}
            value={priceFromValue}
            onChange={() => {
              /** nothing to do (prevent react warning), @see usePriceInput */
            }}
            id="price_from"
            placeholder="from"
            type="text"
            className="w-[7rem] text-sm-b text-quiet padded-1-2 bordered rounded-small"
            autoComplete="off"
          />
          <input
            ref={priceToRef}
            value={priceToValue}
            onChange={() => {
              /** nothing to do (prevent react warning), @see usePriceInput */
            }}
            id="price_to"
            placeholder="to"
            type="text"
            defaultValue={isFinite(priceTo) ? priceTo : undefined}
            className="w-[7rem] text-sm-b text-quiet padded-1-2 bordered rounded-small"
            autoComplete="off"
          />
        </div>
      )}

      {(!fields || fields.includes(ProductsListSettingsField.discount)) && (
        <div className="flex gap-step-2 items-center">
          <Checkbox
            onChange={(onlyDiscounted) => {
              dispatch(setProductsFilter({ onlyDiscounted }));
            }}
            id="discounted"
            value={onlyDiscounted}
            autoComplete="off"
          >
            Discounted items
          </Checkbox>
        </div>
      )}

      {(!fields || fields.includes(ProductsListSettingsField.sort)) && (
        <div className="flex gap-step-2 items-baseline">
          <label htmlFor="sorting" className="text-base-b">
            Sorted
          </label>
          <Dropdown
            onChange={(sorting) => {
              dispatch(setProductsSorting(sorting as ProductSortingVar));
            }}
            items={Object.entries(ProductsSorting).map(([value, label]) => ({
              label,
              value,
            }))}
            id="sorting"
            className="w-[12.5rem]"
            defaultValue={sorting}
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
};
export default ProductsListSettings;
