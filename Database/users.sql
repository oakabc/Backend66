-- Create the database
CREATE DATABASE pim;

-- Use the database
USE pim;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into the users table
INSERT INTO users (first_name, last_name, email, password)
VALUES 
('John', 'Doe', 'john.doe@example.com', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password789'),
('Bob', 'Brown', 'bob.brown@example.com', 'password321');

-- Query the users table to verify the data
SELECT * FROM users;
