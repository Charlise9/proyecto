const { getConnection } = require("../../db");

const { voteAnswerSchema } = require("../../validators/consultValidators");
const { generateError } = require("../../helpers");

async function voteEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await voteAnswerSchema.validateAsync(req.body);

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
      SELECT MC.id_user
      FROM consultation_answers CA, medical_consultations MC
      WHERE CA.id_medical_consultation = MC.id
            AND CA.id=? AND MC.id_user=?
    `,
      [id, req.auth.id]
    );

    //console.log(answerUserOwner[0].id_user, req.auth.id);

    if (answerUserOwner[0].id_user !== req.auth.id) {
      throw generateError(
        `No tienes permisos para votar la respuesta "${answer[0].id}"`,
        404
      );
    }

    // Guardar el voto en la base de datos
    await connection.query(
      `
      UPDATE consultation_answers
      SET rate=?, last_update=UTC_TIMESTAMP
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

module.exports = voteEntry;
