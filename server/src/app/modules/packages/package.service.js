const { Op } = require('sequelize');
const { Package } = require('../../../config/database/sequelize');
const { STATUS } = require('./consts');
const {
  handlers: {
    errorHandler: { throwNotFound, throwPreconditionFailed },
  },
} = require('../../common');

const getPackageListCount = async ({
  status, search,
}) => {
  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.awb = {
      [Op.like]: `%${search}%`,
    };
  }

  return Package.count({
    where,
  });
};

const getPackageList = async ({
  page_no, page_size, status, sort_by, sort_order, search, ids,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {};

  if (ids) {
    where.id = ids;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.awb = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return Package.findAll({
    where,
    order,
    offset,
    limit,
  });
};

const getPackage = async ({ id }) => {
  const where = {
    id,
  };

  const item = await Package.findOne({
    where,
  });

  if (!item) {
    return throwNotFound('Package');
  }

  return item;
};

const addPackage = async ({
  order_number,
  delivery_company_id,
  awb,
  weight,
  value,
  created_by,
}) => Package.create({
  order_number,
  delivery_company_id,
  awb,
  weight,
  value,
  created_by,

});

const enablePackage = async ({ item }) => {
  if (item.status !== STATUS.DISABLED) {
    throw throwPreconditionFailed('Only disabled package can be enabled');
  }

  item.status = STATUS.ENABLED;
  return item.save();
};

const disablePackage = async ({ item }) => {
  console.log(item.status);
  console.log(item.status !== STATUS.ENABLED);

  if (item.status !== STATUS.ENABLED) {
    throw throwPreconditionFailed('Only enabled package can be disabled');
  }

  item.status = STATUS.DISABLED;
  return item.save();
};

const updatePackage = async ({
  id, enable,
  order_number,
  delivery_company_id,
  awb,
  weight,
  value,
  created_by,
  rejected,
  shipment_lost,
  returned_other_reason,
  return_processed_by,
  return_recieved_at,
  delivered_at,
  dispatched_at,
}) => {
  const item = await getPackage({

    id,
  });

  if (enable === true || enable === false) {
    const updatePackageStatus = enable ? enablePackage : disablePackage;
    return updatePackageStatus({
      item,
    });
  }

  item.order_number = order_number !== undefined ? order_number : item.order_number;
  item.delivery_company_id = delivery_company_id !== undefined ? delivery_company_id : item.delivery_company_id;
  item.awb = awb !== undefined ? awb : item.awb;
  item.weight = weight !== undefined ? weight : item.weight;
  item.value = value !== undefined ? value : item.value;
  item.created_by = created_by !== undefined ? created_by : item.created_by;
  item.rejected = rejected !== undefined ? rejected : item.rejected;
  item.shipment_lost = shipment_lost !== undefined ? shipment_lost : item.shipment_lost;
  item.returned_other_reason = returned_other_reason !== undefined ? returned_other_reason : item.returned_other_reason;
  item.return_processed_by = return_processed_by !== undefined ? return_processed_by : item.return_processed_by;
  item.return_recieved_at = return_recieved_at !== undefined ? return_recieved_at : item.return_recieved_at;
  item.delivered_at = delivered_at !== undefined ? delivered_at : item.delivered_at;
  item.dispatched_at = dispatched_at !== undefined ? dispatched_at : item.dispatched_at;
  return item.save();
};

const deletePackage = async ({ id }) => {
  const item = await getPackage({

    id,
  });
  return item.destroy();
};

module.exports = {
  getPackageListCount,
  getPackageList,
  getPackage,
  addPackage,
  updatePackage,
  enablePackage,
  disablePackage,
  deletePackage,
};
