import sqlite3 from "sqlite3";
const sqliteVerbose = sqlite3.verbose();

function initDatabase() {
  return new sqliteVerbose.Database("./users.db", (err) => {
    if (err) return console.error(err.message);
    console.log("Connected successful to db");
  });
}

function closeDatabase(db) {
  db.close((err) => {
    if (err) {
      console.error(`Error with closing the database ${err.message}`);
    } else {
      console.log("Database connection closed");
    }
  });
}

export default { initDatabase, closeDatabase };
