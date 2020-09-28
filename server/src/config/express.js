const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  handlers: { errorHandler },
} = require('../app/common');

module.exports = function () {
  const app = express();

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

  app.use('/users', userRoutes);
  // route-declare

  app.use(errorHandler.handler);

  app.use((req, res) => res.error.NotFound(`Requested Route [ ${req.url} ] Not found.`));

  return app;
};