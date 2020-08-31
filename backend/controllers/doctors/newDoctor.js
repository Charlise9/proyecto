const { getConnection } = require("../../db");

const { newDoctorSchema } = require("../../validators/doctorValidators");
const {
  generateError,
  randomString,
  sendMail,
} = require("../../helpers");

async function newDoctor(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await newDoctorSchema.validateAsync(req.body);

    const {
      name,
      email,
      password,
      collegiateNumber,
      speciality,
      experience,
    } = req.body;

    // comprobar que no existe un usuario con ese mismo email en la base de datos
    const [existingDoctor] = await connection.query(
      `
        SELECT id
        FROM doctors
        WHERE email=?
        `,
      [email]
    );

    if (existingDoctor.length > 0) {
      throw generateError(
        "Ya existe un usuario en la base de datos con ese email",
        409
      );
    }

    // enviar un mensaje de confirmación de registro al email indicado

    const registrationCode = randomString(40);
    /* const validationURL = `${process.env.PUBLIC_HOST}/doctors/validate/${registrationCode}`; */

    const validationURL = `${process.env.FRONTEND_URL}/doctor-validate-mail?${registrationCode}`;


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
      INSERT INTO doctors(registration_date, name, email, password, collegiate_number, speciality, experience, registration_code, last_update, last_auth_update)
      VALUES(UTC_TIMESTAMP, ?, ?, SHA2(?, 512), ?, ?, ?, ?, UTC_TIMESTAMP, UTC_TIMESTAMP)
      `,
      [
        name,
        email,
        password,
        collegiateNumber,
        speciality,
        experience,
        registrationCode,
      ]
    );

    res.send({
      status: "ok",
      message:
        "Usuario registrato. Mira tu email para activarlo. Mira en la carpeta de SPAM si no lo encuentras",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newDoctor;
