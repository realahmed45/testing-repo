const mongoose = require("mongoose");
const Admin = require("../models/admin");

async function createDefaultAdmin() {
  try {
    const existingAdmin = await Admin.findOne({
      email: "realahmedali4@gmail.com",
    });

    if (!existingAdmin) {
      // Create a new admin with plain text password
      const admin = new Admin({
        email: "realahmedali4@gmail.com",
        password: "1234", // Store plain text password
        name: "Default Admin",
        role: "admin",
      });

      await admin.save();
      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
}

// Call the function to create the default admin
createDefaultAdmin();
