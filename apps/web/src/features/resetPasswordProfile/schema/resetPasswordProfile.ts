import * as Yup from 'yup'

export const resetPasswordProfile = Yup.object().shape({
    existingPassword: Yup.string(),
    password: Yup.string().min(8,
        'password minimal 8 karakter'
    ).required('Harap diisi terlebih dahulu').notOneOf([Yup.ref('existingPassword'), null], 'password harus berbeda dari password awal'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'password harus sama')
})