const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name Should be btween 3 to 30 Character";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Enter Valid mail id.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password Must be 6 to 20 Character";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Fields is Required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "email Fields is Required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password Fields is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
