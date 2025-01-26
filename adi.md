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


<section className="container mx-auto px-4 py-16">
        <AnimatedSection animation={fadeInLeft}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-400 mb-8">Why Choose SARS WPC Doors?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-xl bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-sm border border-amber-400/20">
            {[
              {
                icon: Medal,
                title: "Premium Quality",
                description: "Superior grade materials ensuring lasting durability",
              },
              {
                icon: Shield,
                title: "10 Year Warranty",
                description: "Comprehensive warranty coverage for peace of mind",
              },
              {
                icon: TreePine,
                title: "Eco-Friendly",
                description: "Sustainable materials with minimal environmental impact",
              },
              {
                icon: Wallet,
                title: "Cost-Effective",
                description: "Excellent value for money with long-term savings",
              },
              {
                icon: Clock,
                title: "Low Maintenance",
                description: "Minimal upkeep required, saving time and effort",
              },
              {
                icon: PaintBucket,
                title: "Wide Color Range",
                description: "Extensive selection of colors to match your style",
              },
              {
                icon: Sparkles,
                title: "UV Resistant",
                description: "Protected against sun damage and discoloration",
              },
              {
                icon: Ruler,
                title: "Custom Sizes",
                description: "Tailored dimensions to fit your specific needs",
              },
              {
                icon: ThumbsUp,
                title: "Easy Installation",
                description: "Simplified fitting process with professional support",
              },
              {
                icon: Leaf,
                title: "Weather Resistant",
                description: "Excellent performance in all weather conditions",
              },
              {
                icon: HeartHandshake,
                title: "Expert Support",
                description: "Dedicated customer service and technical assistance",
              },
              {
                icon: BadgeCheck,
                title: "Certified Quality",
                description: "Meeting international quality standards",
              },
            ].map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-amber-400/10 transition-colors duration-300"
              >
                <div className="mb-4 p-3 rounded-full bg-amber-400/20">
                  <usp.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">{usp.title}</h3>
                <p className="text-sm text-gray-300">{usp.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>