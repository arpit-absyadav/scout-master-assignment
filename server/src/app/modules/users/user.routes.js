const express = require('express');

const user = require('./user.controller');

const router = express.Router({});
router.route('/').get(user.getList);

module.exports = router;
