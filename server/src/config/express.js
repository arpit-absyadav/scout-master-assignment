const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const responseHandler = require('@abslibs/response-handler');
const {
  handlers: { errorHandler },
} = require('../app/common');

module.exports = function () {
  const app = express();
  app.use(responseHandler());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());

  app.use(express.static('./app'));
  app.use(express.static('./config'));

  app.get('/', (req, res) => {
    res.success.OK('Welcome');
  });

  const userRoutes = require('../app/modules/users/user.routes');
  const companyRoutes = require('../app/modules/companies/company.routes');
  const packageRoutes = require('../app/modules/packages/package.routes');

  app.use('/users', userRoutes);
  app.use('/companies', companyRoutes);
  app.use('/packages', packageRoutes);
  // route-declare

  app.use(errorHandler.handler);

  app.use((req, res) => res.error.NotFound(`Requested Route [ ${req.url} ] Not found.`));

  return app;
};
