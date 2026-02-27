import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db-index.js";
import http from "http";
import mongoose from "mongoose";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

//graceful shutdown why ? to close db connection and server properly when
// the process receives a termination signal (like SIGINT or SIGTERM)
// to prevent data loss, ensure all ongoing requests are completed, and
// free up resources before the application exits.
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
});

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
