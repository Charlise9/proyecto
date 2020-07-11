const { getConnection } = require("../../db");

const { newAnswerSchema } = require("../../validators/consultValidators");

async function newAnswer(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    await newAnswerSchema.validateAsync(req.body);

    // Sacar de req.body los datos que necesitio
    const { diagnosis, treatment, observations } = req.body;
    const { id } = req.params;

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO consultation_answers(date, diagnosis, treatment, observations, last_update, id_medical_consultation)
      VALUES(UTC_TIMESTAMP,?, ?, ?, UTC_TIMESTAMP, ?)
      `,
      [diagnosis, treatment, observations, id]
    );

    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        diagnosis,
        treatment,
        observations,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newAnswer;
