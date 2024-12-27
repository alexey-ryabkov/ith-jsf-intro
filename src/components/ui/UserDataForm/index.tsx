import { useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames';
import { UserData } from '@app/types';
import type UserDataFormProps from './types';

const UserDataForm = ({
  appearance = 'default',
  btnLabel = 'Submit',
  fulfilledLabel = 'Submited',
  onSubmit,
  className: cls,
  ...attrs
}: UserDataFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserData>();

  const [submited, setSubmited] = useState(false);
  const submitHandler: SubmitHandler<UserData> = (data) => {
    if (isValid) {
      onSubmit?.(data).then(() => setSubmited(true));
    }
  };

  const inputCls = useMemo(
    () =>
      cn(
        'padded-2-4 bordered rounded-small',
        {
          'text-white placeholder:text-white !border-white':
            appearance === 'white',
        },
        appearance === 'default' ? 'bg-white' : 'bg-transparent',
      ),
    [appearance],
  );
  const errMsgCls = useMemo(
    () =>
      cn(
        '!mt-step-half text-sm-b',
        appearance === 'default' ? 'text-red' : 'text-white',
      ),
    [appearance],
  );

  return (
    <form
      className={cn(cls, 'mt-step-2')}
      onSubmit={handleSubmit(submitHandler)}
      {...attrs}
    >
      <div className="flex flex-col space-y-step-2 mb-step-4">
        <input
          placeholder="Name"
          type="text"
          className={cn(inputCls, { invalid: errors.name })}
          {...register('name', {
            required: 'Name is required',
            maxLength: {
              value: 25,
              message: 'The max length is 25 chars',
            },
          })}
        />
        {errors.name && (
          <span className={errMsgCls}>{errors.name.message}</span>
        )}
        <input
          placeholder="Phone number"
          type="text"
          className={cn(inputCls, { invalid: errors.phone })}
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^\+?[1-9][0-9]{7,14}/,
              message: 'Invalid phone number format',
            },
          })}
        />
        {errors.phone && (
          <span className={errMsgCls}>{errors.phone.message}</span>
        )}
        <input
          placeholder="Email"
          type="text"
          className={cn(inputCls, { invalid: errors.email })}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[\w.-]+@[\w.-]+\.\w+$/,
              message: 'Invalid email address format',
            },
          })}
        />
        {errors.email && (
          <span className={errMsgCls}>{errors.email.message}</span>
        )}
      </div>
      <button
        type="submit"
        className={cn(
          appearance === 'default' ? 'btn' : 'btn-alternative',
          { fulfilled: submited },
          'w-full',
        )}
      >
        {!submited ? btnLabel : fulfilledLabel}
      </button>
    </form>
  );
};
export default UserDataForm;
