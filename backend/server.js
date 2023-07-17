const express = require('express');

require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10; // you can adjust this value

const app = express();
const port = process.env.PORT || 3010;

const jwt = require('jsonwebtoken');

// import cors
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();

function dbRequest(query, params, res, callback){
    // query db
    db.all(query, params, (err, rows) => {
        if (err) {
            // if there is an error, log the error and return 500
            console.error(err);

            if (callback) {
                callback({ status: 500, message: { error: "Database error" }});
            } else {
                return res.status(500).json({ error: "Database error" });
            }
        } else {
            // return the data as JSON

            if (callback) {
                callback({ status: 200, message: rows });
            } else {
                res.status(200).json(rows);
            }
        }
    });
}

// define users.find function
const users = {
    find: function(params) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = '" + params.email + "' AND password = '" + params.password + "';";
            db.all(query, (err, rows) => {
                if (err) {
                    // if there is an error, log the error and return 500
                    console.error(err);
                    reject({ error: "Database error" });
                } else {
                    // return the data as JSON
                    resolve(rows[0]);
                }
            });
        });
    }
}

// use json for express
app.use(express.json());

// Create a new SQLite database connection
const db = new sqlite3.Database('../database/main.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the main database.');
    }
    
});

// set cors header for local development
app.use(cors()); // Enables all CORS requests

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send('This is the DC Camera Rental local API.');
});

// ----- inventory apis -----

// get all products
app.get('/products', (req, res) => {
    const query = "SELECT * FROM inventory;";
    dbRequest(query, [], res); // empty array for params
});

// get product by slug
app.get('/products/:slug', (req, res) => {
    const query = "SELECT * FROM inventory WHERE slug = ?";
    params = [req.params.slug];
    dbRequest(query, params, res);
});

// get product by category
app.get('/products/category/:category', (req, res) => {
    const query = "SELECT * FROM inventory WHERE category = ?";
    params = [req.params.category];
    dbRequest(query, params, res);
});

// get product by id
app.get('/products/id/:id', (req, res) => {
    const query = "SELECT * FROM inventory WHERE id = ?";
    params = [req.params.id];
    dbRequest(query, params, res);
});

// get all categories
app.get('/categories', (req, res) => {
    const query = "SELECT * FROM categories;";
    dbRequest(query, [], res);
});    

// ----- user apis -----

// get all users
app.get('/users', (req, res) => {
    const query = "SELECT * FROM users;";
    dbRequest(query, [], res);
});

// get user by id
app.get('/users/:id', (req, res) => {
    const query = "SELECT * FROM users WHERE id = ?";
    params = [req.params.id];
    dbRequest(query, params, res);
});

// get user by token
app.get('/user/current', (req, res) => {

    // get user id from token
    let token = req.headers['authorization']

    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // Forbidden
            return res.status(403).json({valid: false, message: 'Invalid token.'});
        } else {
            const query = "SELECT * FROM users WHERE id = ?";
            params = [data.id];
            dbRequest(query, params, res, (result) => {
                if (result.status == 200) {
                    res.status(200).json({message: `User found.`, success: true, result });
                } else {
                    res.status(500).json({message: `No user found.`, success: false });
                }
            })
        }
    });
});

// get user by email
app.get('/users/email/:email', (req, res) => {
    const query = "SELECT * FROM users WHERE email = ?";
    params = [req.params.email];
    dbRequest(query, params, res);
});

// create user
app.post('/users', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const query = "INSERT INTO users (email, password, created_at, updated_at) VALUES ( ?, ?, ?, ?);";
        time = new Date().toISOString();
        params = [req.body.email, req.body.password, time, time];
        dbRequest(query, params, res);
    });
});

// update user by id
// app.put('/users/:id', (req, res) => {
//     const query = "UPDATE users SET email = ?, password = ?, updated_at = ? WHERE id = ?";
//     time = new Date().toISOString();
//     params = [req.body.email, req.body.password, time, req.params.id];
//     dbRequest(query, params, res);
// });

