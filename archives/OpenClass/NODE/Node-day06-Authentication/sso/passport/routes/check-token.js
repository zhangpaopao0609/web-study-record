'use strict';

const express = require('express');
const service = require('../service');

const router = express.Router();

router.get('/', (req, res, next) => {
  const token = req.query.token;
  const result = {
    error: 1, // 登录失败
  };
  if (service.isTokenValid(token)) {
    result.error = 0;
    result.userId = 'test';
  }
  res.json(result);
});

module.exports = router;
