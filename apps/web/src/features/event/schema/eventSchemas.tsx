import * as Yup from 'yup'

export const EventSchema = Yup.object().shape({
    eventName: Yup.string().required('Nama acara wajib diisi'),
    location: Yup.string().required('Lokasi wajib diisi'),
    locationUrl: Yup.string().required('Lokasi Google Map wajib diisi'),
    description: Yup.string().required('Deskripsi wajib diisi'),
    isPaid: Yup.boolean(),
    startEvent: Yup.date().required('Tanggal mulai wajib diisi'),
    endEvent: Yup.date().required('Tanggal berakhir wajib diisi'),
    categoryId: Yup.string().required('Kategori wajib diisi'),
    userId: Yup.string(),
    // tickets: Yup.array().of(
    tickets: Yup.array().min(1, 'wajib membuat minimal 1 tiket'),


    // Yup.object().shape({
    price: Yup.number()
        .min(0, 'Harga minimal 0')
        .required('Harga tiket wajib diisi'),
    ticketName: Yup.string().required('Nama tiket wajib diisi'),
    ticketType: Yup.string().required('Tipe tiket wajib diisi'),
    seatAvailable: Yup.number().required('Kuota tiket wajib diisi'),
    discount: Yup.number()
        .min(0, 'Harga minimal 0')
        .max(Yup.ref('price'), 'Discount cannot be greater than the price'),
    startDate: Yup.date().required('Tanggal mulai penjualan tiket diisi'),
    endDate: Yup.date().required('Tanggal berakhir penjualan tiket diisi'),
    // }),
    // ),



    images: Yup.array().of(
        Yup.mixed<File>()
            .test('fileSize', 'Maksimum File Size 2Mb', file => {
                const limitFileSize = 2000000
                return file && file.size <= limitFileSize
            })
            .test('fileFormat', 'Format Tidak Diizinkan', file => {
                const fileFormatAccepted = ['jpg', 'jpeg', 'png', 'webp', 'svg']
                return file && fileFormatAccepted.includes(file.type.split('/')[1])
            })
    ).max(1, 'File Wajib Dipilih')
});
