const { Op } = require('sequelize');
const { Company } = require('../../../config/database/sequelize');
const {
  handlers: {
    errorHandler: { throwNotFound },
  },
} = require('../../common');

const getCompaniesList = async ({
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
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return Company.findAll({
    where,
    order,
    offset,
    limit,
  });
};

const getCompany = async ({ id }) => {
  const where = {
    id,
  };

  const item = await Company.findOne({
    where,
  });

  if (!item) {
    return throwNotFound('Company');
  }

  return item;
};

module.exports = {
  getCompaniesList,
  getCompany,
};
