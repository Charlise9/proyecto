const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Valida el registro de un usuario
const newUserSchema = Joi.object().keys({
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
  dni: Joi.string()
    .min(9)
    .max(9)
    .error(generateError("El campo dni debe tener 9 caracteres", 400)),
  socialSecurityNumber: Joi.string()
    .min(15)
    .max(15)
    .required()
    .error(
      generateError(
        "El campo Seguridad Social debe existir y tener 15 caracteres"
      )
    ),
});

// Valida el login de un usuario
const loginUserSchema = Joi.object().keys({
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
    )
});

// Valida la edición de datos de un usuario
const editUserSchema = Joi.object().keys({
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
  socialSecurityNumber: Joi.string()
    .min(15)
    .max(15)
    .error(
      generateError(
        "El campo Seguridad Social debe de tener 15 caracteres",
        400
      )
    ),
  birthDate: Joi.string()
    .min(10)
    .max(10)
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
const editUserPasswordSchema = Joi.object().keys({
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
const recoverUserPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(generateError("El campo email debe contener un email válido", 400)),
});

// Valida el reseteo de una contraseña
const resetUserPasswordSchema = Joi.object().keys({
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
  newUserSchema,
  loginUserSchema,
  editUserSchema,
  editUserPasswordSchema,
  recoverUserPasswordSchema,
  resetUserPasswordSchema,
};
