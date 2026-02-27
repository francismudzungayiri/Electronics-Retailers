import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./routes/health-routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();

//basic express confiugurations
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));

//cors configurations
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//global error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "ECONNREFUSED") {
    return res.status(503).json({ message: "Service unavailable" });
  }

  res.status(500).json({ message: "Internal server error" });
});

app.use("/api/v1/health", healthRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
