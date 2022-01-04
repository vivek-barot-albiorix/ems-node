//import
const model = require("../../helper/models");
const mongoUtils = require("../../helper/mongoUtils");
const { resStatusCode } = require("../../helper/constant"); //common data
const logger = require("../../helper/logger");

exports.getUserList = async (req, res) => {
  try {
    const result = await model.userPersonalDetailModel.aggregate([
      {
        $lookup: {
          from: "user_bank_details",
          localField: "_id",
          foreignField: "userId",
          as: "BankDetails",
        },
      },
      {
        $lookup: {
          from: "user_professional_details",
          localField: "_id",
          foreignField: "userId",
          as: "UserProfessionalDetails",
        },
      },
    ]);
    const response = {
      success: true,
      body: result.length ? result : "NO_DATA_FOUND",
    };
    return res.status(resStatusCode.success).json(response);
  } catch (err) {
    logger.error(err.message);
    const response = {
      success: false,
      message: "ERROR",
      error: err.message,
    };
    return res.status(resStatusCode.error.internalServerError).json(response);
  }
};

exports.addUser = async (req, res) => {
  const email = req.body.personalDetails.email.toLowerCase().trim();
  try {
    // check email Exist or not
    const emailExist = await mongoUtils.checkExist(
      model.userPersonalDetailModel,
      {
        email: email,
      }
    );
    if (emailExist) {
      const response = {
        success: false,
        message: "ADD_USER_FAIL",
        error: "ERR_EMAIL_EXIST",
      };
      return res.json(response);
    } else {
      // insert data
      const userPersonalDetailResult = await mongoUtils.insert(
        model.userPersonalDetailModel,
        req.body.personalDetails
      );
      const userBankDetailResult = await mongoUtils.insert(
        model.userBankDetailModel,
        {
          userId: userPersonalDetailResult._id,
          ...req.body.bankDetails,
        }
      );
      const userProfessionalDetailResult = await mongoUtils.insert(
        model.userProfessionalDetailModel,
        {
          userId: userPersonalDetailResult._id,
          ...req.body.professionalDetails,
        }
      );
      const response = {
        success: true,
        message: "USER_ADDED",
        body: {
          userPersonalDetailResult,
          userBankDetailResult,
          userProfessionalDetailResult,
        },
      };
      return res.status(resStatusCode.created).json(response);
    }
  } catch (err) {
    const response = {
      success: false,
      err: err.message,
      message: "ADD_USER_FAIL",
    };
    return res.status(resStatusCode.error.internalServerError).json(response);
  }
};
