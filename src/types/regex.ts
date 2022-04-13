export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = {
  length: /^.{8,}$/,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  numbers: /[0-9]/,
  specialChar: /[●!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
};
