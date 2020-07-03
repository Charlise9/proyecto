USE consultas_medicas;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    dni VARCHAR(9),
    social_security_number VARCHAR(15),
    birth_date DATE,
    address VARCHAR(100),
    location VARCHAR(50),
    phone_number VARCHAR(12),
    role ENUM('admin', 'normal'),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    upgrading_date DATETIME
);

CREATE TABLE IF NOT EXISTS medical_consultations (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    seriousness ENUM ('ALTA', 'MEDIA', 'BAJA') NOT NULL,
    description VARCHAR(1000) NOT NULL,
    symptoms VARCHAR(200),
    medical_history VARCHAR(500),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users (id),
    date DATETIME,
    id_doctor INT UNSIGNED,
    FOREIGN KEY (id_doctor) REFERENCES doctors (id),
    id_consultation_answer INT UNSIGNED,
    FOREIGN KEY (id_consultation_answer) REFERENCES consultation_answers (id),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    upgrading_date DATETIME
);

CREATE TABLE IF NOT EXISTS doctors (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    dni VARCHAR(9),
    phone_number VARCHAR(12),
    birth_date DATE,
    address VARCHAR(100),
    location VARCHAR(50),
    collegiate_number VARCHAR(10) UNIQUE NOT NULL,
    years_of_experience DATE,
    speciality VARCHAR(100),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	upgrading_date DATETIME
);


CREATE TABLE IF NOT EXISTS consultation_answers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    date DATETIME,
    diagnosis VARCHAR(100) NOT NULL,
    treatment VARCHAR(100)NOT NULL,
    observations VARCHAR(1000) NOT NULL,
    rate ENUM('El tratamiento me curó', 'El tratamiento no me curó'),
    verified ENUM('El paciente se curó', 'El paciente no se curó'),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	upgrading_date DATETIME
);

SET FOREIGN_KEY_CHECKS =1;