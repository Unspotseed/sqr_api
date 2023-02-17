const cloudinary = require('../config/cloudinary');

exports.upload = async (filePath, publicId) => {
  const options = {
    unique_filename: false,
    use_filename: true,
    overwrite: true,
  };
  if (publicId) {
    options.public_Id = publicId;
  }

  const result = await cloudinary.uploader.upload(filePath, options);

  //   console.log(result);
  //   console.log(result.url);
  return result.secure_url;
};

exports.getPublicInfo = url => {
  const splitSlash = url.split('/');
  return splitSlash[splitSlash.length - 1].split('.')[0];
};
