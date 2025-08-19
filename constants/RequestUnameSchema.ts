import * as Yup from 'yup';

export const RequestUsernameSchema = Yup.object()
  .shape({
    username: Yup.string().required('Password cannot be kept empty'),
  })
  .required();
