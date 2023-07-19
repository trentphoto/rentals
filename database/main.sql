-- Path: database/main.sql

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone VARCHAR(22),
    first_name TEXT,
    last_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_per_day INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    total_price INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, confirmed, approved, rejected, canceled
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE reservation_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_id INTEGER NOT NULL,
    inventory_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

CREATE TABLE cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    inventory_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

CREATE TABLE favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    inventory_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- to update tables:
ALTER TABLE reservations
MODIFY COLUMN created_at DATETIME DEFAULT NULL;
ALTER TABLE reservations
MODIFY COLUMN updated_at DATETIME DEFAULT NULL;

-- add rows to inventory
-- NOTE: these are missing the slug column, which is added later

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('cameras', 'Canon EOS 5D Mark IV', 'Canon', 'The Canon EOS 5D Mark IV is a professional-grade full-frame DSLR.', 100, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265915/dccamerarental/5d4_xywzwc.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('cameras', 'Canon EOS 5D Mark III', 'Canon', 'The Canon EOS 5D Mark III is still a great DSLR for photo and video.', 70, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265902/dccamerarental/5d3_jgqzjj.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('cameras', 'Canon EOS R5', 'Canon', 'The Canon EOS R5 is a professional-grade full-frame mirrorless camera.', 200, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265911/dccamerarental/r5_ajmt2y.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('cameras', 'Canon EOS R8', 'Canon', 'The Canon EOS R5 is a professional-grade full-frame mirrorless camera.', 200, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265911/dccamerarental/r5_ajmt2y.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('lenses', 'Canon EF 24-70mm f/2.8L II USM', 'Canon', 'The Canon EF 24-70mm f/2.8L II USM is a professional-grade zoom lens.', 50, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265904/dccamerarental/ef-24-70-f28-ii_xp6uwr.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('more', 'DJI Mavic Air 2', 'DJI', 'Top-of-the-line 4K-capable drone.', 125, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265903/dccamerarental/air_xrchjw.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('lenses', 'Canon RF 50mm f/1.2L USM', 'Canon', 'One of the best prime lenses ever made.', 200, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265915/dccamerarental/rf-50-f12_enuscr.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('lenses', 'Canon RF 70-200mm f/2.8L IS USM', 'Canon', 'Top-of-the-line telephoto zoom lens.', 280, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265914/dccamerarental/rf-70-200-f28_t44s9p.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('lenses', 'Canon RF 15-35mm f/2.8L IS USM', 'Canon', 'Top-of-the-line ultrawide zoom lens.', 180, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265910/dccamerarental/rf-15-35-f28_o0mrar.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('lenses', 'Canon RF 24mm f/1.8 STM', 'Canon', 'Small and lightweight wide prime.', 80, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265908/dccamerarental/rf-24-f18_kfhavc.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('lenses', 'Canon EF 70-200mm f/4L USM', 'Canon', 'Lightweight telephoto zoom.', 80, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265904/dccamerarental/ef-70-200-f4_km1cix.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('lenses', 'Canon EF 16-35mm f/4L USM', 'Canon', 'Lightweight telephoto zoom.', 120, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265904/dccamerarental/ef-16-35-f4_wnoqou.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('more', 'Godox SL-60W Monolight', 'Godox', 'A great general-purpose video monolight.', 70, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265908/dccamerarental/godox_bhagiy.webp');

INSERT INTO inventory (category, name, brand, description, price_per_day, image_url)
VALUES ('more', 'DJI Ronin-S', 'DJI', 'General-purpose gimbal for DSLR and mirrorless cameras.', 40, 'https://res.cloudinary.com/dakfmjumy/image/upload/v1689265912/dccamerarental/ronin_ptxivg.webp');

-- add sample users

INSERT INTO users (username, email, password)
VALUES ('user1', 'test@gmail.com', 'test123');

-- add sample reservation

INSERT INTO reservations (user_id, items, start_date, end_date, total_price, status)
VALUES (1, '1,2,3', '2021-01-01 00:00:00', '2021-01-02 00:00:00', 236, 'pending');

-- change total_price from INTEGER to FLOAT with 2 decimal places

ALTER TABLE reservations
MODIFY COLUMN total_price FLOAT(10,2) NOT NULL;

-- cart query
SELECT inventory.name, users.email FROM cart
INNER JOIN users ON cart.user_id=users.id
INNER JOIN cart_items ON cart.id=cart_items.cart_id
INNER JOIN inventory ON inventory.id=cart_items.inventory_id;
