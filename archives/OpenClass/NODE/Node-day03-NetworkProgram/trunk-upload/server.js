const fs = require('node:fs');
const path = require('node:path');
const md5 = require('md5');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
// 生成上传
const uploadFileP = path.resolve(__dirname, `./upload`);
fs.existsSync(uploadFileP) || fs.mkdirSync(uploadFileP);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/assert', express.static(path.resolve(__dirname, `./assert`)));
app.post('/upload', (req, res) => {
  console.log('/upload...');
  if (!req.files) {
    return res.status(500).send('no files were uploaded');
  }
  const file = req.files.file;
  const body = req.body;
  const { chunk, chunks } = body;
  // 生成文件
  const filePath = path.resolve(__dirname, `./upload/${req.body.guid}`);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  file.mv(path.resolve(filePath, `./${chunk}.part`), (err) => {
    let done = true;
    if (err) {
      return res.status(500).send(err);
    }
    for (let i = 0; i < chunks; i++) {
      if (!fs.existsSync(path.resolve(filePath, `./${i}.part`))) {
        done = false;
        break;
      }
    }
    if (done === true) {
      res.json({ flag: true, chunked: true, hasError: false, ext: path.extname(file.name), chunks });
    } else {
      res.json({
        flag: true,
        chunked: false,
        hasError: false,
      });
    }
  });
});
app.post('/merge', (req, res) => {
  const body = req.body;
  const { guid, chunks, ext } = body;
  const md = md5(`${guid}${new Date().toString()}${chunks}`);
  const basePath = path.resolve(__dirname, `./upload/${guid}`);
  const filePh = path.resolve(__dirname, `./upload/${md}${ext}`);
  for (let i = 0; i < chunks; i++) {
    try {
      fs.appendFileSync(filePh, fs.readFileSync(path.resolve(basePath, `./${i}.part`)));
    } catch (e) {
      return req.json({ flag: 0 });
    }
  }
  return res.json({ flag: 1 });
});
app.listen(3000, () => {
  console.log('sever start..');
});
