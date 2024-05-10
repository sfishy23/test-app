const convertObjectToArray = (object) => {
  let arr = Array.from(Object.entries(object), ([key, value]) => value);
  return arr;
};

export { convertObjectToArray };
