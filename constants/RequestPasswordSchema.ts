import * as Yup from 'yup';

export const RequestPasswordSchema = Yup.object()
  .shape({
    newPassword: Yup.string()
      .required('Password cannot be kept empty')
      .min(8, 'Password is too short minimum length should be 8'),
    confirmPassword: Yup.string()
      .required('Password cannot be kept empty')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    otp : Yup.string()
  });
