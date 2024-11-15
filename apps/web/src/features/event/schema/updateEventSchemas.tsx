import * as Yup from 'yup'

export const UpdateEventSchema = Yup.object().shape({
    eventName: Yup.string().required('Nama acara wajib diisi'),
    location: Yup.string().required('Lokasi wajib diisi'),
    locationUrl: Yup.string().required('Lokasi Google Map wajib diisi'),
    description: Yup.string().required('Deskripsi wajib diisi'),
    isPaid: Yup.boolean(),
    startEvent: Yup.date().required('Tanggal mulai wajib diisi'),
    endEvent: Yup.date().required('Tanggal berakhir wajib diisi'),
    categoryId: Yup.string().required('Kategori wajib diisi'),

    gambar1: Yup.array().of(
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
