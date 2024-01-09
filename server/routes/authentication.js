const express = require("express");
const bcrypt = require("bcrypt");
const database = require("../database.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, birth_date, address, phone_number } =
    req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const db = database.initDatabase();
  const insertValues = `
        INSERT INTO users (username, email, password_hash, birth_date, address, phone_number)
        VALUES (?,?,?,?,?,?)
    `;

  db.run(
    insertValues,
    [username, email, passwordHash, birth_date, address, phone_number],
    (err) => {
      if (err) {
        console.error(`Error with inserting user: ${err.message}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("User registered successfully");
        res.status(201).json({ message: "User registered successfully" });
      }
      database.closeDatabase(db);
    },
  );
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const db = database.initDatabase();
  const selectQuery = "SELECT * FROM users WHERE email = ?";

  db.get(selectQuery, [email], async (err, user) => {
    if (err) {
      console.error(`Error with retrieving user ${err.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (!user) {
      console.log("User not found");
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (passwordMatch) {
        console.log("User logged in successfully");
        res.status(201).json({ message: "Login successful" });
      } else {
        console.log("Invalid password");
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
    database.closeDatabase(db);
  });
});

module.exports = router;
