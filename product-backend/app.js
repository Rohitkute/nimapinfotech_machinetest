const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* ---------------- CATEGORY APIs ---------------- */

// Add Category
app.post("/categories", (req, res) => {
  const sql = "INSERT INTO Category (CategoryName) VALUES (?)";
  db.query(sql, [req.body.CategoryName], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error adding category");
    } else {
      res.send("Category Added Successfully");
    }
  });
});

// Get Categories
app.get("/categories", (req, res) => {
  db.query("SELECT * FROM Category", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching categories");
    } else {
      res.json(rows);
    }
  });
});

/* ---------------- PRODUCT APIs ---------------- */

// Add Product
app.post("/products", (req, res) => {
  const { ProductName, CategoryId } = req.body;
  const sql =
    "INSERT INTO Product (ProductName, CategoryId) VALUES (?, ?)";

  db.query(sql, [ProductName, CategoryId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error adding product");
    } else {
      res.send("Product Added Successfully");
    }
  });
});

// Get Products with Pagination
app.get("/products", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;

  const offset = (page - 1) * size;

  const sql = `
    SELECT p.ProductId, p.ProductName,
           c.CategoryId, c.CategoryName
    FROM Product p
    JOIN Category c ON p.CategoryId = c.CategoryId
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [size, offset], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching products");
    } else {
      res.json(rows);
    }
  });
});

/* ---------------- SERVER ---------------- */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
