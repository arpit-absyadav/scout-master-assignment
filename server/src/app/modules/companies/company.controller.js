const Company = require('./company.service');
const {
  handlers: { errorHandler },
  validations: { listValidation },
} = require('../../common');

exports.getList = async (req, res, next) => {
  const reqData = { ...req.query };
  try {
    const validatedReqData = await listValidation.validate(reqData);
    const companies = await Company.getCompaniesList({ ...validatedReqData });

    if (companies) {
      res.success.OK('Successfully got Company.', { companies });
    }

    res.error.NotFound('Company Data not found.');
  } catch (error) {

    return errorHandler.handler(error, req, res, next);
  }
};
