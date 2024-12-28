import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';
import { CategoriesListProps } from './types';
import { getAllCategories } from '@app/services';
import { CategoriesList as CategoriesListT } from '@app/types';
import { API_BASE_URL, APP_ROUTES } from '@app/constants';

const CategoriesList = ({
  cols,
  limit = Infinity,
  className: cls,
}: CategoriesListProps) => {
  const gridColsCls = cols === 4 ? 'grid-cols-4' : 'grid-cols-5';
  const [items, setItems] = useState<CategoriesListT>([]);

  useEffect(() => {
    getAllCategories().then((result) => {
      if (result && !('status' in result)) {
        setItems(result);
      }
    });
  }, []);

  return items.length ? (
    <div className={cn(cls, 'grid  gap-step-4', gridColsCls)}>
      {items.slice(0, limit).map(({ id, title, image }) => (
        <div key={id} className="space-y-step-2 text-center">
          <div>
            <Link to={`${APP_ROUTES.CATEGORIES}/${id}`}>
              <img
                className="rounded"
                src={`${API_BASE_URL}${image}`}
                alt={title}
              />
            </Link>
          </div>
          <div>
            <Link to={`${APP_ROUTES.CATEGORIES}/${id}`}>{title}</Link>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="">Have no any categories...</div>
  );
};
export default CategoriesList;
