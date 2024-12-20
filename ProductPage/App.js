const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Use your DB password
    database: 'product_catalog'
});

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static assets
app.use(express.static('public'));

// Route to fetch products
app.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;

        // Render the EJS template with products data
        console.log(JSON.stringify(results))
        res.render('product_page', { products: results });
    });
});

// Route for product details
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;

    // Query the database for the specific product
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, result) => {
        if (err) throw err;

        // Check if the product exists
        if (result.length > 0) {
            res.render('product_details', { product: result[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
