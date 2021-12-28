//import
const model = require("../../helper/models");
const mongoUtils = require("../../helper/mongoUtils");
const { resStatusCode } = require("../../helper/constant"); //common data
const logger = require("../../helper/logger");

exports.getUserList = async (req, res) => {
  console.log("in getuserlist");
  try {
    const data = await mongoUtils.getData(
      model.userModel,
      {},
      {
        email: 1,
      }
    );
    console.log(data);

    const response = {
      success: true,
      body: data.length ? data : "NO_DATA_FOUND",
    };
    return res.status(resStatusCode.success).json(response);
  } catch (err) {
    console.log(err);
    logger.error(err.message);
    const response = {
      success: false,
      message: "ERROR",
      error: err.message,
    };
    return res.status(resStatusCode.error.internalServerError).json(response);
  }
};
