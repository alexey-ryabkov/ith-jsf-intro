import cn from 'classnames';
import Checkbox from '@ui/Checkbox';
import Dropdown from '@ui/Dropdown';
import { ProductsFilterField, ProductsFilterProps } from './types';

const ProductsFilter = ({ fields, className: cls }: ProductsFilterProps) => {
  return (
    <div className={cn(cls, 'flex gap-step-5 items-center mb-step-5')}>
      {(!fields || fields.includes(ProductsFilterField.price)) && (
        <div className="flex gap-step-2 items-baseline">
          <label htmlFor="price_from" className="text-base-b">
            Price
          </label>
          <input
            placeholder="from"
            type="text"
            id="price_from"
            className="w-[7rem] text-sm-b text-quiet padded-1-2 bordered rounded-small"
          />
          <input
            placeholder="to"
            type="text"
            id="price_to"
            className="w-[7rem] text-sm-b text-quiet padded-1-2 bordered rounded-small"
          />
        </div>
      )}

      {(!fields || fields.includes(ProductsFilterField.discount)) && (
        <div className="flex gap-step-2 items-center">
          <Checkbox id="discounted">Discounted items</Checkbox>
        </div>
      )}

      {(!fields || fields.includes(ProductsFilterField.sort)) && (
        <div className="flex gap-step-2 items-baseline">
          <label htmlFor="sorting" className="text-base-b">
            Sorted
          </label>
          <Dropdown
            id="sorting"
            className="w-[12.5rem]"
            items={[
              { label: 'by default' },
              { label: 'newest' },
              { label: 'price: high-low' },
              { label: 'price: low-high' },
            ]}
            defaultValue="newest"
          />
        </div>
      )}
    </div>
  );
};
export default ProductsFilter;
