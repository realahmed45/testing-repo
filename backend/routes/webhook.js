// routes/webhook.js
const express = require("express");
const axios = require("axios");
const Staff = require("../models/staff");
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  const { from, text } = message;

  let user = await Staff.findOne({ phoneNumber: from });

  if (!user) {
    user = new Staff({ phoneNumber: from });
  }

  const response = await handleMessage(user, text);

  // Simulate sending a response
  console.log(`Sending message to ${from}: ${response}`);

  // Save user data
  await user.save();

  res.sendStatus(200);
});

async function handleMessage(user, text) {
  switch (user.step) {
    case 1:
      if (text.toLowerCase() === "hi") {
        user.step = 2;
        return "Hi, thanks for visiting Mymytanahland. How can I help you today?\n1. I want to buy or rent land\n2. I want to sell, rent, or register my land\n3. I want to recommend\n4. More\n5. staff";
      }
      break;
    case 2:
      if (text === "staff") {
        user.step = 3;
        return "Please let us know your full name";
      }
      break;
    case 3:
      user.name = text;
      user.step = 4;
      return 'Please provide your valid email (type "none" if you don’t have one)';
    case 4:
      user.email = text === "none" ? null : text;
      user.step = 5;
      return "Are you an Indonesian citizen?\n1. Yes\n2. No";
    case 5:
      user.citizen = text === "1";
      user.step = 6;
      return "Please attach your ID card or passport front image";
    case 6:
      user.idCardFront = text;
      user.step = 7;
      return "Please attach your ID card or passport back image";
    case 7:
      user.idCardBack = text;
      user.step = 8;
      return "Enter your ID card/passport number";
    case 8:
      user.passportNumber = text;
      user.step = 9;
      return "Please mention your birthday (dd/mm/yyyy)";
    case 9:
      user.birthday = text;
      user.step = 10;
      return "Your exact address";
    case 10:
      user.address = text;
      user.step = 11;
      return "Please select your gender\n1. Male\n2. Female\n3. Other";
    case 11:
      user.gender = text;
      user.step = 12;
      return "Attach face image";
    case 12:
      user.faceImage = text;
      user.verified = false;
      await user.save();
      return "Thank you. Your details have been submitted successfully. We will let you know once you are verified by the Admin";
    case 13:
      return "Hi Mark, you have been verified as our staff. This is your 4-digit code 1234. Feel free to start registering lands on our chatbot.";
    default:
      return 'Invalid option. Please type "Hi" to start.';
  }
}

module.exports = router;
