const { getConnection } = require("../../db");
//const { formatDateToDB } = require("../../helpers");

async function getUserConsults(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { order, direction } = req.query;

    let orderBy;
    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    switch (order) {
      case "seriusness":
        orderBy = "seriusness";
        break;
      default:
        orderBy = "date";
    }

    const { id } = req.params;

    const [result] = await connection.query(
      `
        SELECT medical_consultations.id AS consultation_id, medical_consultations.date, medical_consultations.seriusness, medical_consultations.symptoms, medical_consultations.medical_history, medical_consultations.description, medical_consultations.image, (SELECT name FROM doctors WHERE id_doctor = doctors.id) AS doctor_name, (SELECT speciality FROM doctors WHERE id_doctor = doctors.id) AS speciality, (SELECT id FROM consultation_answers WHERE id_medical_consultation = medical_consultations.id) AS answer, (SELECT name FROM users WHERE id_user = users.id) AS consult_patient
        FROM medical_consultations
            INNER JOIN users
            ON medical_consultations.id_user = users.id
        WHERE users.id=?
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

module.exports = getUserConsults;
