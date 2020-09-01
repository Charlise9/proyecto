require("dotenv").config();

const faker = require("faker/locale/es");
const { getConnection } = require("./db");
const {
  formatDateToDB,
  formatBirthdayToDB
} = require("./helpers");
const { random } = require("lodash");
const { add, format } = require("date-fns");

const abc = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const speciality = [
  "Médico de familia",
  "Endocrinología",
  "Dermatología",
  "Ginecología",
];

const seriousness = ["ALTA", "MEDIA", "BAJA"];

let connection;

async function main() {
  try {
    connection = await getConnection();

    await connection.query(`
        SET FOREIGN_KEY_CHECKS = 0;
        `);

    console.log("Borrando tablas");
    await connection.query("DROP TABLE IF EXISTS users");
    await connection.query("DROP TABLE IF EXISTS doctors");
    await connection.query("DROP TABLE IF EXISTS medical_consultations");
    await connection.query("DROP TABLE IF EXISTS consultation_answers");

    console.log("Creando tablas");

    await connection.query(`
        CREATE TABLE users(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            registration_date DATETIME NOT NULL,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            password TINYTEXT NOT NULL,
            dni VARCHAR(9),
            social_security_number VARCHAR(15),
            birth_date DATE,
            address VARCHAR(100),
            location VARCHAR(50),
            phone_number VARCHAR(12),
            role ENUM('admin', 'normal') DEFAULT "normal" NOT NULL,
            kind_of_user VARCHAR(10) DEFAULT "patient" NOT NULL,
            image TINYTEXT,
            active BOOLEAN DEFAULT false,
            registration_code TINYTEXT,
            password_update_code TINYTEXT,
            last_update DATETIME NOT NULL,
            last_auth_update DATETIME NOT NULL
        );
        `);

    await connection.query(`
        CREATE TABLE doctors(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            registration_date DATETIME NOT NULL,
            name VARCHAR(100),
            email VARCHAR(50) UNIQUE NOT NULL,
            password TINYTEXT NOT NULL,
            dni VARCHAR(9),
            phone_number VARCHAR(12),
            birth_date DATE,
            address VARCHAR(100),
            location VARCHAR(50),
            collegiate_number VARCHAR(10) UNIQUE NOT NULL,
            experience DATE,
            speciality VARCHAR(100),
            image TINYTEXT,
            role ENUM('admin', 'normal') DEFAULT 'normal' NOT NULL,
            kind_of_user VARCHAR(10) DEFAULT "doctor" NOT NULL,
            active BOOLEAN DEFAULT false,
            registration_code TINYTEXT,
            password_update_code TINYTEXT,
            last_update DATETIME NOT NULL,
            last_auth_update DATETIME NOT NULL
        );
        `);

    await connection.query(`
        CREATE TABLE medical_consultations(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            date DATETIME NOT NULL,
            seriusness ENUM('ALTA', 'MEDIA', 'BAJA') NOT NULL,
            symptoms VARCHAR(300),
            medical_history VARCHAR(500),
            description VARCHAR(1000),
            image TINYTEXT,
            document TINYTEXT,
            id_user INT UNSIGNED,
            FOREIGN KEY (id_user) REFERENCES users (id),
            id_doctor INT UNSIGNED,
            FOREIGN KEY (id_doctor) REFERENCES doctors (id)
            
        );
        `);

    await connection.query(`
        CREATE TABLE consultation_answers(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            date DATETIME NOT NULL,
            diagnosis VARCHAR(100) NOT NULL,
            treatment VARCHAR(500) NOT NULL,
            observations VARCHAR(1000) NOT NULL,
            rate BOOLEAN DEFAULT FALSE,
            verified BOOLEAN DEFAULT FALSE,
            last_update DATETIME NOT NULL,
            id_medical_consultation INT UNSIGNED,
            FOREIGN KEY (id_medical_consultation) REFERENCES medical_consultations (id)           
        );
        `);

    await connection.query(`
        SET FOREIGN_KEY_CHECKS = 1;
        `);

    console.log("Creando usuario paciente administrador");

    await connection.query(`
      INSERT INTO users(registration_date, name, email, password, role, active, last_update, last_auth_update)
      VALUES(UTC_TIMESTAMP, "Carlos Barrientos", "carlosbarrientosguillen@gmail.com", SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}", 512), "admin", true, UTC_TIMESTAMP, UTC_TIMESTAMP)
      `);

    console.log("Creando usuario anónimo");

    await connection.query(`
      INSERT INTO users(registration_date, name, email, password, role, active, last_update, last_auth_update)
      VALUES(UTC_TIMESTAMP, "Anónimo", "carlosbarrientos@gmail.com", SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}", 512), "normal", true, UTC_TIMESTAMP, UTC_TIMESTAMP)
      `);

    console.log("Metiendo datos de prueba en users");
    const users = 200;

    for (let index = 0; index < users; index++) {
      const name = faker.name.findName();
      const email = faker.internet.email();
      const dni = random(10000000, 99999999) + abc[random(0, 25)];
      const ssNumber = random(100000000000000, 999999999999999);
      const birth = formatBirthdayToDB(
        faker.date.between("1950-01-01", "2001-12-31")
      );
      const address = faker.address.streetAddress();
      const location = faker.address.city();
      const phoneNumber = random(600000000, 699999999);

      await connection.query(`
      INSERT INTO users(registration_date, name, email, password, dni, social_security_number, birth_date, address, location, phone_number, role, active, last_update, last_auth_update)
      VALUES(UTC_TIMESTAMP, "${name}", "${email}", SHA2("12345678", 512), "${dni}", "${ssNumber}", "${birth}","${address}", "${location}", "${phoneNumber}", "normal", true, UTC_TIMESTAMP, UTC_TIMESTAMP)
      `);
    }

    console.log("Creando usuario médico administrador");

    await connection.query(`
      INSERT INTO doctors(registration_date, name, email, password, collegiate_number, speciality, experience, birth_date, role, active, last_update, last_auth_update)
      VALUES(UTC_TIMESTAMP, "Ágata Vázquez", "carlosbarrientosguillen@gmail.com", SHA2("${
      process.env.DEFAULT_ADMIN_PASSWORD
      }", 512), "${random(
        1000000000,
        9999999999
      )}", "Ginecología", "2020-07-24", "1992-04-16", "admin", true, UTC_TIMESTAMP, UTC_TIMESTAMP)
      `);

    console.log("Metiendo datos de prueba en doctors");
    const doctors = 28;

    for (let index = 0; index < doctors; index++) {
      const name = faker.name.findName();
      const email = faker.internet.email();
      const dni = random(10000000, 99999999) + abc[random(0, 25)];
      const collegiateNumber = random(1000000000, 9999999999);
      const birthDay = faker.date.between("1960-01-01", "1994-12-31");
      const birth = formatBirthdayToDB(birthDay);
      const experience = format(add(birthDay, { years: 25 }), "yyyy-MM-dd");
      /* const yearsExperience = formatExperience(experience); */
      const address = faker.address.streetAddress();
      const location = faker.address.city();
      const phoneNumber = random(600000000, 699999999);


      await connection.query(`
      INSERT INTO doctors(registration_date, name, email, password, dni, phone_number, birth_date, address, location, collegiate_number, experience, speciality, role, active, last_update, last_auth_update)
      VALUES(UTC_TIMESTAMP, "${name}", "${email}", SHA2("12345678", 512), "${dni}", "${phoneNumber}", "${birth}", "${address}", "${location}", "${collegiateNumber}", "${experience}", "${
        speciality[random(0, 3)]
        }", "normal", true, UTC_TIMESTAMP, UTC_TIMESTAMP)
    `);
    }

    console.log("Metiendo datos de prueba en medical_consultations");
    const medicalConsultationsEntries = 350;

    for (let index = 0; index < medicalConsultationsEntries; index++) {
      const date = formatDateToDB(faker.date.recent());

      await connection.query(`
      INSERT INTO medical_consultations(date, seriusness, symptoms, medical_history, description, id_user, id_doctor)
      VALUES("${date}", "${
        seriousness[random(0, 2)]
        }", "${faker.lorem.sentence()}", "${faker.lorem.sentence()}", "${faker.lorem.paragraph()}", "${random(
          2,
          users + 1
        )}", "${random(1, doctors + 1)}")
      `);
    }

    console.log("metiendo datos de prueba en consultation_answers");
    const consultationAnswersEntries = 310;

    for (let index = 0; index < consultationAnswersEntries; index++) {
      const date = formatDateToDB(faker.date.recent());
      const rate = random(0, 1);

      await connection.query(`
      INSERT INTO consultation_answers(date, diagnosis, treatment, observations, rate, verified, last_update, id_medical_consultation)
      VALUES("${date}", "${faker.lorem.sentence()}", "${faker.lorem.sentence()}", "${faker.lorem.sentences()}", "${rate}", 1, UTC_TIMESTAMP, "${
        index + 1
        }")
      `);
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
