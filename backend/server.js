require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

// Middlewares iniciales
// Log de peticiones a la consola
app.use(morgan("dev"));
// Procesado de body tipo json
app.use(bodyParser.json());
// Procesado de body tipo form-data
app.use(fileUpload());

// USUARIOS

// PACIENTE

// Registrarse
// Público

// Validación de usuarios registrados
// Público

// Login de usuarios registrados
// Público

// Ver información de un médico
// Solo la información de un médico, es público excepto el historial, que sólo lo pueden ver los usuarios registrados

// Borrar un usuario
// Sólo el usuario admin

// Editar datos de usuario
// Sólo el propio usuario

// Editar password de usuario
// Sólo el propio usuario o el usuario admin

// Enviar código de reset de password
// Público

// Resetear password de usuario
// Público

// MÉDICO

// Registrarse
// Público

// Validación de usuarios registrados
// Público

// Login de usuarios registrados
// Público

// Ver información de un médico
// Solo la información de un paciente, sólo médicos registrados

// Borrar un usuario
// Sólo el usuario admin

// Editar datos de usuario
// Sólo el propio usuario

// Editar password de usuario
// Sólo el propio usuario o el usuario admin

// Enviar código de reset de password
// Público

// Resetear password de usuario
// Público

// ACCIONES RELACIONADAS CON LAS CONSULTAS

// PACIENTES

// Realizar una búsqueda
// Público

// Ver info de médico (seleccionar al médico y ver su perfil)
// Público

// Ver historial de consultas del médico
// Sólo pacientes registrados, médico y admin

// Enviar consulta al médico
// Sólo pacientes registrados

// Ver historial de consultas hechas
// Sólo pacientes registrados

// Ver historial de respuestas de consultas recibidas
// Sólo pacientes registrados

// Puntuar una respuesta
// Sólo el paciente que realizó la consulta

// MÉDICOS

// Ver consultas pendientes de resolver
// Sólo médicos

// Responder a una consulta
// Sólo médicos

// Ver hisorial de consultas
// Sólo el médico al que fue dirigida la consulta

// Ver respuesta dada a X consulta
// Sólo el médico que la hizo

// Ver puntuación de la consulta
// Sólo el médico que la hizo

// Verificar una nota de paciente
// Sólo el médico que respondió la consulta

// Middleware finales

// Error middleware
app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Not found
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port}`);
});
