import * as Yup from 'yup'

export const forgotPasswordSchema = Yup.object().shape({
    existingPassword: Yup.string().min(8,
        'Password harus berisi minimal 8 karakter'
    ).required('Harap isi kolom ini terlebih dahulu'),
    password: Yup.string().min(8,
        'Password harus berisi minimal 8 karakter'
    ).required('Harap isi kolom ini terlebih dahulu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Password harus sesuai')
})
