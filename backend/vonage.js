const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "your_api_key",
  apiSecret: "your_api_secret",
  applicationId: "your_application_id",
  privateKey: "path_to_your_private_key",
});

module.exports = vonage;
