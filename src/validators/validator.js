function validate(schema, target = "body") {
  return (req, res, next) => {
    const data = req[target];

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "No data found" });
    }
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        msg: `Validation error on ${target}`,
        errors: error.details.map((err) => err.message),
      });
    }
    req[target] = value;
    next();
  };
}

export default validate;
