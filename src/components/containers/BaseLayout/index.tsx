import { Link } from 'react-router';
import cn from 'classnames';
import CartBox from '@components/CartBox';
import { PropsWithChildrenAndCss } from '@app/types';
import { APP_ROUTES } from '@app/constants';
import AppNav from '@components/AppNav';
import TitleBox from '@ui/TitleBox';
import Descriptions from '@ui/Descriptions';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { ReactComponent as InstagramIcon } from '@assets/icons/instagram.svg';
import { ReactComponent as PhoneIcon } from '@assets/icons/phone.svg';
import DummyMapImg from '@assets/images/map.jpg';

const BaseLayout = ({ children, className: cls }: PropsWithChildrenAndCss) => {
  return (
    <>
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
      <main className={cn(cls, 'flex-grow')}>{children}</main>
      <footer className="flex flex-col space-y-step-4 pb-step-10 px-step-5">
        <TitleBox level={2}>Contacts</TitleBox>
        <Descriptions
          className="grid-left-bigger"
          itemWrapperCls="card-info"
          items={[
            {
              name: 'Phone',
              value: '+7 (499) 350-66-04',
            },
            {
              name: 'Socials',
              value: (
                <div className="flex space-x-step-2">
                  <a href="/">
                    <InstagramIcon className="w-middle" />
                  </a>
                  <a href="/">
                    <PhoneIcon className="w-middle" />
                  </a>
                </div>
              ),
            },
            {
              name: 'Address',
              value: 'Dubininskaya Ulitsa, 96, Moscow, Russia, 115093',
            },
            {
              name: 'Working Hours',
              value: '24 hours a day',
            },
          ]}
        />
        <div className="rounded">
          <img src={DummyMapImg} alt="Map" />
        </div>
      </footer>
    </>
  );
};
export default BaseLayout;
