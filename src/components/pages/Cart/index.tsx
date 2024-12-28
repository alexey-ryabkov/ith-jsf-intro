import { Link } from 'react-router';
import BaseLayout from '@containers/BaseLayout';
import { APP_ROUTES } from '@app/constants';
import Cart from '@components/Cart';
import TitleBox from '@ui/TitleBox';

const CartPage = () => {
  return (
    <BaseLayout className="pt-step-5 px-step-5 pb-step-10">
      <TitleBox
        level={2}
        tail={
          <Link to={APP_ROUTES.PRODUCTS} className="navigation-link">
            Back to the store
          </Link>
        }
      >
        Shopping cart
      </TitleBox>
      <Cart />
    </BaseLayout>
  );
};
export default CartPage;
