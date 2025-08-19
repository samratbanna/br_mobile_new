import * as Yup from 'yup';

export const RequestUsernameChangeSchema = Yup.object()
  .shape({
    username: Yup.string().required('Username cannot be kept empty'),
    password: Yup.string().required('Password cannot be kept empty'),
  })
  .required();
