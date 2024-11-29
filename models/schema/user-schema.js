const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  max_sensor: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Max_sensor" },
  ],
  mpu_sensor: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Mpu_sensor" },
  ],
  contact: [{ type: mongoose.Types.ObjectId, required: true, ref: "Contact" }],
  inventory: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Inventory" },
  ],
  reminder: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Reminder" },
  ],
  doctor: [{ type: mongoose.Types.ObjectId, required: true, ref: "Doctor" }],
});

module.exports = mongoose.model("User", userSchema);
