require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./route/auth.route");
const profileRoutes = require("./route/profile.route");

const app = express();

require("dotenv").config({ path: "./env/.env" });

const api = process.env.API_URL;
const ip = process.env.IP_ADDRESS;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const { connectDB } = require("./database/index.databsae");
connectDB();

// Use /auth as the base path
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get(api + "/products", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://${ip}:${PORT}`);
});
