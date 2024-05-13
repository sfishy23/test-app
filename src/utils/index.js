const convertObjectToArray = (object) => {
  let arr = Array.from(Object.entries(object), ([key, value]) => value);
  return arr;
};

const removeLeadingSlash = (string) => {
  return string.replace(/^\//, "");
};

const trimStringAfterSlash = (str) => {
  const slashIndex = str.indexOf("/");
  return slashIndex !== -1 ? str.slice(0, slashIndex) : str;
};

const stringContainsSlash = (str) => {
  return str.includes("/");
};

export {
  convertObjectToArray,
  removeLeadingSlash,
  trimStringAfterSlash,
  stringContainsSlash,
};
