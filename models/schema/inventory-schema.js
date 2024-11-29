const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  medicine_name: { type: String, required: true },
  dosage: { type: Number, required: true },
  expiration_date: { type: Date, required: true },
  stock: { type: Number, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Inventory", inventorySchema);
