require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const likeRoutes = require("./src/routes/likeRoutes");
const authRoutes = require("./src/routes/authRoutes");

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database synchronized");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
