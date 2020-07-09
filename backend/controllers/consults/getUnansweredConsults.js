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
        SELECT medical_consultations.id, medical_consultations.date, medical_consultations.seriusness, medical_consultations.symptoms, medical_consultations.medical_history, medical_consultations.description, medical_consultations.image, (SELECT name FROM users WHERE id_user = users.id) AS consult_patient, medical_consultations.id_consultation_answer
        FROM medical_consultations
            INNER JOIN doctors
            ON medical_consultations.id_doctor = doctors.id
        WHERE doctors.id=? AND medical_consultations.id_consultation_answer IS null
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
