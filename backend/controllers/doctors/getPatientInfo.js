const { getConnection } = require("../../db");

const { formatDateToDB, formatBirthdayToDB } = require("../../helpers");

async function getPatientInfo(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT id, registration_date, email, name, image, birth_date, dni, social_security_number, address, location, phone_number
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
      email: userData.email,
      image: userData.image,
      birthDate: formatBirthdayToDB(userData.birth_date),
      dni: userData.dni,
      socialSecurityNumber: userData.social_security_number,
      address: userData.address,
      location: userData.location,
      phoneNumber: userData.phoneNumber,
    };

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

module.exports = getPatientInfo;
