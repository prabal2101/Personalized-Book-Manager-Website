require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { testConnection } = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running");
});

// START SERVER ONLY AFTER DB CONNECTS
const PORT = process.env.PORT || 8000;

(async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})();
