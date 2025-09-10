import express from "express";
const app = express();
import cors from "cors";
import { db } from "./data/database.js";

app.use(cors()); // izinkan semua origin
app.use(express.json());

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
