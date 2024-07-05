const cloudinary = require('cloudinary').v2;
const { cloudImage } = require('../config/config');


cloudinary.config({
    cloud_name: cloudImage.cloud_name,
    api_key: cloudImage.api_key,
    api_secret: cloudImage.api_secret
});

module.exports = cloudinary;