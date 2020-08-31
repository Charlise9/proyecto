const { getConnection } = require("../../db");

const { newUserSchema } = require("../../validators/userValidators");
const { generateError, randomString, sendMail } = require("../../helpers");

async function newUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await newUserSchema.validateAsync(req.body);

    const { name, email, password, dni,
      socialSecurityNumber } = req.body;

    // comprobar que no existe un usuario con ese mismo email en la base de datos
    const [existingUser] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE email=?
        `,
      [email]
    );

    if (existingUser.length > 0) {
      throw generateError(
        "Ya existe un usuario en la base de datos con ese email",
        409
      );
    }

    // enviar un mensaje de confirmación de registro al email indicado

    const registrationCode = randomString(40);

    // se crea una url para confirmar el código

    /* const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`; */

    const validationURL = `${process.env.FRONTEND_URL}/patient-validate-mail?${registrationCode}`;


    // Enviamos la url anterior por mail
    try {
      await sendMail({
        email,
        title: "Valida tu cuenta de usuario en la app Consultas Médicas",
        content: `Para validar tu cuenta de usuario en la app Consultas Médicas haz click aquí: ${validationURL}`,
      });
    } catch (error) {
      throw generateError("Error en el envío de mail", 500);
    }

    // meter el nuevo usuario en la base de datos sin activar
    await connection.query(
      `
      INSERT INTO users(registration_date, name, email, password, dni, social_security_number, registration_code, last_update, last_auth_update)
      VALUES(UTC_TIMESTAMP, ?, ?, SHA2(?, 512), ?, ?, ?, UTC_TIMESTAMP, UTC_TIMESTAMP)
      `,
      [name, email, password, dni, socialSecurityNumber, registrationCode]
    );

    res.send({
      status: "ok",
      message:
        "Usuario registrado. Mira tu email para activarlo. Mira en la carpeta de SPAM si no lo encuentras",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newUser;
