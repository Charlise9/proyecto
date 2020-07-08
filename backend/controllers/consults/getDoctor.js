const { getConnection } = require("../../db");

async function getDoctor(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT doctors.name, doctors.email, doctors.collegiate_number, doctors.experience, doctors.speciality, doctors.image, (SELECT COUNT(id_doctor) FROM medical_consultations WHERE id_doctor = doctors.id) AS number_of_consults
        FROM doctors
        WHERE doctors.id=?
        `,
      [id]
    );

    res.send({
      status: "ok",
      data: result[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getDoctor;
