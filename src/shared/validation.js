export const checkValidation = (value, validationRules) => {
  let isValid = true;
  if (validationRules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (validationRules.minLength) {
    isValid = value.length >= validationRules.minLength && isValid;
  }
  if (validationRules.maxLength) {
    isValid = value.length <= validationRules.maxLength && isValid;
  }
  if (validationRules.isEmail) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    isValid = regex.test(value) && isValid;
  }
  if (validationRules.isNumeric) {
    const regex = /^\d+$/;
    isValid = regex.test(value) && isValid;
    console.log(isValid);
  }
  return isValid;
};
