const User = require('./user.service');
const {
  handlers: { errorHandler },
  validations: { listValidation },
} = require('../../common');

exports.getList = async (req, res, next) => {
  const reqData = { ...req.query };
  try {
    const validatedReqData = await listValidation.validate(reqData);
    const users = await User.getUserList({ ...validatedReqData });

    if (users) {
      res.success.OK('Successfully got User.', { users });
    }

    res.error.NotFound('User Data not found.');
  } catch (error) {
    console.error(error);
    return errorHandler.handler(error, req, res, next);
  }
};
