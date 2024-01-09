const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authentication");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port 3001`);
});
