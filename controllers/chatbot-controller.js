// develop soon.

// ---- firebase ----
const admin = require("../firebase/firebase");

// ---- model ----
const HttpError = require("../models/error/http-error");
const User = require("../models/schema/user-schema");

// http://localhost:5000/api/chat/createchat - POST
const createChatBot = async (req, res, next) => {};

// ----exports----
exports.createChatBot = createChatBot;
