const { getConnection } = require("../../db");

async function getDoctorAnswers(req, res, next) {
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
        SELECT CA.id AS answer_id, CA.date, D.name, D.id AS doctor_id, D.speciality, MC.id AS consult_id, MC.seriusness, CA.diagnosis, CA.treatment, CA.observations, CA.rate, CA.verified
        FROM consultation_answers CA, medical_consultations MC, doctors D
        WHERE CA.id_medical_consultation = MC.id
            AND MC.id_doctor = D.id
            AND D.id=?
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

module.exports = getDoctorAnswers;