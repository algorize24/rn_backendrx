// packages
const express = require("express");
const router = express.Router();

// express-validator
const { check } = require("express-validator");

// controller
const reminderController = require("../controllers/reminder-controller");

// create a new reminder
router.post("/createreminder", reminderController.createReminder);

// get all reminder
router.get("/", reminderController.getReminder);

// delete a reminder
router.delete("/:id", reminderController.deleteReminder);

// exports
module.exports = router;
