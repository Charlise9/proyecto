const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Valida nueva consulta
const newConsultSchema = Joi.object().keys({
  seriusness: Joi.string()
    .valid("ALTA", "MEDIA", "BAJA")
    .required()
    .error(
      generateError(
        "Debes especificar el tipo de gravedad: ALTA, MEDIA o BAJA",
        400
      )
    ),
  symptoms: Joi.string()
    .max(300)
    .required()
    .error(
      generateError(
        "El campo síntomas debe existir y no superar los 300 caracteres",
        400
      )
    ),
  medicalHistory: Joi.string()
    .max(500)
    .required()
    .error(
      generateError(
        "El campo Historial médico debe existir y no superar los 500 caracteres",
        400
      )
    ),
  description: Joi.string()
    .max(1000)
    .required()
    .error(
      generateError(
        "El campo descripción debe existir y no superar los 1000 caracteres",
        400
      )
    ),
});

module.exports = {
  newConsultSchema,
};
