'use strict';

const express = require('express');
const router = express.Router();
const pug = require('pug');


router.get('/', function (req, res) {
  res.render('index');
});

module.exports = router;