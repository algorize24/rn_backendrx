const admin = require("firebase-admin");

const serviceAccount = require("../reminderxx-firebase-adminsdk-wd9qr-caf407e004.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
