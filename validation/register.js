const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name Should be btween 3 to 30 Character";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
