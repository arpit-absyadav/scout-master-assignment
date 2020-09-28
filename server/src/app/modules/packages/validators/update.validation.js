const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  order_number: Joi.number()
    .min(3)
    .max(100),
  delivery_company_id: Joi.number().positive(),
  awb: Joi.string()
    .label('AWB'),
  weight: Joi.number().label('Weight'),
  value: Joi.number(),
  rejected: Joi.number(),
  shipment_lost: Joi.number().valid(0, 1).label('shipment lost'),
  returned_other_reason: Joi.number().valid(0, 1).label('Returnd reason'),
  created_by: Joi.number().positive().label('Created By'),
  return_processed_by: Joi.number().positive(),
  return_recieved_at: Joi.string().label('Return recieved at'),
  delivered_at: Joi.string().label('delivered_at'),
  dispatched_at: Joi.string().label('Dispached at'),
});