// update user by token
app.put('/users/update', (req, res) => {
    // get user id from token
    let token = req.headers['authorization']

    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // Forbidden
            return res.status(403).json({valid: false, message: 'Invalid token.'});
        } else {
            try {
                // go through each field to update
                for (let field in req.body) {
                    // if the user has this field, update the field
                    const query = `UPDATE users SET ${field} = ? WHERE id=?`;
                    const params = [req.body[field], data.id]
                    dbRequest(query, params, res, (result) => {
                        if (result.status == 200) {
                            res.status(200).json({message: `User ${field} updated.`, success: true, result });
                        } else {
                            res.status(500).json({message: 'Error updating user.', success: false});  
                        }
                    })
                }
            } catch (error) {
                return res.status(400).json({ error: 'Could not update user' });
            }
        }
    })
})

// delete user by id
app.delete('/users/:id', (req, res) => {
    const query = "DELETE FROM users WHERE id = ?";
    params = [req.params.id];
    dbRequest(query, params, res);
});

// reservation apis
// get reservations by user id
app.get('/reservations/user/:user_id', (req, res) => {
    const query = "SELECT * FROM reservations WHERE user_id = ?";
    params = [req.params.user_id];
    dbRequest(query, params, res);
});

// new reservation
app.post('/reservations', (req, res) => {
    const query = `INSERT INTO reservations (user_id, items, start_date, end_date, total_price, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    time = new Date().toISOString();
    params = [req.body.user_id, req.body.items, req.body.start_date, req.body.end_date, req.body.total_price, req.body.status, time, time];
    dbRequest(query, params, res);
});

// delete reservation by id
app.delete('/reservations/:id', (req, res) => {
    const query = "DELETE FROM reservations WHERE id = ?";
    params = [req.params.id];
    dbRequest(query, params, res);
});

// contact form submit
app.post('/contact', (req, res) => {
    const query = `INSERT INTO contact (name, email, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?);`;
    const time = new Date().toISOString();
    params = [req.body.name, req.body.email, req.body.message, time, time];
    dbRequest(query, params, res);
});

// ----- cart apis -----

const cartQuery = `SELECT inventory.name, cart_items.quantity, cart_items.start_date, cart_items.end_date, inventory.id, inventory.price_per_day, inventory.slug, inventory.image_url FROM cart
INNER JOIN users ON cart.user_id=users.id
INNER JOIN cart_items ON cart.id=cart_items.cart_id
INNER JOIN inventory ON inventory.id=cart_items.inventory_id
WHERE cart.user_id = ?;`;

function addItemToCart(res, cart_id, item_id, start_date, end_date){
    const query = `INSERT INTO cart_items (cart_id, inventory_id, quantity, start_date, end_date) VALUES (?, ?, ?, ?, ?);`;
    const params = [cart_id, item_id, 1, start_date, end_date];
    dbRequest(query, params, res, (data) => {
        if (data.status == 200) {
            res.status(200).json({message: 'Item added to cart.', success: true, data });
        } else {
            res.status(500).json({message: 'Error adding item to cart.', success: false});  
        }
    })
}

// get user's cart
app.get('/cart', (req, res) => {
    // get user id from token
    let token = req.headers['authorization']

    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // Forbidden
            res.status(403).json({valid: false, message: 'Invalid token.'});
        } else {
            // OK - token is valid
            params = [data.id];
            dbRequest(cartQuery, params, res, (data) => {
                if (data.status == 200) {
                    res.status(200).json({message: 'Cart found.', success: true, data });
                } else {
                    res.status(500).json({message: 'Error getting cart.', success: false});
                }
            });
        }
    });
});

// add item to cart
app.post('/cart', (req, res) => {
    
    // get user id from token
    let token = req.headers['authorization']

    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // Forbidden
            res.status(403).json({valid: false, message: 'Invalid token.'});
        } else {
            // OK - token is valid
            // first check if user has a cart - if not, create one
            const query = "SELECT * FROM cart WHERE user_id = ?";
            params = [data.id];
            dbRequest(query, params, res, (reqData) => {
                if (reqData.message.length > 0) {
                    // user has a cart
                    // add item to cart
                    addItemToCart(res, reqData.message[0].id, req.body.product_id, req.body.start_date, req.body.end_date);
                } else {
                    // user does not have a cart
                    // create a cart
                    const cart_query = `INSERT INTO cart (user_id) VALUES (?);`;
                    const cart_params = [data.id];
                    dbRequest(cart_query, cart_params, res, (cartData) => {
                        if (cartData.status == 200) {
                            // add item to cart
                            addItemToCart(res, cartData.message.lastID, req.body.product_id, req.body.start_date, req.body.end_date);
                        } else {
                            res.status(500).json({message: 'Error creating cart.', success: false});
                        }
                    });
                }
            });
        }
    });
});

// delete item from cart
app.delete('/cart/:item_id', (req, res) => {
    const deleteQuery = "DELETE FROM cart_items WHERE inventory_id = ? AND cart_id = (SELECT id FROM cart WHERE user_id = ?);";

    // get user id from token
    let token = req.headers['authorization']

    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
        if (err) {
            // Forbidden
            res.status(403).json({valid: false, message: 'Invalid token.'});
        } else {
            // OK - token is valid
            deleteQueryParams = [req.params.item_id, tokenData.id]; // item_id, user_id
            dbRequest(deleteQuery, deleteQueryParams, res, (deleteData) => { // delete item from cart
                if (deleteData.status == 200) {
                    res.status(200).json({message: 'Item removed from cart.', success: true, deleteData });
                } else {
                    res.status(500).json({message: 'Error removing item from cart.', success: false});
                }
            });
        }
    });
});



// convert cart to reservation
app.post('/cart/checkout', (req, res) => {
    const query = `INSERT INTO reservations (user_id, items, start_date, end_date, total_price, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    const time = new Date().toISOString();
    params = [req.body.user_id, req.body.items, req.body.start_date, req.body.end_date, req.body.total_price, req.body.status, time, time];
    dbRequest(query, params, res);
});

// ----- end cart apis -----

// ----- user favorites apis -----

// get favorites of the user
app.get('/favorites', (req, res) => {
    // get user id from token
    let token = req.headers['authorization']
    
    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // Forbidden
            res.status(403).json({valid: false, message: 'Invalid token.'});
        } else {
            // OK - token is valid
            const query = "SELECT * FROM favorites WHERE user_id = ?";
            params = [data.id];
            dbRequest(query, params, res, (data) => {
                if (data.status == 200) {
                    res.status(200).json({message: 'Favorites found.', success: true, data });
                } else {
                    res.status(500).json({message: 'Error getting favorites.', success: false});
                }
            });
        }
    });
});

