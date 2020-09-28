const express = require('express');

const packageCtrl = require('./package.controller');

const router = express.Router({});
router.route('/').post(packageCtrl.create);
router.route('/').get(packageCtrl.getList);
router.route('/count').get(packageCtrl.getCount);
router.route('/:packageId').get(packageCtrl.getOne);
router.route('/:packageId').put(packageCtrl.update);
router.route('/:packageId').delete(packageCtrl.delete);

module.exports = router;
