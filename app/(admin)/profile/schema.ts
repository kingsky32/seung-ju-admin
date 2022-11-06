import * as yup from 'yup';
import { FieldValues } from './types';

const schema = yup.object<yup.Shape<FieldValues>>().shape({
  image: yup.string(),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  profileName: yup.string().required('Profile Name is required'),
});

export default schema;
