const path = require('path');
const multer  = require('multer');

const generateDir = require('./generateDir');

const storage = multer.diskStorage({
  // 按照日期上传图片
  destination: (req, file, cb) => {
    const nowDate = new Date().toLocaleDateString();
    const pathNow = `public/uploads/${nowDate}`;
    generateDir(pathNow, cb(null, pathNow));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  }
});

const upload = multer({ storage });

module.exports = upload;