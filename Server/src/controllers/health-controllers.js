// services/health.service.js
import mongoose from "mongoose";

export const getHealthStatus = async () => {
  const dbState = mongoose.connection.readyState;

  const dbStatusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return {
    uptime: process.uptime(),
    status: dbStatusMap[dbState] || "unknown",
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
  };
};

export const checkDatabase = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return { status: "up" };
  } catch (error) {
    return { status: "down", error: error.message };
  }
};

export const getFullHealth = async () => {
  const db = await checkDatabase();

  return {
    status: db.status === "up" ? "healthy" : "unhealthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: db,
    memory: process.memoryUsage(),
    pid: process.pid,
  };
};
