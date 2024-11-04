import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Harap masukkan email yang valid.')
    .required('Email tidak boleh kosong, harap diisi.'),
  password: Yup.string().required(
    'Kata sandi tidak boleh kosong, harap diisi.',
  ),
});
