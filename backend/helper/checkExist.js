// Cấu trúc checkExist.js
const checkExistenceMiddleware = (modelName, field, errorMessage) => {
  return async (req, res, next) => {
    try {
      const value = req.body[field] || req.params[field] || req.query[field]; // Lấy giá trị từ body, params hoặc query
      const Model = require(`../models/${modelName}`); // Đảm bảo import đúng model từ thư mục models

      const exists = await Model.findOne({ [field]: value });
      if (exists) {
        return res.status(400).json({ message: errorMessage });
      }
      next(); // Nếu không tồn tại, tiếp tục qua bước tiếp theo
    } catch (err) {
      console.error("Error checking existence:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = { checkExistenceMiddleware };
