const { getConnection } = require("../../db");

async function listDoctors(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    // Sacamos las posibles opciones del querystring:
    // search: para listar solo las entradas que contengan su valor en place o description
    // order: para ordenar el listado por voteaverage, place o date
    // direction: para la dirección de la ordenación desc o asc
    const { search, order, direction } = req.query;

    let orderBy;
    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    switch (order) {
      case "name":
        orderBy = "name";
        break;
      default:
        orderBy = "experience";
    }

    let queryResults;

    if (search) {
      queryResults = await connection.query(
        `   
            SELECT doctors.id, doctors.name, doctors.experience, doctors.speciality
            FROM doctors
            WHERE name LIKE ? OR speciality LIKE ?
            ORDER BY ${orderBy} ${orderDirection}
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      queryResults = await connection.query(
        `SELECT doctors.id, doctors.name, doctors.experience, doctors.speciality
        FROM doctors
        ORDER BY ${orderBy} ${orderDirection}`
      );
    }

    const [result] = queryResults;

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

module.exports = listDoctors;
