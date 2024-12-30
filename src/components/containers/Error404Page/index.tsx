import { Link } from 'react-router';
import { APP_ROUTES } from '@app/constants';
import BaseLayout from '@containers/BaseLayout';
import Error404Img from '@assets/images/404.png';
import ErrorBox from '@ui/MessageBox';

const Error404Page = () => {
  return (
    <BaseLayout className="py-step-10">
      <ErrorBox
        title="Page Not Found"
        desc="We’re sorry, the page you requested could not be found. Please go back
          to the homepage."
        image={Error404Img}
        className="w-[43.125rem]"
      >
        <Link to={APP_ROUTES.MAIN} className="btn w-[13rem]">
          Go Home
        </Link>
      </ErrorBox>
    </BaseLayout>
  );
};
export default Error404Page;
