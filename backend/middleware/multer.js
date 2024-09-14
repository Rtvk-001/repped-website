const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',  // Folder name in Cloudinary
    allowedFormats: ['jpeg', 'png', 'jpg']
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
