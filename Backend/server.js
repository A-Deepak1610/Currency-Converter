const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/config/db");
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// Get User Details
app.get("/fetch-details", (req, res) => {
  const query = `SELECT * FROM user_details `;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Failed to data marks" });
    }
    res.status(200).json({ usercredentilas: result });
  });
});

//Add data
app.post("/add-data", (req, res) => {
  const { c1, c2, inamt, r } = req.body;
  const query = `INSERT INTO currency (currency1, currency2,in_amount, result) VALUES (?, ?, ?, ?)`;
  db.query(query, [c1, c2, inamt,r], (err) => {
    if (err) {
      console.log("Database Error:", err);
      return res.status(500).json({ error: "Failed to add marks" });
    }
    res.status(200).json({ msg: "Data added successfully" });
  });
});

//Get  currency data
app.get("/fetch-datas", (req, res) => {
  const query = `SELECT * FROM currency order by id desc `;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Failed to fetch data" });
    }
    res.status(200).json({ currency: result });
  });
});

// Delete data
app.delete("/delete-datas/:id", (req, res) => {
  const id = req.params.id;  // ✅ Correct param name
  const query = `DELETE FROM currency WHERE ID=?`;
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to delete data" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No record found with this ID" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});