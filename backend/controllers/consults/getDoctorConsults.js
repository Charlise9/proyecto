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
        SELECT MC.id AS consultation_id, MC.date AS date, MC.seriusness, MC.symptoms, MC.medical_history, MC.description, MC.image, MC.document, (SELECT name FROM users WHERE id_user = users.id) AS consult_patient, CA.id AS answer_id, D.name AS doctor_name, D.id AS doctor_id, D.speciality 
        FROM consultation_answers CA
	            LEFT JOIN medical_consultations MC
	              	ON CA.id_medical_consultation = MC.id
              LEFT JOIN doctors D 
			            ON MC.id_doctor = D.id
        WHERE D.id=?
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
