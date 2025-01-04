import { useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { API_BASE_URL, APP_ROUTES } from '@app/constants';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectCategories, selectIsCategoriesLoading } from '@store/selectors';
import { clearCategories, fetchCategories } from '@store/actions';
import Preloader from '@ui/Preloader';
import { CategoriesListProps } from './types';

const CategoriesList = ({
  cols,
  limit = Infinity,
  className: cls,
}: CategoriesListProps) => {
  const isLoading = useAppSelector(selectIsCategoriesLoading);
  const items = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    return () => {
      dispatch(clearCategories());
    };
  }, [dispatch]);

  const wrapperCls = useMemo(
    () =>
      cn(cls, 'grid  gap-step-4', cols === 4 ? 'grid-cols-4' : 'grid-cols-5'),
    [cls, cols],
  );

  return items.length ? (
    <div className={wrapperCls}>
      {items.slice(0, limit).map(({ id, title, image }) => (
        <div key={id} className="space-y-step-2 text-center">
          <Link to={`${APP_ROUTES.CATEGORIES}/${id}`}>
            <img
              className="w-full h-[21.875rem] object-cover rounded"
              src={`${API_BASE_URL}${image}`}
              alt={title}
            />
          </Link>
          <div>
            <Link to={`${APP_ROUTES.CATEGORIES}/${id}`}>{title}</Link>
          </div>
        </div>
      ))}
    </div>
  ) : isLoading ? (
    <Preloader />
  ) : (
    <div className="card text-center">Have no any categories...</div>
  );
};
export default CategoriesList;
