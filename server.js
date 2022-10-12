import express from "express";
import { config } from "dotenv";
import dbConnect from "./database/dbConnect.js";
import authRoutes from "./routes/auth/auth.js";
import refreshTokenRoutes from "./routes/auth/refreshToken.js";
import userRoutes from "./routes/auth/users.js";

const app = express();

config();
dbConnect();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
