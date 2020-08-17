const { getConnection } = require("../../db");
//const { formatDateToDB } = require("../../helpers");

async function getAnswer(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { direction } = req.query;

    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT CA.id AS answer_id, D.name AS doctor_name, D.id AS doctor_id, U.name AS patient_name, U.id AS patient_id, MC.id AS consult_id, CA.date, CA.diagnosis, CA.treatment, CA.observations, CA.rate, CA.verified
        FROM consultation_answers CA, medical_consultations MC, users U, doctors D
        WHERE CA.id_medical_consultation = MC.id
            AND MC.id_user = U.id
            AND MC.id_doctor = D.id
            AND CA.id=?
        ORDER BY CA.date ${orderDirection}

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

module.exports = getAnswer;