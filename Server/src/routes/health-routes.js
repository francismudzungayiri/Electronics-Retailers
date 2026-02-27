import express from "express";
import {
  getFullHealth,
  checkDatabase,
} from "../controllers/health-controllers.js";

const router = express.Router();

// Liveness → only checks if process runs
router.get("/live", (req, res) => {
  res.status(200).json({ status: "alive" });
});

// Readiness → checks DB availability
router.get("/ready", async (req, res) => {
  const db = await checkDatabase();

  if (db.status === "up") {
    return res.status(200).json({ status: "ready" });
  }

  return res.status(503).json({ status: "not ready" });
});

// Full diagnostic
router.get("/", async (req, res) => {
  const health = await getFullHealth();
  const code = health.status === "healthy" ? 200 : 503;

  res.status(code).json(health);
});

export default router;