// get whether item is in favorites
app.get('/favorites/:item_id', (req, res) => {
    // get user id from token
    let token = req.headers['authorization']
    
    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {

            // Forbidden
            res.status(403).json({valid: false, message: 'Invalid token.'});
        } else {
            // OK - token is valid

            const query = "SELECT * FROM favorites WHERE user_id = ? AND inventory_id = ?";
            params = [data.id, req.params.item_id];
            dbRequest(query, params, res, (reqData) => {
                
                if (reqData.message.length > 0) {
                    res.status(200).json({message: 'Item is a favorite.', isFavorite: true, success: true, reqData });
                } else {
                    res.status(200).json({message: 'Item is not a favorite.', isFavorite: false, success: false});
                }
            });
        }
    });
});

// add item to favorites
app.post('/favorites/add/:item_id', (req, res) => {
    
    // get user id from token
    let token = req.headers['authorization']

    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // Forbidden
            res.status(403).json({valid: false, message: 'Invalid token while trying to add via POST.'});
        } else {
            // OK - token is valid
            const query = `INSERT INTO favorites (user_id, inventory_id) VALUES (?, ?);`;
            params = [data.id, req.params.item_id];
            dbRequest(query, params, res, (reqData) => {
                if (reqData.status == 200) {
                    res.status(200).json({message: 'Item added to favorites.', success: true, reqData });
                } else {
                    res.status(500).json({message: 'Error adding item to favorites.', success: false});
                }
            });
        }
    });
});

