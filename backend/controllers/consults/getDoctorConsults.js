const { getConnection } = require("../../db");

async function getDoctorConsults(req, res, next) {
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
        SELECT medical_consultations.id AS consultation_id, medical_consultations.date AS date, medical_consultations.seriusness AS seriusness, medical_consultations.symptoms, medical_consultations.medical_history, medical_consultations.description, medical_consultations.image, medical_consultations.document, (SELECT name FROM users WHERE id_user = users.id) AS consult_patient, (SELECT id_medical_consultation FROM consultation_answers WHERE id_medical_consultation = medical_consultations.id) AS answer_id, doctors.name AS doctor_name, doctors.id AS doctor_id, doctors.speciality
        FROM medical_consultations
            INNER JOIN doctors
            ON medical_consultations.id_doctor = doctors.id
        WHERE doctors.id=?
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

module.exports = getDoctorConsults;
