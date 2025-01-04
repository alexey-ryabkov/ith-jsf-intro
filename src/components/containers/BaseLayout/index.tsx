import cn from 'classnames';
import { PropsWithChildrenAndCss } from '@app/types';
import Header from './Header';
import Footer from './Footer';

const BaseLayout = ({ children, className: cls }: PropsWithChildrenAndCss) => {
  return (
    <>
      <Header />
      <main className={cn(cls, 'flex-grow')}>{children}</main>
      <Footer />
    </>
  );
};
export default BaseLayout;
