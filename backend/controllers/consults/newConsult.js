const { getConnection } = require("../../db");
const { processAndSaveImage, generateError } = require("../../helpers");

const { newConsultSchema } = require("../../validators/consultValidators");

async function newConsult(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    await newConsultSchema.validateAsync(req.body);

    // Sacar de req.body los datos que necesitio
    const { seriusness, symptoms, medicalHistory, description } = req.body;
    const { id } = req.params;

    let savedImageFileName;

    // Procesar la imagen si está en el body
    if (req.files && req.files.image) {
      try {
        // Procesar y guardar imagen
        savedImageFileName = await processAndSaveImage(req.files.image);
      } catch (error) {
        throw generateError(
          "No se pudo procesar la imagen. Inténtalo de nuevo",
          400
        );
      }
    }

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO medical_consultations(date, seriusness, symptoms, medical_history, description, image, id_user, id_doctor)
      VALUES(UTC_TIMESTAMP,?, ?, ?, ?, ?, ?, ?)
      `,
      [
        seriusness,
        symptoms,
        medicalHistory,
        description,
        savedImageFileName,
        req.auth.id,
        id,
      ]
    );

    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        seriusness,
        symptoms,
        medicalHistory,
        description,
        image: savedImageFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newConsult;
