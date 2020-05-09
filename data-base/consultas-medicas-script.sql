USE consultas_medicas;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    dni VARCHAR(9) NOT NULL,
    social_security_number VARCHAR(15) UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    address VARCHAR(100),
    location VARCHAR(50),
    phone_number VARCHAR(12),
    email VARCHAR(50) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    upgrading_date DATETIME
);

CREATE TABLE IF NOT EXISTS medical_consultations (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    seriousness ENUM ('ALTA', 'MEDIA', 'BAJA') NOT NULL,
    description VARCHAR(1000) NOT NULL,
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users (id),
    consultation_date DATETIME,
    id_doctor INT UNSIGNED,
    FOREIGN KEY (id_doctor) REFERENCES doctors (id),
    id_specialists_group INT UNSIGNED,
    FOREIGN KEY (id_specialists_group) REFERENCES specialists_groups (id),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    upgrading_date DATETIME
);

CREATE TABLE IF NOT EXISTS doctors (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    collegiate_number VARCHAR(10) UNIQUE NOT NULL,
    years_of_experience DATE,
    id_specialists_group INT UNSIGNED,
    FOREIGN KEY (id_specialists_group) REFERENCES specialists_groups (id),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	upgrading_date DATETIME
);

CREATE TABLE IF NOT EXISTS specialists_groups (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    speciality_name VARCHAR(50) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	upgrading_date DATETIME
);

CREATE TABLE IF NOT EXISTS consultation_answers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    date DATETIME,
    diagnosis VARCHAR(100) NOT NULL,
    treatment VARCHAR(100)NOT NULL,
    observations VARCHAR(1000) NOT NULL,
    id_doctor INT UNSIGNED,
    FOREIGN KEY (id_doctor) REFERENCES doctors (id),
    id_specialists_group INT UNSIGNED,
    FOREIGN KEY (id_specialists_group) REFERENCES specialists_groups (id),
    id_user_owner INT UNSIGNED,
    FOREIGN KEY (id_user_owner) REFERENCES users (id),
    id_user_rating INT UNSIGNED,
    FOREIGN KEY (id_user_rating) REFERENCES users (id),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	upgrading_date DATETIME
);

SET FOREIGN_KEY_CHECKS =1;