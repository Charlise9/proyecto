const { getConnection } = require("../../db");

async function getUnansweredConsults(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { order, direction } = req.query;

    let orderBy;
    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    switch (order) {
      case "date":
        orderBy = "date";
        break;
      default:
        orderBy = "seriusness";
    }

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT medical_consultations.id, medical_consultations.date, medical_consultations.seriusness, medical_consultations.symptoms, medical_consultations.medical_history, medical_consultations.description, medical_consultations.image, medical_consultations.document, (SELECT name FROM users WHERE id_user = users.id) AS consult_patient, consultation_answers.id_medical_consultation
        FROM medical_consultations
            LEFT JOIN doctors ON medical_consultations.id_doctor = doctors.id
            LEFT JOIN consultation_answers ON medical_consultations.id = consultation_answers.id_medical_consultation
        WHERE doctors.id=? AND consultation_answers.id_medical_consultation IS null
        ORDER BY ${orderBy} ${orderDirection}

        `,
      [id]
    );

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getUnansweredConsults;
