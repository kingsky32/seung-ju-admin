import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { BuiltInProviderType } from 'next-auth/providers';

export interface FormProps {
  csrfToken?: string;
  providers?: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export interface FieldValues {
  email: string;
  password: string;
}