// delete item from favorites using user_id and item_id
app.delete('/favorites/remove/:item_id', (req, res) => {

    // get user id from token
    let token = req.headers['authorization']

    // Remove 'Bearer ' from start of string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // Forbidden
            res.status(403).json({valid: false, message: 'Invalid token while trying to delete.'});
        } else {
            // OK - token is valid
            const query = "DELETE FROM favorites WHERE user_id = ? AND inventory_id = ?;";
            params = [data.id, req.params.item_id];
            dbRequest(query, params, res, (reqData) => {
                if (reqData.status == 200) {
                    res.status(200).json({message: 'Item removed from favorites.', success: true, reqData });
                } else {
                    res.status(500).json({message: 'Error removing item from favorites.', success: false});
                }
            });
        }
    });
});


// ----- end user favorites apis -----

// ----- login apis -----

// register
app.post('/register', (req, res) => {

    // Check if email and password are set
    if (!req.body.email || !req.body.password) {
        res.status(400).send('Email and password are required.');
        return;
    }

    // Check if user exists in the database
    db.get("SELECT * FROM users WHERE email = ?", [req.body.email], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal server error.');
        }
        // If user found, send an error
        if (user) {
            res.status(401).json({message: 'User already exists.'});
        } else {
            // If user not found, create a new user
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                
                // Store hash in your password DB.
                // prep query
                const query = "INSERT INTO users (email, password, created_at, updated_at) VALUES ( ?, ?, ?, ?);";
                time = new Date().toISOString();
                params = [req.body.email, hash, time, time];

                // add user to db 
                db.run(query, params, function(err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: "Database error" });
                    } 

                    // if user added successfully, create a JWT
                    const token = jwt.sign({ id: this.lastID }, process.env.JWT_SECRET, { expiresIn: '1h' });

                    // Send the response back to the client
                    return res.json({ 
                        success: "true", 
                        user_id: this.lastID,
                        message: "User created.", 
                        token 
                    });

                });
            });
        }
    });
});

// login
app.post('/login', (req, res) => {

    // Check if email and password are set
    if (!req.body.email || !req.body.password) {
        res.status(400).json({message: 'Email and password are required.'});
        return;
    }

    // Check if user exists in the database
    db.get("SELECT * FROM users WHERE email = ?", [req.body.email], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Internal server error.'});
        }
        // If user not found, send an error
        if (!user) {
            res.status(401).json({message: 'User not found.'});
        } else {
            // If user found, check if password matches
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    // If they match, create a JWT
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    // Send the token back to the client
                    res.json({ message: "Authentication successful!", success: true, token });
                } else {
                    // If they don't match, send an error
                    res.status(401).json({message: 'Incorrect password.'});
                }
            });
        }
    });
});

// verify token
app.get('/verify', (req, res) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const token = bearer[1];
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                // Forbidden
                res.status(403).json({valid: false, message: 'Invalid token.'});
            } else {
                // OK - token is valid
                // Send the data back to the client
                res.json({
                    valid: true,
                    message: 'Successful login.',
                    data
                });
            }
        });
    } else {
        // Forbidden
        res.status(403).json({ valid: false });
    }
});

// logout
// doing this on the client side for now

// app.get('/logout', (req, res) => {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if (typeof bearerHeader !== 'undefined') {
//         // Split at the space
//         const bearer = bearerHeader.split(' ');
//         // Get token from array
//         const token = bearer[1];
//         // Verify token
//         jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//             if (err) {
//                 // Forbidden
//                 res.status(403).json({valid: false, message: 'Invalid token.'});
//                 return;
//             } else {
//                 // OK - token is valid
//                 // Send the data back to the client
//                 res.json({
//                     valid: true,
//                     message: 'Successful logout.',
//                     data
//                 });
//                 return;
//             }
//         });
//     } else {
//         // Forbidden
//         res.status(403).json({ valid: false });
//         return;
//     }
// });     

// ----- end login apis -----

// listen 
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
