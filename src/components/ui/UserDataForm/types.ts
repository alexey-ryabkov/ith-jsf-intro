import type { ComponentProps } from 'react';
import { UserData } from '@app/types';

type UserDataFormProps = {
  onSubmit: (data: UserData) => Promise<any>;
  appearance?: 'default' | 'white';
  btnLabel?: string;
  fulfilledLabel?: string;
} & Omit<ComponentProps<'form'>, 'onSubmit'>;
export default UserDataFormProps;
