import * as Yup from 'yup'

export const forgotPasswordSchema = Yup.object().shape({
    password: Yup.string().min(8,
        'password must contain 8 or more characters'
    ).required('Harap diisi terlebih dahulu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
})