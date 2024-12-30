import { useAppSelector } from '@app/hooks';
import { selectCategoryTitle } from '@store/selectors';
import TitleBox from '@ui/TitleBox';

const CategoryTitle = () => {
  const title = useAppSelector(selectCategoryTitle);
  return <TitleBox level={2}>{title || 'Category products'}</TitleBox>;
};
export default CategoryTitle;
