import { Link } from 'react-router';
import { APP_ROUTES } from '@app/constants';
import BaseLayout from '@containers/BaseLayout';
import TitleBox from '@ui/TitleBox';
import Error404Img from '@assets/images/404.png';

const Error404Page = () => {
  return (
    <BaseLayout className="py-step-10">
      <div className="w-[43.125rem] text-center mx-auto">
        <img className="mb-step-4" src={Error404Img} alt="404 error" />
        <TitleBox level={2} className="!block !pb-step-2">
          Page Not Found
        </TitleBox>
        <p className="text-quiet mb-step-4">
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <Link to={APP_ROUTES.MAIN} className="btn w-[13rem]">
          Go Home
        </Link>
      </div>
    </BaseLayout>
  );
};
export default Error404Page;
