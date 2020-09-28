/* eslint-disable no-console */

const config = require('./config/env');
const express = require('./config/express');

const app = express();

app.get('/', (req, res) => {
  res.send({ msg: 'Welcome' });
});

/*
 * @NOTE If Environment is not `production`,
 * server will run on http with `3000` port.
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.APP_PORT, config.APP_HOST, () => {
    console.log(`Server running on : http://${config.APP_HOST}:${config.APP_PORT}`);
    console.log(`Time : ${new Date()}`);
  });
}

module.exports = app;
