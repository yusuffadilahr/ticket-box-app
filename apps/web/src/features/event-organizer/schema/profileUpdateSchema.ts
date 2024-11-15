import * as Yup from 'yup'

export const profileOrganizerSchema = Yup.object().shape({
    ownerName: Yup.string().required('Wajib diisi!'),
    organizer: Yup.string().required('Wajib diisi')
})