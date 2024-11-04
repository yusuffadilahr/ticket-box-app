import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const imagesExt = file.originalname.split('.')
        cb(null, file.fieldname + '-' + uniqueName + '.' + imagesExt[imagesExt.length -1])
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    const extensionAccepted = ['jpg', 'png', 'jpeg', 'webp', 'svg']
    const imagesExt = file.originalname.split('.')
    if (!extensionAccepted.includes(imagesExt[imagesExt.length - 1])) {
        cb(new Error('Format file tidak sesuai'))
    } else {
        cb(null, true)
    }
}

export const uploadMulter = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize : 5000000} 
})