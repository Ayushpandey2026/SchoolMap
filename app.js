/**
 * app.js
 * Express application setup — middleware and routes
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const schoolRoutes = require("./routes/schoolRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running",
    version: "1.0.0",
    endpoints: {
      addSchool: "POST /addSchool",
      listSchools: "GET /listSchools?latitude=&longitude=",
    },
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/", schoolRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
