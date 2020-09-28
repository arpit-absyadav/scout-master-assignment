/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-20 15:35:20
 * @Last Modified by: Arpit Yadav
 * @Last Modified time: 2020-09-28 22:02:35
 */
const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  order_number: Joi.number().positive().required(),
  delivery_company_id: Joi.number().positive().required(),
  awb: Joi.string().required()
    .label('AWB'),
  weight: Joi.number().required().label('Weight'),
  value: Joi.number().required(),
  created_by: Joi.number().positive().label('Created By'),
});
