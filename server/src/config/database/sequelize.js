const Sequelize = require('sequelize');
const {
  user, company, packages,
} = require('./models');
const env = require('../env');

const sequelize = new Sequelize(env.MYSQL_DB_NAME, env.MYSQL_USERNAME, env.MYSQL_PASSWORD, {
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  dialect: 'mysql',
  logging: console.log,
  dialectOptions: {
    charset: 'utf8mb4',
    multipleStatements: true,
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  },
});

const User = user(sequelize, Sequelize);
const Package = packages(sequelize, Sequelize);
const Company = company(sequelize, Sequelize);

// Package.hasOne(Company);
// Package.hasOne(User);

module.exports = {
  sequelize,
  User,
  Package,
  Company,
};
