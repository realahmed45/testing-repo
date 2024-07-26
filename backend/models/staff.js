// models/staff.js
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  phoneNumber: String,
  name: String,
  email: String,
  citizen: Boolean,
  idCardFront: String,
  idCardBack: String,
  passportNumber: String,
  birthday: String,
  address: String,
  gender: String,
  faceImage: String,
  verified: Boolean,
  step: { type: Number, default: 1 },
});

module.exports = mongoose.model("Staff", staffSchema);
