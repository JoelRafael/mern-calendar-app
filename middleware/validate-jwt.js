const { response } = require("express");
const jwt = require("jsonwebtoken");
const { defaulMessage } = require("../helpers/script");
const validateJWT = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return defaulMessage(res, "No hay un token en la peticion", 401);
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (err) {
    return defaulMessage(res, "Token no valido", 401);
  }
  next();
};
module.exports = {
  validateJWT,
};
