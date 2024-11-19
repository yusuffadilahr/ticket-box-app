import * as Yup from 'yup'

export const loginOrganizerSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid.')
    .required('Email tidak boleh kosong.'),
  password: Yup.string().required(
    'Kata sandi tidak boleh kosong, harap diisi.',
  ),
});
