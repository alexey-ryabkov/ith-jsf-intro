import { type FC } from 'react';
import { useParams } from 'react-router';
import BaseLayout from '@containers/BaseLayout';
import ProductDetails from '@components/ProductDetails';

const ProductDetailsPage: FC = () => {
  const { id } = useParams();
  return (
    <BaseLayout className="pt-[7.25rem] px-step-5 pb-step-10">
      <ProductDetails id={Number(id)} />
    </BaseLayout>
  );
};
export default ProductDetailsPage;
