import multer from 'multer'

// configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${FILE_PATH}/`);
    },
    filename: (req, file, cb) => {
        var filename = file.originalname;
        cb(null, Date.now() + '_' + filename);
    },
});