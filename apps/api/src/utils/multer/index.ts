import multer from "multer";

const storage = multer.memoryStorage()
const fileFilter = (req: any, file: any, cb: any) => {
    const extensionAccepted = ['jpg', 'png', 'jpeg', 'webp', 'svg']

    const imagesExt = file.originalname.split('.')
    if (!extensionAccepted.includes(imagesExt[imagesExt.length - 1])) {
        return cb(new Error('Format file tidak sesuai'))
    }

    return cb(null, true)
}

export const uploadMulter = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5000000 }
})