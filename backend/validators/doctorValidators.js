const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Valida el registro de un doctor
const newDoctorSchema = Joi.object().keys({
  name: Joi.string()
    .max(100)
    .error(
      generateError(
        "El campo nombre no debe de tener más de 100 caracteres",
        400
      )
    ),
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

// Valida la edición de datos de un usuario
const editDoctorSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .error(generateError("El campo email debe contener un email válido", 400)),
  name: Joi.string()
    .max(100)
    .error(
      generateError(
        "El campo nombre no debe de tener más de 100 caracteres",
        400
      )
    ),
  dni: Joi.string()
    .min(9)
    .max(9)
    .error(generateError("El campo dni debe tener 9 caracteres", 400)),
  birthDate: Joi.string()
    .min(1)
    .max(100)
    .error(
      generateError(
        "El campo fecha de nacimiento tiene que tener un formato AAAA-MM-DD",
        400
      )
    ),
  address: Joi.string()
    .max(100)
    .error(
      generateError(
        "El campo dirección no debe de tener más de 100 caracteres",
        400
      )
    ),
  location: Joi.string()
    .max(100)
    .error(
      generateError(
        "El campo Localidad no debe de tener más de 50 caracteres",
        400
      )
    ),
  phoneNumber: Joi.string()
    .min(9)
    .max(9)
    .error(generateError("El campo teléfono debe tener 9 caracteres", 400)),
});

// VAlida la edición de la contraseña de un usuario
const editDoctorPasswordSchema = Joi.object().keys({
  oldPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo oldPassword debe existir y ser mayor de 8 caracteres",
        400
      )
    ),
  newPassword: Joi.string()
    .min(8)
    .required()
    .invalid(Joi.ref("oldPassword"))
    .error(
      generateError(
        "El campo newPassword debe existir, ser diferente a oldPassword y ser mayor de 8 caracteres",
        400
      )
    ),
});

// Valida la recuperación de una contraseña
const recoverDoctorPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(generateError("El campo email debe contener un email válido", 400)),
});

// Valida el reseteo de una contraseña
const resetDoctorPasswordSchema = Joi.object().keys({
  recoverCode: Joi.string()
    .length(40)
    .required()
    .error(
      generateError(
        "El campo recoverCode debe existir y tener 40 caracteres",
        400
      )
    ),
  newPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo newPassword debe existir, y ser mayor de 8 caracteres",
        400
      )
    ),
});

module.exports = {
  newDoctorSchema,
  loginDoctorSchema,
  editDoctorSchema,
  editDoctorPasswordSchema,
  recoverDoctorPasswordSchema,
  resetDoctorPasswordSchema,
};
