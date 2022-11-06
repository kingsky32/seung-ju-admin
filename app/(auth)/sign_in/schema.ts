import * as yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '#commons/regex';
import { FieldValues } from './types';

const schema = yup.object<yup.Shape<FieldValues>>().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Please match the e-mail format of the email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    ),
});

export default schema;
