import BaseLayout from '@containers/BaseLayout';
import ProductsFilter from '@components/ProductsFilter';
import { ProductsFilterField } from '@components/ProductsFilter/types';
import ProductsList from '@components/ProductsList';
import TitleBox from '@ui/TitleBox';

const SalesPage = () => {
  return (
    <BaseLayout className="pt-[7.25rem] px-step-5 pb-step-10">
      <TitleBox level={2}>Discounted items</TitleBox>
      <ProductsFilter
        fields={[ProductsFilterField.price, ProductsFilterField.sort]}
      />
      <ProductsList />
    </BaseLayout>
  );
};
export default SalesPage;
