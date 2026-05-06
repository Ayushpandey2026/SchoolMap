/**
 * server.js
 * Entry point — starts Express server after DB connection is confirmed
 */

require("dotenv").config();
const app = require("./app");
const { testConnection } = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 School Management API ready`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

startServer();
