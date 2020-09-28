/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:46:13
 * @Last Modified by: Arpit Yadav
 * @Last Modified time: 2020-09-27 20:02:33
 */
const { Op } = require('sequelize');
const { User } = require('../../../config/database/sequelize');

const getUserList = async ({
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

  return User.findAll({
    where,
    order,
    offset,
    limit,
  });
};

module.exports = {
  getUserList,
};
