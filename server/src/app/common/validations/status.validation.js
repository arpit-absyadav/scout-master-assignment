const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    enable: Joi.boolean().optional().label('Enable'),
  });
