// backend/pages/api/products/index.js

import db from '../../../db';

export default function handler(req, res) {
    
    // open the database
    const data = db.all("SELECT * FROM inventory", (err, rows) => {
        if (err) {
            // if there is an error, log the error and return 500
            console.log(err);
            res.status(500).json({ error: "Database error" });
        } else {
            // return the data as JSON
            res.status(200).json(rows);
        }
    });
}