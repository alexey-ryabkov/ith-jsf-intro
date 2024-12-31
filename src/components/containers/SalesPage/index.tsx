import BaseLayout from '@containers/BaseLayout';
import ProductsListSettings from '@components/ProductsListSettings';
import { ProductsListSettingsField } from '@components/ProductsListSettings/types';
import ProductsList from '@components/ProductsList';
import TitleBox from '@ui/TitleBox';

const SalesPage = () => {
  return (
    <BaseLayout className="pt-[7.25rem] px-step-5 pb-step-10">
      <TitleBox level={2}>Discounted items</TitleBox>
      <ProductsListSettings
        fields={[
          ProductsListSettingsField.price,
          ProductsListSettingsField.sort,
        ]}
      />
      <ProductsList onlyDiscounted={true} />
    </BaseLayout>
  );
};
export default SalesPage;
