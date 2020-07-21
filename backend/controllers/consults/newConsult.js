const { getConnection } = require("../../db");
const { processAndSaveImage, generateError } = require("../../helpers");
const path = require('path');
const fs = require("fs").promises;
const uuid = require('uuid');

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

    let fileName;

    if (req.files && req.files.document) {
      try {
        const fileUploadPath = path.join(process.cwd(), process.env.FILES_DIR);

        await fs.mkdir(fileUploadPath, { recursive: true });

        fileName = `${uuid.v1()}_${req.files.document.name}`;

        if (req.files.document.size > 10000000) {
          throw generateError("El documento no puede ocupar más de 10MB", 415)
        } else { await fs.writeFile(path.join(fileUploadPath, fileName), req.files.document.data) }



      } catch (error) {
        throw generateError("No se pudo procesar el documento o tiene un peso superior a . Inténtalo de nuevo", 400);
      }
    }

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO medical_consultations(date, seriusness, symptoms, medical_history, description, image, document, id_user, id_doctor)
      VALUES(UTC_TIMESTAMP,?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        seriusness,
        symptoms,
        medicalHistory,
        description,
        savedImageFileName,
        fileName,
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
        document: fileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newConsult;
