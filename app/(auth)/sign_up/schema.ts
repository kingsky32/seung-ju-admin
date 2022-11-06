import * as yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '#commons/regex';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  nickname: yup.string().required('Nickname is required'),
  username: yup.string().required('Username is required'),
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
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords does not match'),
});

export default schema;
