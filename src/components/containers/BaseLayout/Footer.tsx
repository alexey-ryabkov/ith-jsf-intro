import TitleBox from '@ui/TitleBox';
import Descriptions from '@ui/Descriptions';
import { ReactComponent as InstagramIcon } from '@assets/icons/instagram.svg';
import { ReactComponent as PhoneIcon } from '@assets/icons/phone.svg';
import DummyMapImg from '@assets/images/dummy_map.jpg';

const LayoutFooter = () => {
  return (
    <footer className="px-step-5">
      <TitleBox level={2}>Contacts</TitleBox>
      <div className="space-y-step-4 pb-step-10">
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
      </div>
    </footer>
  );
};
export default LayoutFooter;
