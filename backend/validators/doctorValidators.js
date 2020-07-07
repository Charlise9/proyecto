const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Valida el registro de un doctor
const newDoctorSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError("El campo email debe existir y ser un email válido", 400)
    ),
  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo password debe existir y ser mayor de 8 caracteres"
      )
    ),
  collegiateNumber: Joi.string()
    .min(10)
    .max(10)
    .required()
    .error(
      generateError(
        "El campo Número de colegiado debe existir y tener 10 caracteres"
      )
    ),
  speciality: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        "El campo especialidad debe existir y tener menos de 100 caracteres"
      )
    ),
  experience: Joi.string()
    .min(10)
    .max(10)
    .error(
      generateError(
        "El campo Años de experiencia tiene que contener la fecha fecha en la que empezaste a ejercer y un formato AAAA-MM-DD",
        400
      )
    ),
});

// Valida el login de un doctor
const loginDoctorSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError("El campo email debe existir y ser un email válido", 400)
    ),
  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo password debe existir y ser mayor de 8 caracteres"
      )
    ),
});

module.exports = {
  newDoctorSchema,
  loginDoctorSchema,
};
