const { getConnection } = require("../../db");

async function getDoctor(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT doctors.name, doctors.email, doctors.collegiate_number, doctors.experience, doctors.speciality, doctors.image 
        FROM doctors
        WHERE doctors.id=?
        `,
      [id]
    );

    const [questions] = await connection.query(
      `
    SELECT COUNT(id) AS number_of_consults
    FROM medical_consultations
    WHERE id_doctor=?
    `,
      [id]
    );

    res.send({
      status: "ok",
      data: { doctor: result[0], questions: questions[0] },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getDoctor;

// (SELECT SUM(consultation_answers.rate) FROM consultation_answers WHERE consultation_answers.id=medical_consultations.id_consultation_answer GROUP BY consultation_answers.id) AS rate
