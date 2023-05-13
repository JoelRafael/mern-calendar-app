const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { validatorFields } = require("../middleware/validator-fields");
const {
  getEvents,
  creatEvents,
  updateEvents,
  deleletEvents,
} = require("../controllers/events");

const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();
router.use(validateJWT);

router.get("/", getEvents);
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion obligatoria").custom(isDate),
    validatorFields,
  ],
  creatEvents
);
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion obligatoria").custom(isDate),
    validatorFields,
  ],
  updateEvents
);
router.delete("/:id", deleletEvents);

module.exports = router;
