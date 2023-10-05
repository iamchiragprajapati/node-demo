const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname.split('.').at(0) + "-" + Date.now() + '.' + file.mimetype.split('/').at(-1));
        }
    })
}).single('profile_pic');
module.exports = { upload };