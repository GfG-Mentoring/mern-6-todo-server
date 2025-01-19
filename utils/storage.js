const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // what ever happens
        try {
            const uploadDirectory = '/home/shikhar/Documents/gfg/nodejs-mern6/storage';
            if (!fs.existsSync(uploadDirectory)) {
                fs.mkdirSync(uploadDirectory);
            }
            cb(null, uploadDirectory);
            return;
        } catch (e) {
            cb(e, null)
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
    }
})

const upload = multer({ storage: storage })

module.exports = { upload }