const User = require('./package.service');
const {
  handlers: { errorHandler },
  validations: { listValidation, idValidation, statusValidation },
} = require('../../common');

const {
  addValidation,
  updateValidation,
} = require('./validators');

/**
 * Create User fn: `Creating user. `
 * @description `req.body will have user data.`
 */
exports.create = async (req, res, next) => {
  try {
    await addValidation.validate(req.body);
    const user = await User.addUser({ ...req.body, });
    res.success.Created('Successfully Created', { user });
  } catch (error) {
    console.error(error);
    return errorHandler.handler(error, req, res, next);
  }
};

/**
 * Get User Data Fn: ` Get User Data`
 * @description `req.body will have _id `
 * @summary this function will get the data having same `_id` .
 * @reference service
 */
exports.getOne = async (req, res, next) => {
  const { packageId } = req.params;
  try {
    const id = await idValidation.validate(packageId);
    const user = await User.getUser({ id, });

    if (user) {
      res.success.OK('Successfully got User.', { user });
    }

    res.error.NotFound('User Data not found.');
  } catch (error) {
    console.error(error);
    return errorHandler.handler(error, req, res, next);
  }
};

/**
 * Get User Data Fn: ` Get User Data`
 * @description `req.query will have query `
 * @summary this function will get the data having same `query` .
 * @reference service
 */
exports.getList = async (req, res, next) => {
  const reqData = { ...req.query };
  try {
    const validatedReqData = await listValidation.validate(reqData);
    const users = await User.getUserList({ ...validatedReqData, });

    if (users) {
      res.success.OK('Successfully got User.', { users });
    }

    res.error.NotFound('User Data not found.');
  } catch (error) {
    console.error(error);
    return errorHandler.handler(error, req, res, next);
  }
};

/**
 * Get User Data Fn: ` Get User Data Count`
 * @description `req.query will have query `
 * @summary this function will get the data having same `query` .
 * @reference service
 */
exports.getCount = async (req, res, next) => {
  const reqData = { ...req.query };
  try {
    const validatedReqData = await listValidation.validate(reqData);

    const count = await User.getUserListCount({ ...validatedReqData, });

    if (count) {
      res.success.OK('Count.', { count });
    }

    res.success.OK('Count.', { count: 0 });
  } catch (error) {
    console.error(error);
    return errorHandler.handler(error, req, res, next);
  }
};

exports.update = async (req, res, next) => {
  const { packageId } = req.params;
  const { enable } = req.query;
  try {
    const id = await idValidation.validate(packageId);
    const validatedBody = enable === 'true' || enable === 'false'
      ? await statusValidation.validate({ enable }) : await updateValidation.validate(req.body);

    const user = await User.updateUser({
      id,
      ,
      ...validatedBody,
    });

  res.success.OK('Successfully Updated User.', { user });
} catch (error) {
  console.error(error);
  return errorHandler.handler(error, req, res, next);
}
};

exports.delete = async (req, res, next) => {
  const { packageId } = req.params;
  try {
    const id = await idValidation.validate(packageId);

    const user = await User.deleteUser({ id, });

    if (!user) {
      res.error.PreconditionFailed('Something Went Wrong.');
    }

    res.success.OK('Successfully Deleted.', { user });
  } catch (error) {
    console.error(error);
    return errorHandler.handler(error, req, res, next);
  }
};
