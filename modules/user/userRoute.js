const express = require("express");
const validationRules = require("./userValidationRules");
const middleware = require("../../helper/middleware");
const router = express.Router();

const userController = require("./userController");

console.log("in userRoute");

//to validate request
router.use((req, res, next) => {
  if (req.method !== "OPTIONS") {
    let routePath = req.path;
    req.validations = validationRules.get(routePath);
    middleware.reqValidator(req, res, next);
  } else {
    next();
  }
});

router.use([
  (req, res, next) => {
    // Add Urls to by pass auth protection
    req.byPassRoute = ["/getUserList"];
    next();
  },
]);

//routes for user controller
router.get("/getUserList", userController.getUserList);

module.exports = router;
