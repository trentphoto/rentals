// backend/pages/api/products/[slug].js

import db from '../../../db';

export default function handler(req, res) {
    // get the slug from the url
    const { slug } = req.query;

    // perform a database lookup using slug
    db.get("SELECT * FROM inventory WHERE slug = ?", slug, (err, row) => {
        if (err) {
            // if there is an error, log the error and return 500
            console.log(err);
            res.status(500).json({ error: "Database error" });
        } else if (row) {
            // if there is a product matching the slug, return 200
            res.status(200).json(row);
        } else {
            // if there is no product matching the slug, return 404
            res.status(404).json({ error: "Product not found" });
        }
    });
}