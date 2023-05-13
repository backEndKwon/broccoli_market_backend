const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { v1 } = require('uuid');

require('dotenv').config();
const credentials = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.gif'];

const uploadImage = multer({
  storage: multerS3({
    s3: credentials,
    bucket: 'hanghae-cloneproject',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const uuid = v1();
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('확장자 에러'));
      }
      const photo_ip = `https://hanghae-cloneproject.s3.ap-northeast-2.amazonaws.com/image/${uuid}`;
      req.body.photo_ip = photo_ip;
      callback(null, `image/${uuid}`);
    },
    acl: 'public-read',
  }),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

module.exports = uploadImage;
