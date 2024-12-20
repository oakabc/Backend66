-- Create the database (if not already created)
CREATE DATABASE IF NOT EXISTS product_catalog;
USE product_catalog;

-- Drop the table if it exists (for re-creation)
DROP TABLE IF EXISTS products;

-- Create the 'products' table with additional fields
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    details TEXT, -- More detailed information about the product
    stock INT NOT NULL DEFAULT 0 -- Number of items in stock
);

-- Insert sample products
INSERT INTO products (name, description, price, img_url, category, details, stock) VALUES
('Laptop Pro', 'A high-performance laptop for professionals.', 1200.00, '/assets/img/laptop_pro.jpg', 'Electronics', '16GB RAM, 512GB SSD, Intel Core i7. Perfect for work and gaming.', 10),
('Smartphone X', 'A sleek and powerful smartphone.', 799.00, '/assets/img/smartphone_x.jpg', 'Mobile Phones', '6.5-inch OLED display, 128GB storage, 5G-enabled.', 25),
('Gaming Chair', 'Ergonomic chair for long gaming sessions.', 250.00, '/assets/img/gaming_chair.jpg', 'Furniture', 'Adjustable height, lumbar support, and reclining backrest.', 15),
('Wireless Headphones', 'Noise-cancelling headphones with superior sound.', 199.99, '/assets/img/wireless_headphones.jpg', 'Accessories', 'Up to 30 hours of battery life with active noise cancellation.', 50),
('4K Monitor', 'Ultra HD monitor for stunning visuals.', 350.00, '/assets/img/4k_monitor.jpg', 'Electronics', '32-inch UHD display with HDR10 and 1ms response time.', 8),
('Mechanical Keyboard', 'RGB backlit keyboard with tactile switches.', 120.00, '/assets/img/mechanical_keyboard.jpg', 'Accessories', 'Customizable RGB lighting, Cherry MX Blue switches.', 40),
('Fitness Tracker', 'Track your workouts and health data.', 99.99, '/assets/img/fitness_tracker.jpg', 'Wearables', 'Heart rate monitor, sleep tracking, and water-resistant.', 30),
('Action Camera', 'Capture stunning action shots in 4K.', 299.00, '/assets/img/action_camera.jpg', 'Cameras', '4K video recording, waterproof up to 10 meters.', 20),
('Bluetooth Speaker', 'Portable speaker with deep bass.', 149.99, '/assets/img/bluetooth_speaker.jpg', 'Audio', '360-degree sound, 20-hour battery life, and waterproof.', 35),
('Smartwatch Z', 'Advanced smartwatch with fitness features.', 250.00, '/assets/img/smartwatch_z.jpg', 'Wearables', 'Built-in GPS, heart rate monitor, and app notifications.', 12);
