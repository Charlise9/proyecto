require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const isUser = require("./middlewares/isUser");
const isDoctor = require("./middlewares/isDoctor");
const isAdmin = require("./middlewares/isAdmin");

// User controllers
const newUser = require("./controllers/users/newUser");
const validateUser = require("./controllers/users/validateUser");
const loginUser = require("./controllers/users/loginUser");
const editUser = require("./controllers/users/editUser");
const editUserPassword = require("./controllers/users/editUserPassword");
const recoverUserPassword = require("./controllers/users/recoverUserPassword");
const resetUserPassword = require("./controllers/users/resetUserPassword");
const deleteUser = require("./controllers/users/deleteUser");

// Doctor controllers
const newDoctor = require("./controllers/doctors/newDoctor");
const validateDoctor = require("./controllers/doctors/validateDoctor");
const loginDoctor = require("./controllers/doctors/loginDoctor");
const editDoctor = require("./controllers/doctors/editDoctor");
const editDoctorPassword = require("./controllers/doctors/editDoctorPassword");
const recoverDoctorPassword = require("./controllers/doctors/recoverDoctorPassword");
const resetDoctorPassword = require("./controllers/doctors/resetDoctorPassword");

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

// Registrarse (HECHO)
// POST - /users
// Público
app.post("/users", newUser);

// Validación de usuarios registrados (HECHO)
// GET - /users/validate/:code
// Público
app.get("/users/validate/:code", validateUser);

// Login de usuarios registrados (HECHO)
// POST - /users/login
// Público
app.post("/users/login", loginUser);

// Ver información de un médico
// Solo la información de un médico, es público excepto el historial, que sólo lo pueden ver los usuarios registrados

// Editar datos de usuario (HECHO)
// PUT - /users/:id
// Sólo el propio usuario o usuario admin
app.put("/users/:id", isUser, editUser);

// Editar password de usuario (HECHO)
// POST - /users/:id/password
// Sólo el propio usuario o el usuario admin
app.post("/users/:id/password", isUser, editUserPassword);

// Enviar código de reset de password (HECHO)
// POST - /users/recover-password
// Público
app.post("/users/recover-password", recoverUserPassword);

// Resetear password de usuario (HECHO)
// POST - /users/recover-password
// Público
app.post("/users/reset-password", resetUserPassword);

// Borrar un usuario (HECHO)
// DELETE - /users/:id
// Sólo el usuario admin
app.delete("/users/:id", isUser, isAdmin, deleteUser);

// MÉDICO

// Registrarse  (HECHO)
// POST - /doctors
// Público
app.post("/doctors", newDoctor);

// Validación de usuarios registrados (HECHO)
// GET - /doctors/validate/:code
// Público
app.get("/doctors/validate/:code", validateDoctor);

// Login de usuarios registrados (HECHO)
// POST - /doctors/login
// Público
app.post("/doctors/login", loginDoctor);

// Ver información de un paciente
// Solo la información de un paciente, sólo médicos registrados

// Editar datos de doctor (HECHO)
// PUT - /doctors/:id
// Sólo el propio usuario o usuario admin
app.put("/doctors/:id", isDoctor, editDoctor);

// Editar password de doctor (HECHO)
// POST - /doctors/:id/password
// Sólo el propio doctor o el doctor admin
app.post("/doctors/:id/password", isDoctor, editDoctorPassword);

// Enviar código de reset de password (HECHO)
// POST - /doctors/recover-password
// Público
app.post("/doctors/recover-password", recoverDoctorPassword);

// Resetear password de doctor (HECHO)
// POST - /doctors/recover-password
// Público
app.post("/doctors/reset-password", resetDoctorPassword);

// Borrar un doctor
// Sólo el doctor admin

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
