import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CategoryProductsList } from '@app/types';
import { getCategoryProducts } from '@app/services';
import BaseLayout from '@containers/BaseLayout';
import ProductsFilter from '@components/ProductsFilter';
import ProductsList from '@components/ProductsList';
import TitleBox from '@ui/TitleBox';

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<
    CategoryProductsList['category'] | null
  >(null);

  useEffect(() => {
    getCategoryProducts(Number(id)).then((result) => {
      if (result && !('status' in result)) {
        if (!('status' in result)) setCategory(result.category);
      }
    });
  });

  return (
    <BaseLayout className="pt-[7.25rem] px-step-5 pb-step-10">
      <TitleBox level={2}>{category?.title ?? 'Unknown category'}</TitleBox>
      <ProductsFilter />
      <ProductsList category={Number(id)} />
    </BaseLayout>
  );
};
export default CategoryPage;
