const { getConnection } = require("../../db");

const { formatDateToDB, formatBirthdayToDB } = require("../../helpers");

async function getUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT id, registration_date, email, role, name, image, birth_date, social_security_number, address, location, phone_number
        FROM users
        WHERE id=?
        `,
      [id]
    );

    if (result.length === 0) {
      const error = new Error(`El usuario con id ${id} no existe.`);
      error.httpStatus = 404;
      throw error;
    }

    const [userData] = result;

    const responseData = {
      registrationDate: formatDateToDB(userData.registration_date),
      name: userData.name,
      image: userData.image,
      birthDate: formatBirthdayToDB(userData.birth_date),
    };

    if (userData.id === req.auth.id || req.auth.role === "admin") {
      responseData.email = userData.email;
      responseData.role = userData.role;
      responseData.rocialSecurityNumber = userData.social_security_number;
      responseData.address = userData.address;
      responseData.location = userData.location;
      responseData.phoneNumber = userData.phone_number;
    }

    res.send({
      status: "ok",
      data: responseData,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getUser;
