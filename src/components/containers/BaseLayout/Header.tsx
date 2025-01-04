import { Link } from 'react-router';
import CartBox from '@components/CartBox';
import { APP_ROUTES } from '@app/constants';
import AppNav from '@ui/AppNav';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';

const LayoutHeader = () => {
  return (
    <header className="border-0 border-b px-step-5">
      <div className="flex items-center justify-between py-step-4">
        <Link to={APP_ROUTES.MAIN}>
          <Logo className="text-primary w-[4.375rem]" />
        </Link>
        <AppNav
          items={[
            {
              title: 'Main Page',
              path: APP_ROUTES.MAIN,
            },
            {
              title: 'Categories',
              path: APP_ROUTES.CATEGORIES,
            },
            {
              title: 'All products',
              path: APP_ROUTES.PRODUCTS,
            },
            {
              title: 'All sales',
              path: APP_ROUTES.SALES,
            },
          ]}
        />
        <Link to={APP_ROUTES.CART}>
          <CartBox />
        </Link>
      </div>
    </header>
  );
};
export default LayoutHeader;
