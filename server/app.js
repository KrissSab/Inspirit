import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authentication/authRoutes.js";
import corsMiddleware from "./cors.js";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(corsMiddleware);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port 3001`);
});
