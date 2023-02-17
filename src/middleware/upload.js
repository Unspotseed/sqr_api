const multer = require('multer');
// const chalk = require('chalk');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // if (file) cb(new Error());
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // console.log(req);
    // console.log(chalk.cyan('=============='));
    // console.log(file);
    // console.log(chalk.magenta('+++++++++++++++++++++++++++'));
    cb(
      null,
      new Date().getTime() +
        '' +
        Math.round(Math.random() * 1000000000) +
        '.' +
        file.mimetype.split('/')[1]
    );
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype !== 'image/jpg') {
//     cb(new Error('Not the image file'));
//   }
// };

module.exports = multer({ storage });
