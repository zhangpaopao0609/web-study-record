const express = require('express');

const router = express.Router();

const upload = require('../utils/multer');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/doLogin', upload.single('avatar'), (req, res, next) => {
  const result = '';
  res.send(result);
});

module.exports = router;
