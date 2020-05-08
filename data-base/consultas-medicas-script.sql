USE consultas_medicas;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    surname VARCHAR(50),
    login VARCHAR(50),
    password VARCHAR(50),
    dni VARCHAR(9),
    social_security_number VARCHAR(15),
    birth_date DATE,
    address VARCHAR(100),
    location VARCHAR(50),
    phone_number VARCHAR(12),
    email VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS medical_consultations (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    seriousness ENUM ('ALTA', 'MEDIA', 'BAJA'),
    description VARCHAR(1000),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users (id),
    consultation_date DATETIME,
    id_doctor INT UNSIGNED,
    FOREIGN KEY (id_doctor) REFERENCES doctors (id),
    id_specialists_group INT UNSIGNED,
    FOREIGN KEY (id_specialists_group) REFERENCES specialists_groups (id)
);

CREATE TABLE IF NOT EXISTS doctors (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    surname VARCHAR(50),
    collegiate_number VARCHAR(10),
    years_of_experience INT,
    id_specialists_group INT UNSIGNED,
    FOREIGN KEY (id_specialists_group) REFERENCES specialists_groups (id)
);

CREATE TABLE IF NOT EXISTS specialists_groups (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    speciality_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS consultation_answers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    date DATETIME,
    diagnosis VARCHAR(100),
    treatment VARCHAR(100),
    observations VARCHAR(1000),
    id_doctor INT UNSIGNED,
    FOREIGN KEY (id_doctor) REFERENCES doctors (id),
    id_specialists_group INT UNSIGNED,
    FOREIGN KEY (id_specialists_group) REFERENCES specialists_groups (id),
    id_user_owner INT UNSIGNED,
    FOREIGN KEY (id_user_owner) REFERENCES users (id),
    id_user_rating INT UNSIGNED,
    FOREIGN KEY (id_user_rating) REFERENCES users (id)
);

SET FOREIGN_KEY_CHECKS =1;