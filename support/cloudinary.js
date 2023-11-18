const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

async function uploadImage(stream) {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder: "/playami" },
      function (error, result) {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(stream).pipe(cld_upload_stream);
  });
}

module.exports = {
  uploadImage,
};
