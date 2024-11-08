import * as Yup from 'yup'

export const EventSchema = Yup.object().shape({
    eventName: Yup.string().required('Nama acara wajib diisi'),
    location: Yup.string().required('Lokasi wajib diisi'),
    description: Yup.string(),
    isPaid: Yup.boolean(),
    startEvent: Yup.date().required('Tanggal mulai wajib diisi'),
    endEvent: Yup.date().required('Tanggal akhir wajib diisi'),
    artist: Yup.string(),
    categoryId: Yup.string(),
    userId: Yup.string(),
    tickets: Yup.array().of(
        Yup.object().shape({
            price: Yup.number().required('Harga tiket wajib diisi'),
            ticketName: Yup.string().required('Nama tiket wajib diisi'),
            ticketType: Yup.string().required('Tipe tiket wajib diisi'),
            seatAvailable: Yup.number(),
            discount: Yup.number(),
            discountStart: Yup.date(),
            discountExpiry: Yup.date(),
            startDate: Yup.date(),
            endDate: Yup.date(),
        }),
    ),
    images: Yup.array().of(Yup.mixed().required('Gambar wajib diisi')),
});