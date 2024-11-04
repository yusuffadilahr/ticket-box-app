import * as Yup from 'yup'

export const registerOrganizerSchema = Yup.object().shape({
    organizerName: Yup.string().required('Harap nama organizer diisi terlebih dahulu'),
    ownerName: Yup.string().required('Harap nama owner diisi terlebih dahulu'),
    emailOrganizer: Yup.string().required('Harap email organizer diisi terlebih dahulu'),
    phoneNumber: Yup.string().required('Harap No. HP diisi terlebih dahulu'),
    identityNumber: Yup.string().required('Harap No. KTP diisi terlebih dahulu'),
    password: Yup.string().min(8,
        'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
    ).required('Harap password diisi terlebih dahulu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Password tidak sama')
})