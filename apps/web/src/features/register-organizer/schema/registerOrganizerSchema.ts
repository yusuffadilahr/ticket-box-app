import * as Yup from 'yup'

export const registerOrganizerSchema = Yup.object().shape({
    organizerName: Yup.string().required('Harap nama organizer diisi terlebih dahulu'),
    ownerName: Yup.string().required('Harap nama owner diisi terlebih dahulu'),
    email: Yup.string().required('Harap email organizer diisi terlebih dahulu'),
    phoneNumber: Yup.string().required('Harap No. HP diisi terlebih dahulu'),
    identityNumber: Yup.string(),
    password: Yup.string().min(8,
        'password minimal 8 huruf'
    ).required('Harap password diisi terlebih dahulu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Password tidak sama')
})