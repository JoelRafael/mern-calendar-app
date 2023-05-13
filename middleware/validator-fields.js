const { response } = require("express");
const { validationResult } = require("express-validator");
const { defaulMessage } = require("../helpers/script");

const validatorFields = (req, res = response, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return defaulMessage(res, err.mapped(), 400);
  }
  next();
};

module.exports = {
  validatorFields,
};
