const { getConnection } = require("../../db");
const {
  randomString,
  sendMail,
  processAndSaveImage,
  generateError,
} = require("../../helpers");

const { editDoctorSchema } = require("../../validators/doctorValidators");

async function editDoctor(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await editDoctorSchema.validateAsync(req.body);

    const { id } = req.params;
    const {
      email,
      name,
      dni,
      birthDate,
      address,
      location,
      phoneNumber,
    } = req.body;

    // Comprobar que el id de usuario que queremos cambiar es
    // el mismo que firma la petición o bien es admin
    if (req.auth.id !== Number(id) && req.auth.role !== "admin") {
      throw generateError("No tienes permisos para editar este usuario", 403);
    }

    // Comprobar que el usuario existe
    const [currentDoctor] = await connection.query(
      `
      SELECT id, email, image
      FROM doctors
      WHERE id=?
    `,
      [id]
    );

    if (currentDoctor.length === 0) {
      throw generateError(`El usuario con id ${id} no existe`, 404);
    }

    // Si mandamos imagen guardar avatar

    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        // Procesar y guardar imagen
        savedFileName = await processAndSaveImage(req.files.avatar);
      } catch (error) {
        throw generateError(
          "No se pudo procesar la imagen. Inténtalo de nuevo",
          400
        );
      }
    } else {
      savedFileName = currentDoctor[0].image;
    }

    // Si el email es diferente al actual comprobar que no existe en la base de datos
    if (email !== currentDoctor[0].email) {
      const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM doctors
        WHERE email=? 
      `,
        [email]
      );

      if (existingEmail.length > 0) {
        throw generateError(
          "Ya existe un usuario con este email en la base de datos",
          403
        );
      }

      // Verificamos de nuevo el email recibido
      const registrationCode = randomString(40);
      /* const validationURL = `${process.env.PUBLIC_HOST}/doctors/validate/${registrationCode}`; */
      const validationURL = `${process.env.FRONTEND_URL}/doctor-validate-mail?${registrationCode}`;


      //Enviamos la url anterior por mail
      try {
        await sendMail({
          email,
          title:
            "Cambiaste tu email en la aplicación Consultas Médicas. Por favor valida de nuevo",
          content: `Para validar tu nuevo email en la app Consultas Médicas haz click aquí: ${validationURL}`,
        });
      } catch (error) {
        throw generateError("Error en el envío de mail", 500);
      }

      await connection.query(
        `
        UPDATE doctors 
        SET name=?, email=?, last_update=UTC_TIMESTAMP, last_auth_update=UTC_TIMESTAMP, active=false, registration_code=?, image=?
        WHERE id=?
      `,
        [name, email, registrationCode, savedFileName, id]
      );

      // Dar una respuesta
      res.send({
        status: "ok",
        message: "Usuario actualizado. Mira tu email para activarlo de nuevo.",
      });
    } else {
      // Actualizar usuario en la base de datos
      await connection.query(
        `
      UPDATE doctors 
      SET name=?, email=?, dni=?, birth_date=?, address=?, location=?, phone_number=?, image=?, last_update=UTC_TIMESTAMP
      WHERE id=?
    `,
        [
          name,
          email,
          dni,
          birthDate,
          address,
          location,
          phoneNumber,
          savedFileName,
          id,
        ]
      );

      // Dar una respuesta
      res.send({
        status: "ok",
        message: "Usuario actualizado",
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editDoctor;
