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

// Valida nueva respuesta
const newAnswerSchema = Joi.object().keys({
  diagnosis: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        "El campo diagnóstico debe existir y no superar los 100 caracteres",
        400
      )
    ),
  treatment: Joi.string()
    .max(500)
    .required()
    .error(
      generateError(
        "El campo tratamiento debe existir y no superar los 500 caracteres",
        400
      )
    ),
  observations: Joi.string()
    .max(1000)
    .required()
    .error(
      generateError(
        "El campo observaciones debe existir y no superar los 1000 caracteres",
        400
      )
    ),
});

// Valida el voto de una entrada en el diario
const voteAnswerSchema = Joi.object().keys({
  vote: Joi.number()
    .valid(true, false)
    .required()
    .error(
      generateError(
        "El campo voto debe existir y tener un valor entre true o false",
        400
      )
    ),
});

const verifiedVoteSchema = voteAnswerSchema;

module.exports = {
  newConsultSchema,
  newAnswerSchema,
  voteAnswerSchema,
  verifiedVoteSchema,
};
