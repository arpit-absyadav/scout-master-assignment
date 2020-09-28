const express = require('express');

const company = require('./company.controller');

const router = express.Router({});
router.route('/').get(company.getList);

module.exports = router;
