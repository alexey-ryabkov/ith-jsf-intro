import BaseLayout from '@containers/BaseLayout';
import CategoriesList from '@components/CategoriesList';
import TitleBox from '@ui/TitleBox';

const CategoriesPage = () => {
  return (
    <BaseLayout className="pt-[7.25rem] px-step-5 pb-step-10">
      <TitleBox level={2}>Categories</TitleBox>
      <CategoriesList cols={5} />
    </BaseLayout>
  );
};
export default CategoriesPage;
