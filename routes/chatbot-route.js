// packages
const express = require("express");
const router = express.Router();

// controller
const chatBotController = require("../controllers/chatbot-controller");

// create a chat
router.post("/createchat", chatBotController.createChatBot);

// exports
module.exports = router;
