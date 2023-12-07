const mutler = require('multer');

const storage = mutler.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        console.log(file)
        const name = file.originalname.split('.')[0];
        const ext = file.originalname.split('.')[1];
        const timestamp = new Date().getTime();
        cb(null, `${name}-${timestamp}.${ext}`)
    }
})

const upload = mutler({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}).single('image');

module.exports = upload;