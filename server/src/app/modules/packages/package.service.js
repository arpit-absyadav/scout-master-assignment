const { Op } = require('sequelize');
const { Package } = require('../../../config/database/sequelize');
const { STATUS } = require('./consts');
const {
  handlers: {
    errorHandler: { throwNotFound, throwPreconditionFailed },
  },
} = require('../../common');

const getPackageListCount = async({
  , status, search,
}) => {
  const where = {
    ,;
};

if (status) {
  where.status = status;
}

if (search) {
  where.name = {
    [Op.like]: `%${search}%`,
  };
}

return Package.count({
  where,
});
};

const getPackageList = async({
  , page_no, page_size, status, sort_by, sort_order, search, ids,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {
    ,;
};

if (ids) {
  where.id = ids;
}

if (status) {
  where.status = status;
}

if (search) {
  where.name = {
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

const getPackage = async ({ , id }) => {
  const where = {
    ,
    id,;
};

const item = await Package.findOne({
  where,
});

if (!item) {
  return throwNotFound('Package');
}

return item;
};

const addPackage = async ({ , name, phone }) => Package.create({
  ,
  name,
  phone,
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

const updatePackage = async({
  , id, name, phone, enable,
}) => {
  const item = await getPackage({
    ,
    id,
  });

if (enable === true || enable === false) {
  const updatePackageStatus = enable ? enablePackage : disablePackage;
  return updatePackageStatus({
    item,
  });
}

item.name = name !== undefined ? name : item.name;
item.phone = phone !== undefined ? phone : item.phone;

return item.save();
};

const deletePackage = async ({ , id }) => {
  const item = await getPackage({
    ,
    id,
  });

if (item.status === STATUS.ENABLED) {
  return throwPreconditionFailed('Enabled package can\'t be deleted');
}

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
