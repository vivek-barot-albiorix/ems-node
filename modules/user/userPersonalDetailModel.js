const mongoose = require("mongoose");
const validate = require("../../helper/validation");
const l10n = require("jm-ez-l10n");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, l10n.t("ERR_EMAIL_EXIST")],
    required: [true, l10n.t("REQ_EMAIL")],
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 255,
    validate: {
      validator: validate.validateCtr.validEmail,
      message: l10n.t("ERR_VALID_EMAIL"),
    },
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user_personal_details", userSchema);
