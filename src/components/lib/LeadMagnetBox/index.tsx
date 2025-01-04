import cn from 'classnames';
import { sendCouponRequest } from '@app/services';
import TitleBox from '@ui/TitleBox';
import UserDataForm from '@components/UserDataForm';
import { LeadMagnetBoxProps } from './types';
import { useAppDispatch } from '@app/hooks';
import { reportSuccess, showError } from '@app/store/actions';

const LeadMagnetBox = ({
  title,
  image,
  className: cls,
  style = {},
  ...attrs
}: LeadMagnetBoxProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={cn(
        cls,
        'card-accent !p-0 bg-gradient-to-l from-[#0B710B] from-33% to-primary',
      )}
      {...attrs}
    >
      <div
        className="p-step-4 bg-[left_2rem_bottom] bg-no-repeat"
        style={{
          ...style,
          backgroundImage: `url('${image}')`,
        }}
      >
        <TitleBox className="!justify-center" level={2}>
          {title}
        </TitleBox>
        <div className="flex justify-end">
          <UserDataForm
            appearance="white"
            btnLabel="Get a discount"
            fulfilledLabel="Discount Coupon Sent"
            className="w-[32.25rem]"
            onSubmit={async (data) => {
              const result = await sendCouponRequest(data);
              if (result) {
                const { status, message } = result;
                dispatch(
                  status === 'OK'
                    ? reportSuccess(
                        `Your request has been successfully registered on the website.\n\nA link for 
                        applying the discount has been sent to the email address you specified.`,
                      )
                    : showError(message),
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default LeadMagnetBox;
