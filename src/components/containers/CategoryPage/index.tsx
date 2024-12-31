import { useParams } from 'react-router';
import BaseLayout from '@containers/BaseLayout';
import ProductsListSettings from '@components/ProductsListSettings';
import ProductsList from '@components/ProductsList';
import CategoryTitle from '@components/CategoryTitle';

const CategoryPage = () => {
  const { id } = useParams();
  return (
    <BaseLayout className="pt-[7.25rem] px-step-5 pb-step-10">
      <CategoryTitle />
      <ProductsListSettings />
      <ProductsList categoryId={Number(id)} />
    </BaseLayout>
  );
};
export default CategoryPage;
