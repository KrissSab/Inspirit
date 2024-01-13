import bcrypt from "bcrypt";
import database from "../../database.js";
import generateAccessToken from "./tokenGenerator.js";
import { validationResult } from "express-validator";

class authController {
  async registration(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation errors", errors });
    }

    const { username, email, password, birth_date, address, phone_number } =
      req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const db = database.initDatabase();
    const insertValues = `
                INSERT INTO users (username, email, password_hash, birth_date, address, phone_number, role)
                VALUES (?,?,?,?,?,?,"user")
                `;
    try {
      await new Promise((resolve, reject) => {
        db.run(
          insertValues,
          [username, email, passwordHash, birth_date, address, phone_number],
          function (err) {
            if (err) {
              console.error(`Error with inserting user: ${err.message}`);
              reject(err);
            } else {
              const accessToken = generateAccessToken(this.lastID, "user");
              res.status(201).json({
                message: "User registered successfully",
                accessToken: accessToken,
              });
              resolve(); //User registered successfully
            }
          },
        );
      });
    } catch (error) {
      if (error) {
        console.error(`Error with inserting user: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } finally {
      database.closeDatabase(db);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    const db = database.initDatabase();
    const selectQuery = "SELECT * FROM users WHERE email = ?";
    try {
      await new Promise((resolve, reject) => {
        db.get(selectQuery, [email], async (err, user) => {
          if (!user) {
            console.log("User not found");
            res.status(401).json({ error: "Invalid email or password" });
            reject(err);
          } else {
            const passwordMatch = await bcrypt.compare(
              password,
              user.password_hash,
            );
            if (passwordMatch) {
              const accessToken = generateAccessToken(user.user_id, "user");
              res.status(200).json({
                message: "Login successful",
                accessToken: accessToken,
              });
              resolve(); //User logged in successfully
            } else {
              console.log("Invalid password");
              res.status(401).json({ error: "Invalid email or password" });
              reject(err);
            }
          }
        });
      });
    } catch (error) {
      if (error) {
        console.error(`Error with retrieving user ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } finally {
      database.closeDatabase(db);
    }
  }
}

export default new authController();
