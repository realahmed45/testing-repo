const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

// Ensure you have the JWT_SECRET environment variable set
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Replace with your secret

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received");
    console.log("Email:", email);
    console.log("Password:", password);

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create and assign a token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Generated Token:", token);

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
