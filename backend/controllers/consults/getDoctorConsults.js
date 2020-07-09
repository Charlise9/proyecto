const { getConnection } = require("../../db");

async function getDoctorConsults(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    // Sacamos las posibles opciones del querystring:
    // search: para listar solo las entradas que contengan su valor en place o description
    // order: para ordenar el listado por voteaverage, place o date
    // direction: para la dirección de la ordenación desc o asc
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
