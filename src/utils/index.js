const convertObjectToArray = (object) => {
  let arr = Array.from(Object.entries(object), ([key, value]) => value);
  return arr;
};

const removeLeadingSlash = (string) => {
  return string.replace(/^\//, "");
};

const stringContainsSlash = (str) => {
  return str.includes("/");
};

const removeAfterLastSlash = (str, inclSlash) => {
  const lastSlashIndex = str.lastIndexOf("/");
  if (inclSlash) {
    return str.slice(0, lastSlashIndex);
  } else {
    return str.slice(0, lastSlashIndex + 1);
  }
};

export {
  convertObjectToArray,
  removeLeadingSlash,
  stringContainsSlash,
  removeAfterLastSlash,
};
