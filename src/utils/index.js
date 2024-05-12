const convertObjectToArray = (object) => {
  let arr = Array.from(Object.entries(object), ([key, value]) => value);
  return arr;
};

const removeLeadingSlash = (string) => {
  return string.replace(/^\//, "");
};

export { convertObjectToArray, removeLeadingSlash };
