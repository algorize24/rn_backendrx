const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maxSchema = new Schema({
  heart_rate: { type: Number, required: true },
  glucose: { type: Number, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Max_sensor", maxSchema);
