/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-20 15:35:20
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2020-05-07 13:03:09
 */
const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),
  phone: Joi.string()
    .min(10)
    .max(30),
});