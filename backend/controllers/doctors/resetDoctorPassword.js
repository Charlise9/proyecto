const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

const {
  resetDoctorPasswordSchema,
} = require("../../validators/doctorValidators");

async function resetDoctorPassword(req, res, next) {
  let connection;

  try {
    await resetDoctorPasswordSchema.validateAsync(req.body);

    connection = await getConnection();

    const { recoverCode, newPassword } = req.body;

    // Comprobar que existe un usuario con el código de recover en la base de datos
    const [current] = await connection.query(
      `
      SELECT id
      FROM doctors
      WHERE password_update_code=?
    `,
      [recoverCode]
    );

    if (current.length === 0) {
      throw generateError(
        "No hay ningún usuario con este código de recuperación de password",
        404
      );
    }

    // Actualizar password
    await connection.query(
      `
      UPDATE doctors
      SET password=SHA2(?, 512), password_update_code=NULL, last_update=UTC_TIMESTAMP, last_auth_update=UTC_TIMESTAMP
      WHERE password_update_code=?
    `,
      [newPassword, recoverCode]
    );

    res.send({
      status: "ok",
      message: "Password actualizada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = resetDoctorPassword;
