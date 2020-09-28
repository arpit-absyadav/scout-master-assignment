const dotenv = require('dotenv');

dotenv.config();

const config = {
  ENVIRONMENT: process.env.ENVIRONMENT || 'DEVELOPMENT',
  SERVICE_IP: process.env.SERVICE_IP || '0.0.0.0',
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  APP_PORT: process.env.APP_PORT || '8080',
  MYSQL_HOST: process.env.MYSQL_HOST || '0.0.0.0',
  MYSQL_PORT: process.env.MYSQL_PORT || 3306,
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
  MYSQL_DB_NAME: process.env.MYSQL_DB_NAME || 'users',

};

module.exports = config;
