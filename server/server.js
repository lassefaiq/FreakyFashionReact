const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Get all products
app.get("/products", (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ✅ Get a single product by ID
app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Product not found" });
        res.json(row);
    });
});

// ✅ Delete a product by ID
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        // This means no rows were affected — ID wasn't found
        if (this.changes === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    });
});

// ✅ Add a new product
app.post("/products", (req, res) => {
    const { name, sku, description, price, image } = req.body;

    // ✅ Log incoming data
    console.log("👉 Incoming POST data:", req.body);

    // ✅ Check for missing fields (optional safety)
    if (!name || !sku || !description || !price || !image) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    db.run(
        "INSERT INTO products (name, sku, description, price, image) VALUES (?, ?, ?, ?, ?)",
        [name, sku, description, price, image],
        function (err) {
            if (err) {
                console.error("❌ Error inserting product:", err.message);
                return res.status(500).json({ error: err.message });
            }
            console.log("✅ Product added with ID:", this.lastID);
            res.status(201).json({ message: "Product added successfully", id: this.lastID });
        }
    );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
