export const onlyNumbers = (value) => {
  return /^[0-9]*$/.test(value);
};

export const onlyAlphabets = (value) => {
  return /^[a-zA-Z]*$/.test(value);
};

export const validatePhoneNumber = (value) => {
  const onlyNumbers = /^[0-9]*$/;
  if (!onlyNumbers.test(value)) {
    return false;
  }
  return true;
};
