// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const webhookRouter = require("./routes/webhook");
const adminloginRouter = require("./routes/admin-login");
const createAdmin = require("./routes/create-Admin");
// Initialize Express
const app = express();
const PORT = 8090;
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://realahmedali4:zrJvpUbxPuis9RP1@cluster0.klcoht8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//----middlewares----
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
// Handle successful connection
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

// Handle connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

require("dotenv").config();

// Set up routes
app.use("/webhook", webhookRouter);
app.use("/login", adminloginRouter);

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
