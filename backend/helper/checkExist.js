const checkExistenceMiddleware = (Model, field, errorMessage) => {
  return async (req, res, next) => {
    const value = req.body[field];
    const exists = await Model.findOne({ [field]: value });

    if (exists) {
      return res.status(400).json({ message: errorMessage });
    }

    next();
  };
};

module.exports = { checkExistenceMiddleware };
