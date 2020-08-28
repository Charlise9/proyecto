const { getConnection } = require("../../db");

async function getDoctor(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT doctors.name, doctors.id, doctors.email, doctors.collegiate_number, doctors.experience, doctors.speciality, doctors.image, doctors.dni, doctors.phone_number, doctors.phone_number, doctors.birth_date, doctors.address, doctors.location, doctors.registration_date 
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

    const [statistics] = await connection.query(
      `SELECT COUNT(CA.id) AS number_of_answers, COUNT(IF(rate = true, 1, NULL)) AS positives, COUNT(IF(rate = false, 1, NULL)) AS negatives, 
    COUNT(IF(verified = true, 1, NULL)) AS verifieds, COUNT(IF(verified = false, 1, NULL)) AS not_verifieds
    FROM consultation_answers CA, medical_consultations MC
    WHERE CA.id_medical_consultation = MC.id AND MC.id_doctor=?`,
      [id]
    );

    res.send({
      status: "ok",
      data: {
        doctor: result[0],
        questions: questions[0],
        statistics: statistics[0],
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getDoctor;

// (SELECT SUM(consultation_answers.rate) FROM consultation_answers WHERE consultation_answers.id=medical_consultations.id_consultation_answer GROUP BY consultation_answers.id) AS rate
