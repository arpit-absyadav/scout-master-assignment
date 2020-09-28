// eslint-disable-next-line no-unused-vars
const handler = (err, req, res, next) => {
  console.error(`Error  ::::  ${err}`);

  switch (err.name) {
    case 'SyntaxError':
      return res.error.BadRequest('BadRequest', err);
    case 'UnProcessableEntity':
      return res.error.UnProcessableEntity(
        'UnProcessableEntity', err.errors,
      );
    case 'ValidationError':
      return res.error.BadRequest(err.message, err);
    case 'NotFound':
      return res.error.NotFound(err.message, err.errors);
    case 'PreconditionFailed':
      return res.error.PreconditionFailed(err.message, err.errors);
    case 'SequelizeValidationError':
      return res.error.BadRequest('BadRequest', err);
    case 'SequelizeDatabaseError':
      return res.error.BadRequest('BadRequest', err);
    case 'SequelizeUniqueConstraintError':
      return res.error.Conflict('Conflict', err);
    default:
      return res.error.Default('InternalServerError', err);
  }
};

const throwNotFound = (itemName = 'Item') => {
  const err = new Error();
  err.name = 'NotFound';
  err.message = `${itemName} Not Found`;
  err.errors = {};
  throw err;
};

const throwPreconditionFailed = (message) => {
  const err = new Error();
  err.name = 'PreconditionFailed';
  err.message = `${message}`;
  err.errors = {};
  throw err;
};

module.exports = {
  handler,
  throwNotFound,
  throwPreconditionFailed,
};
