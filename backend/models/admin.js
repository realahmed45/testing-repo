const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      default: "staff",
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Method to compare password for login
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return candidatePassword === this.password;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
