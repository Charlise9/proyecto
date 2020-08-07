const crypto = require("crypto");
const sendgrid = require("@sendgrid/mail");
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

const { format, formatDistanceToNowStrict } = require("date-fns");
const es = require("date-fns/locale/es");

function formatDateToDB(date) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

function formatBirthdayToDB(date) {
  return format(new Date(date), "yyyy-MM-dd");
}

function formatExperience(date) {
  return formatDistanceToNowStrict(new Date(date), "yyyy", { locale: es });
}

function generateError(message, code) {
  const error = new Error(message);
  error.httpStatus = code;
  return error;
}

function randomString(length = 20) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

async function sendMail({ email, title, content }) {
  sendgrid.setApiKey(process.env.SENDGRID_KEY);

  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: title,
    text: content,
    html: `
      <div>
      <h1>${title}</h1>
      <p>${content}</p>
      </div>
    `,
  };

  await sendgrid.send(message);
}

// Definimos directorio de subida de imágenes
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

async function processAndSaveImage(uploadedImage) {
  // Creamos el directorio (con recursive: true por si hay subdirectorios y así no da error)
  await fs.mkdir(imageUploadPath, { recursive: true });

  // Leer la imagen que se subió

  const image = sharp(uploadedImage.data);

  const imageInfo = await image.metadata();

  // Cambiarle el tamaño si es necesario

  if (imageInfo.width > 1000) {
    image.resize(1000);
  }

  // Guardar la imagen en un directorio de subidas
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // Devolver el nombre con el que fue guardada
  return imageFileName;
}

async function deleteUpload(uploadedImage) {
  await fs.unlink(path.join(imageUploadPath, uploadedImage));
}

module.exports = {
  formatDateToDB,
  formatBirthdayToDB,
  formatExperience,
  generateError,
  randomString,
  sendMail,
  processAndSaveImage,
  deleteUpload,
};
