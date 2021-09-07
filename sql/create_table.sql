DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS schedules;
CREATE TABLE IF NOT EXISTS users (
    users_id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    day VARCHAR(255) NOT NULL, 
    start_time TIME(4) NOT NULL, 
    end_time TIME(4) NOT NULL,
    CONSTRAINT fk_users 
    FOREIGN KEY(users_id)
     REFERENCES users(users_id)
    );