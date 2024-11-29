const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mpuSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  fall_details: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Mpu_sensor", mpuSchema);
