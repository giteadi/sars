CREATE TABLE products (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description text,
    dimension text,
    services text
);

CREATE TABLE reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    total_price DECIMAL(10, 2),
    payment_method VARCHAR(50),
    payment_id VARCHAR(100),
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES userdata(id)
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create the cart table
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Primary key for the cart entry
    user_id INT NOT NULL,                       -- Foreign key referencing the user (from userdata table)
    product_id INT NOT NULL,                    -- Foreign key referencing the product (from products table)
    quantity INT NOT NULL DEFAULT 1,            -- Quantity of the product in the cart
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the product was added to the cart
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp when the cart entry was last updated
    FOREIGN KEY (user_id) REFERENCES userdata(id) ON DELETE CASCADE, -- When the user is deleted, delete the cart items associated with the user
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE -- When the product is deleted, delete the cart items associated with the product
);

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique identifier for each blog
    title VARCHAR(255) NOT NULL,               -- Title of the blog
    image_url VARCHAR(255) NOT NULL,           -- URL of the blog's image
    description TEXT NOT NULL,                 -- Description/content of the blog
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date and time when the blog was created
);
