CREATE DATABASE click_fit;
USE click_fit;

CREATE TABLE users (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    active TINYINT default 1
);

INSERT INTO users (email, password, type, active)

VALUES
('admin1@gmail.com', '@Admin1', 'admin', '1'),
('user1@gmail.com', '@User1', 'user', '1'),
('user2@gmail.com', '@User2', 'user', '1'),
('user3@gmail.com', '@User3', 'user', '1'),
