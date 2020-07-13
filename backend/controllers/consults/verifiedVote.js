const { getConnection } = require("../../db");

const { verifiedVoteSchema } = require("../../validators/consultValidators");
const { generateError } = require("../../helpers");

async function verifiedVote(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await verifiedVoteSchema.validateAsync(req.body);

    const { id } = req.params;
    const { vote } = req.body;

    // Comprobar que la respuesta existe y si no dar un 404
    const [answer] = await connection.query(
      `
      SELECT id
      FROM consultation_answers
      WHERE id=?
    `,
      [id]
    );

    // Comprobar que la respuesta va dirigida a mi usuario
    const [answerUserOwner] = await connection.query(
      `
      SELECT MC.id_doctor
      FROM consultation_answers CA, medical_consultations MC
      WHERE CA.id_medical_consultation = MC.id
            AND CA.id=? AND MC.id_doctor=?
    `,
      [id, req.auth.id]
    );

    if (answerUserOwner[0].id_doctor !== req.auth.id) {
      throw generateError(
        `No tienes permisos para verificar el voto de la respuesta "${answer[0].id}"`,
        404
      );
    }

    //console.log(answerUserOwner);

    // Guardar el voto en la base de datos
    await connection.query(
      `
      UPDATE consultation_answers
      SET verified=?, last_update=UTC_TIMESTAMP
      WHERE id=?
    `,
      [vote, id]
    );

    res.send({
      status: "ok",
      message: `Se guardó el voto (${vote}) a la entrada ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = verifiedVote;
