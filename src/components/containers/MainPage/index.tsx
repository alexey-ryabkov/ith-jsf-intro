import { Link } from 'react-router';
import { APP_ROUTES } from '@app/constants';
import BaseLayout from '@containers/BaseLayout';
import CategoriesList from '@components/CategoriesList';
import LeadMagnetBox from '@components/LeadMagnetBox';
import ProductsList from '@components/ProductsList';
import TitleBox from '@ui/TitleBox';
import Jumbotron from '@ui/Jumbotron';
import JumbotronImg from '@assets/images/gardening.jpg';
import LeadMagnetImg from '@assets/images/garden_tools.png';

const MainPage = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col space-y-step-10 pb-step-10">
        <Jumbotron image={JumbotronImg}>
          <section>
            <TitleBox className="!block text-white" level={1}>
              Amazing Discounts on Garden Products!
            </TitleBox>
            <Link to={APP_ROUTES.SALES} className="btn">
              Check out
            </Link>
          </section>
        </Jumbotron>
        <section className="px-step-5">
          <TitleBox
            level={2}
            tail={
              <Link to={APP_ROUTES.CATEGORIES} className="navigation-link">
                All categories
              </Link>
            }
          >
            Categories
          </TitleBox>
          <CategoriesList cols={4} limit={4} />
        </section>
        <section className="px-step-5">
          <LeadMagnetBox
            title="5% off on the first order"
            image={LeadMagnetImg}
          />
        </section>
        <section className="px-step-5">
          <TitleBox
            level={2}
            tail={
              <Link to={APP_ROUTES.SALES} className="navigation-link">
                All sales
              </Link>
            }
          >
            Sale
          </TitleBox>
          <ProductsList onlyDiscounted={true} limit={4} />
        </section>
      </div>
    </BaseLayout>
  );
};
export default MainPage;
