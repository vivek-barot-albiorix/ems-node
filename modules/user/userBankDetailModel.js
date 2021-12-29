const mongoose = require("mongoose");
const validate = require("../../helper/validation");
const l10n = require("jm-ez-l10n");

const userSchema = mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  IFSCCode: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: Number,
    required: true,
  },
  panNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user_bank_details", userSchema);
