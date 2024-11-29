// ----firebase----
const admin = require("../firebase/firebase");

// ----express-validator----
const { validationResult } = require("express-validator");

// ----model----
const Reminder = require("../models/schema/reminder-schema");
const HttpError = require("../models/error/http-error");
const User = require("../models/schema/user-schema");

// ----controllers----

// http://localhost:5000/api/reminder/createreminder - POST
const createReminder = async (req, res, next) => {
  console.log("Incoming reminder data:", req.body);

  // request body, things that i want to get from client.
  const { medicineName, frequency, specificDays, dosage, times } = req.body;

  // access the authorization header from the request.
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  // if idToken does not exist.
  if (!idToken) {
    const error = new HttpError("Authorization token missing", 401);
    return next(error);
  }

  try {
    // verify the token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    // find the firebaseUid in User collection
    const user = await User.findOne({ firebaseUid });

    // if firebaseUid does not exist.
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    // create an object to pass in the mongodb.
    // here we use the everyday flag to determine whether we save frequency or specificDays
    const reminder = new Reminder({
      medicineName,
      frequency,
      specificDays,
      dosage,
      times,
      userId: user._id,
    });

    // save that object to reminder collection
    await reminder.save();

    // add reminder reference to user's reminder array
    user.reminder.push(reminder._id);
    await user.save(); // save it in user collection

    // if everything is success.
    res.status(201);
    res.json({ message: "Reminder created successfully", reminder });
  } catch (err) {
    // if failed...

    console.error("Error creating reminder:", err);

    const error = new HttpError(
      "Failed to create a Reminder. Please try again later",
      500
    );
    return next(error);
  }
};

// http://localhost:5000/api/reminder - GET
const getReminder = async (req, res, next) => {
  // get list of reminder by certain user.

  // access the authorization header from request.
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  // if idToken does not exist.
  if (!idToken) {
    return next(new HttpError("Authorization token missing", 401));
  }

  // verification...
  try {
    // verify the token and get the uid
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    // find the firebaseUid in the User collection
    const user = await User.findOne({ firebaseUid });

    // if that user does not exist
    if (!user) {
      return next(new HttpError("User not found. Please try again later", 404));
    }

    // find all reminder for a certain user id
    const reminder = await Reminder.find({ userId: user._id });

    // if success...
    res.status(200);
    res.json({ reminder });
  } catch (err) {
    const error = new HttpError(
      "Failed to retrieve reminder. Please try again later",
      500
    );

    return next(error);
  }
};

// http://localhost:5000/api/reminder/:id - DELETE
const deleteReminder = async (req, res, next) => {
  const reminderId = req.params.id;

  try {
    // Fetch the reminder
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
      return next(new HttpError("Reminder not found", 404));
    }

    // Update the user document to remove the reminder
    const userUpdate = await User.findByIdAndUpdate(reminder.userId, {
      $pull: { reminder: reminderId },
    });

    if (!userUpdate) {
      return next(
        new HttpError(
          "User not found. Reminder not removed from user data.",
          404
        )
      );
    }

    // Delete the reminder from the Reminder collection
    const deleteResult = await reminder.deleteOne();

    // Send success response
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (err) {
    console.error("Error during reminder deletion:", err.message);

    const error = new HttpError(
      "Deleting reminder failed. Please try again later",
      500
    );

    return next(error);
  }
};

// ----exports----
exports.createReminder = createReminder;
exports.getReminder = getReminder;
exports.deleteReminder = deleteReminder;
