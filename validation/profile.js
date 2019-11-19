const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle Length between 2 to 40 Character";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle Is Required ! Write some text";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status Fields is Required";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills is required!";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Website URL is Not Valid";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "twitter URL is Not Valid";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "facebook URL is Not Valid";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "youtube URL is Not Valid";
    }
  }
  if (!isEmpty(data.linkdin)) {
    if (!Validator.isURL(data.linkdin)) {
      errors.linkdin = "linkdin URL is Not Valid";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "instagram URL is Not Valid";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
