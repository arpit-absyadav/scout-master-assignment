const PackageService = require('./package.service');
const {
  handlers: { errorHandler },
  validations: { listValidation, idValidation, statusValidation },
} = require('../../common');

const {
  addValidation,
  updateValidation,
} = require('./validators');

/**
 * Create Package fn: `Creating package. `
 * @description `req.body will have package data.`
 */
exports.create = async (req, res, next) => {
  try {
    await addValidation.validate(req.body);
    const packageData = await PackageService.addPackage({ ...req.body });
    res.success.Created('Successfully Created', { package: packageData });
  } catch (error) {
    return errorHandler.handler(error, req, res, next);
  }
};

/**
 * Get Package Data Fn: ` Get Package Data`
 * @description `req.body will have _id `
 * @summary this function will get the data having same `_id` .
 * @reference service
 */
exports.getOne = async (req, res, next) => {
  const { packageId } = req.params;
  try {
    const id = await idValidation.validate(packageId);
    const packageData = await PackageService.getPackage({ id });

    if (packageData) {
      res.success.OK('Successfully got PackageService.', { package: packageData });
    }

    res.error.NotFound('Package Data not found.');
  } catch (error) {
    return errorHandler.handler(error, req, res, next);
  }
};

/**
 * Get Package Data Fn: ` Get Package Data`
 * @description `req.query will have query `
 * @summary this function will get the data having same `query` .
 * @reference service
 */
exports.getList = async (req, res, next) => {
  const reqData = { ...req.query };
  try {
    const validatedReqData = await listValidation.validate(reqData);
    const packages = await PackageService.getPackageList({ ...validatedReqData });

    if (packages) {
      res.success.OK('Successfully got PackageService.', { packages });
    }

    res.error.NotFound('Package Data not found.');
  } catch (error) {
    return errorHandler.handler(error, req, res, next);
  }
};

/**
 * Get Package Data Fn: ` Get Package Data Count`
 * @description `req.query will have query `
 * @summary this function will get the data having same `query` .
 * @reference service
 */
exports.getCount = async (req, res, next) => {
  const reqData = { ...req.query };
  try {
    const validatedReqData = await listValidation.validate(reqData);

    const count = await PackageService.getPackageListCount({ ...validatedReqData });

    if (count) {
      res.success.OK('Count.', { count });
    }

    res.success.OK('Count.', { count: 0 });
  } catch (error) {
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

    const packageData = await PackageService.updatePackage({
      id,
      ...validatedBody,
    });

    res.success.OK('Successfully Updated PackageService.', { package: packageData });
  } catch (error) {
    return errorHandler.handler(error, req, res, next);
  }
};

exports.delete = async (req, res, next) => {
  const { packageId } = req.params;
  try {
    const id = await idValidation.validate(packageId);

    const packageData = await PackageService.deletePackage({ id });

    if (!packageData) {
      res.error.PreconditionFailed('Something Went Wrong.');
    }

    res.success.OK('Successfully Deleted.', { package: packageData });
  } catch (error) {
    return errorHandler.handler(error, req, res, next);
  }
};
