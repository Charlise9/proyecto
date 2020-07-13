const { getConnection } = require("../../db");
//const { formatDateToDB } = require("../../helpers");

async function getUserAnswers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { direction } = req.query;

    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    const { id_doctor, id_consult } = req.params;

    const [result] = await connection.query(
      `
        SELECT CA.id, CA.date, CA.diagnosis, CA.treatment, CA.observations, CA.rate, CA.verified
        FROM consultation_answers CA, medical_consultations MC, users U, doctors D
        WHERE CA.id_medical_consultation = MC.id
            AND MC.id_user = U.id
            AND MC.id_doctor = D.id
            AND D.id=?
            AND MC.id=?
        ORDER BY CA.date ${orderDirection}

        `,
      [id_doctor, id_consult]
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

module.exports = getUserAnswers;
