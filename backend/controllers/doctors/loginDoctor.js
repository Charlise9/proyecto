const { getConnection } = require("../../db");
const jsonwebtoken = require("jsonwebtoken");

const { generateError } = require("../../helpers");

const { loginDoctorSchema } = require("../../validators/doctorValidators");

async function loginDoctor(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    // comprobar que se reciben los datos necesarios
    await loginDoctorSchema.validateAsync(req.body);

    const { email, password } = req.body;

    // Seleccionar el usuario de la base de datos y comprobar que las passwords coinciden
    const [dbDoctor] = await connection.query(
      `
      SELECT id, name, role, kind_of_user, active
      FROM doctors
      WHERE email=? AND password=SHA2(?, 512)
    `,
      [email, password]
    );

    if (dbDoctor.length === 0) {
      throw generateError(
        "No hay ningún usuario registrado con ese email o la password es incorrecta",
        401
      );
    } else if (!dbDoctor[0].active) {
      throw generateError(
        "El usuario está registrado pero no activado. Por favor revisa tu email y activalo",
        401
      );
    }
    // Generar token con información del usuario
    const tokenInfo = {
      id: dbDoctor[0].id,
      name: dbDoctor[0].name,
      role: dbDoctor[0].role,
      kind_of_user: dbDoctor[0].kind_of_user,
    };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });

    // Devolver el token
    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = loginDoctor;
