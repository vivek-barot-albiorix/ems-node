const mongoose = require("mongoose");
const validate = require("../../helper/validation");
const l10n = require("jm-ez-l10n");

const userSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_personal_details",
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  expYears: {
    type: String,
    required: true,
  },
  expMonths: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user_professional_details", userSchema);
