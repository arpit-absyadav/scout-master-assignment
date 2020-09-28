const { STATUS } = require('../../common/consts');

module.exports = (sequelize, Sequelize) => sequelize.define('packages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  delivery_company_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  awb: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  value: {
    type: Sequelize.DECIMAL(10, 4),
    allowNull: false,
  },
  rejected: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  shipment_lost: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  returned_other_reason: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
  },
  dispatched_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  delivered_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  created_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  return_processed_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  return_recieved_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  status: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: STATUS.ENABLED,
  },
  deleted: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
