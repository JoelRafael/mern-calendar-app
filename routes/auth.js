const { Router } = require("express");
const { check } = require("express-validator");
const { creatUser, login, renewToken } = require("../controllers/auth");
const { validatorFields } = require("../middleware/validator-fields");
const { validateJWT } = require("../middleware/validate-jwt");
const router = Router();

router.post(
  "/new-user",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El nombre es obligatorio").isEmail(),

    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validatorFields,
  ],
  creatUser
);

router.post(
  "/",
  [
    check("email", "El nombre es obligatorio").isEmail(),

    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validatorFields,
  ],
  login
);

router.get("/renew-token", validateJWT, renewToken);

module.exports = router;
