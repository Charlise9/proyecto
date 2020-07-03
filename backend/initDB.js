require("dotenv").config();

//const faker = require("faker/locale/es");
const { getConnection } = require("./db");
//const { formatDateToDB } = require("./helpers");
//const { random } = require("lodash");

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
            name VARCHAR(50),
            surname VARCHAR(50),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            dni VARCHAR(9),
            social_security_number VARCHAR(15),
            birth_date DATE,
            address VARCHAR(100),
            location VARCHAR(50),
            phone_number VARCHAR(12),
            role ENUM('admin', 'normal') DEFAULT "normal" NOT NULL,
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
            name VARCHAR(50),
            surname VARCHAR(50),
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            dni VARCHAR(9),
            phone_number VARCHAR(12),
            birth_date DATE,
            address VARCHAR(100),
            location VARCHAR(50),
            collegiate_number VARCHAR(10) UNIQUE NOT NULL,
            years_of_experience DATE,
            speciality VARCHAR(100),
            role ENUM('admin', 'normal') DEFAULT 'normal' NOT NULL,
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
            description VARCHAR(1000),
            symptoms VARCHAR(100),
            medical_history VARCHAR(500),
            id_user INT UNSIGNED,
            FOREIGN KEY (id_user) REFERENCES users (id),
            id_doctor INT UNSIGNED,
            FOREIGN KEY (id_doctor) REFERENCES doctors (id),
            id_consultation_answer INT UNSIGNED,
            FOREIGN KEY (id_consultation_answer) REFERENCES consultation_answers (id)
        );
        `);

    await connection.query(`
        CREATE TABLE consultation_answers(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            date DATETIME NOT NULL,
            diagnosis VARCHAR(100) NOT NULL,
            treatment VARCHAR(100) NOT NULL,
            observations VARCHAR(1000) NOT NULL,
            rate ENUM('El tratamiento me curó', 'El tratamiento no me curó'),
            verified ENUM('El paciente se curó', 'El paciente no se curó'),
            last_update DATETIME NOT NULL            
        );
        `);

    await connection.query(`
        SET FOREIGN_KEY_CHECKS = 1;
        `);

    console.log("Creando usuario administrador");
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
