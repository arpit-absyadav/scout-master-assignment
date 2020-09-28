const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    page_no: Joi.number().default(1).label('Page Number'),
    page_size: Joi.number().default(100).label('Page Size'),
    sort_by: Joi.string().lowercase().default('created_at').label('Sort By'),
    sort_order: Joi.string().min(3).max(4).lowercase()
      .valid(['asc', 'desc'])
      .default('desc')
      .label('Sort Order'),
    status: Joi.number().valid(0, 1, 2).label('Status'),
    search: Joi.string().allow('').label('Search Query'),
  })
  .unknown(true);
