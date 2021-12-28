const mongoose = require("mongoose");
const validate = require("../../helper/validation");
// const helper = require("../../helper/commonUtils");
const l10n = require("jm-ez-l10n");
const { userStatus } = require("../../helper/constant");

const userSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("user", userSchema);
