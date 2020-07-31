require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');

const isUser = require("./middlewares/isUser");
const isDoctor = require("./middlewares/isDoctor");
const isAdmin = require("./middlewares/isAdmin");

// User controllers
const newUser = require("./controllers/users/newUser");
const validateUser = require("./controllers/users/validateUser");
const loginUser = require("./controllers/users/loginUser");
const getUser = require("./controllers/users/getUser");
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
const getPatientInfo = require("./controllers/doctors/getPatientInfo");

// Consults controllers
const listDoctors = require("./controllers/consults/listDoctors");
const getDoctor = require("./controllers/consults/getDoctor");
const getDoctorConsults = require("./controllers/consults/getDoctorConsults");
const newConsult = require("./controllers/consults/newConsult");
const getUserConsults = require("./controllers/consults/getUserConsults");
const getUnansweredConsults = require("./controllers/consults/getUnansweredConsults");
const newAnswer = require("./controllers/consults/newAnswer");
const getUserAnswers = require("./controllers/consults/getUserAnswers");
const getAnswer = require("./controllers/consults/getAnswer");
const voteAnswer = require("./controllers/consults/voteAnswer");
const verifiedVote = require("./controllers/consults/verifiedVote");

const app = express();

// Middlewares iniciales
// Log de peticiones a la consola
app.use(morgan("dev"));
// Procesado de body tipo json
app.use(bodyParser.json());
// Procesado de body tipo form-data
app.use(fileUpload());
// Procesando el cors
app.use(cors());

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

// Ver información de un usuario
// GET - /users/:id
// Sólo para usuarios registrados
// Pero si el usuario es el mismo o admin debería mostrar toda la información
app.get("/users/:id", isUser, getUser);

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

// Ver información de un paciente (HECHO)
// GET - /users/:id
// Solo la información de un paciente, sólo médicos registrados
app.get("/users/info/:id", isDoctor, getPatientInfo);

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

// ACCIONES RELACIONADAS CON LAS CONSULTAS

// PACIENTES

// Realizar una búsqueda de médicos (HECHO)
// GET - /doctors
// Público
app.get("/doctors", listDoctors);

// Ver info de médico (seleccionar al médico y ver su perfil) (HECHO)
// GET - /doctors/:id
// Público
app.get("/doctors/:id", getDoctor);

// Ver historial de consultas del médico (HECHO)
// GET - /doctors/:id/consults
// Sólo pacientes registrados, médico y admin
app.get("/doctors/:id/consults", isUser, getDoctorConsults);

// Enviar consulta al médico (HECHO)
// POST - /doctors/:id/consults
// Sólo pacientes registrados
app.post("/doctors/:id/consults", isUser, newConsult);

// Ver historial de consultas hechas (HECHO)
// GET - /users/:id/consults
// Sólo pacientes registrados
app.get("/users/:id/consults", isUser, getUserConsults);

// Ver historial de respuestas de consultas recibidas (HECHO)
// GET -/users/:id/answers
// Sólo pacientes registrados
app.get("/users/:id/answers", isUser, getUserAnswers);

// Puntuar una respuesta (HECHO)
// POST -/users/:id/answers/vote
// Sólo el paciente que realizó la consulta
app.post("/users/answers/:id/vote", isUser, voteAnswer);

// MÉDICOS

// Ver consultas pendientes de resolver (HECHO)
// GET - /doctors/:id/consults/unanswered
// Sólo médicos
app.get("/doctors/:id/consults/unanswered", isDoctor, getUnansweredConsults);

// Responder a una consulta (HECHA)
// POST - /consults/:id/answers
// Sólo médicos
app.post("/consults/:id/answers", isDoctor, newAnswer);

// Ver hisorial de consultas (HECHO)
// GET - /doctors/:id/consults
// Sólo el médico al que fue dirigida la consulta
app.get("/doctors/:id/consults", isDoctor, getDoctorConsults);

// Ver respuesta dada a X consulta (HECHO)
// GET -/consults/:id/answers
// Sólo el médico que la hizo
app.get("/consults/:id_doctor/:id_consult/answers", isDoctor, getAnswer);

// Verificar una nota de paciente
// POST -/doctors/:id/answers/verified
// Sólo el médico que respondió la consulta
app.post("/doctors/answers/:id/verified", isDoctor, verifiedVote);

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
