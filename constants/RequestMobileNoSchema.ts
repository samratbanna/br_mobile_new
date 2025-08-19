import * as Yup from 'yup';

export const RequestMobileNoSchema = Yup.object()
  .shape({
    mobileNo: Yup.string()
      .required('Phone Number cannot be kept empty')
      .min(10, 'Phone Number should be 10 digit'),
  })
  .required();
