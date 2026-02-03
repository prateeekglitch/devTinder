const validateEditAllowed = (data) => {
  const allowedFields = ["name", "gender", "age", "photoUrl", "about"];

  return Object.keys(data)
    .filter((key) => data[key] !== undefined)
    .every((key) => allowedFields.includes(key));
};

module.exports = { validateEditAllowed };
