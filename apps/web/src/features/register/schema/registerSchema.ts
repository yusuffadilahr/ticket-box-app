import * as Yup from 'yup'

export const registerUserSchema = Yup.object().shape({
    email: Yup.string().required('Harap email diisi terlebih dahulu'),
    firstName: Yup.string().required('Harap nama depan diisi terlebih dahulu'),
    lastName: Yup.string().required('Harap nama belakang diisi terlebih dahulu'),
    phoneNumber: Yup.string().required('Harap No. HP diisi terlebih dahulu'),
    identityNumber: Yup.string(),
    password: Yup.string().min(8,
        'password must contain 8 or more characters!'
    ).required('Harap password diisi terlebih dahulu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Password tidak sama'),
    // referral: Yup.string()
})