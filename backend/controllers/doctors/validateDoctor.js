const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

async function validateDoctor(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { code } = req.params;

    const [result] = await connection.query(
      `
        SELECT email
        FROM doctors
        WHERE registration_code=?
      `,
      [code]
    );

    if (result.length === 0) {
      throw generateError(
        "No hay ningún usuario pendiente de validación con ese código",
        404
      );
    }

    // Actualizar la tabla de usuarios marcando como activo
    // el usuario que tenga el código de registro recibido
    await connection.query(
      `
      UPDATE doctors
      SET active=true, registration_code=NULL
      WHERE registration_code=?
    `,
      [code]
    );

    res.send({
      status: "ok",
      message: `Ya puedes hacer login con tu email: ${result[0].email} y tu contraseña`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = validateDoctor;
