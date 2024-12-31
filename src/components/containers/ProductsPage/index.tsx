import BaseLayout from '@containers/BaseLayout';
import ProductsListSettings from '@components/ProductsListSettings';
import ProductsList from '@components/ProductsList';
import TitleBox from '@ui/TitleBox';

const ProductsPage = () => {
  return (
    <BaseLayout className="pt-[7.25rem] px-step-5 pb-step-10">
      <TitleBox level={2}>All products</TitleBox>
      <ProductsListSettings />
      <ProductsList />
    </BaseLayout>
  );
};
export default ProductsPage;
