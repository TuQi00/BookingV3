const checkExist = async (Model, query) => {
  try {
    // Tìm kiếm tài liệu trong cơ sở dữ liệu dựa trên query được cung cấp
    const existingDocument = await Model.findOne(query);

    // Nếu tài liệu tồn tại, trả về true, ngược lại trả về false
    return !!existingDocument;
  } catch (error) {
    // Nếu có lỗi xảy ra, ném lỗi để xử lý trong các hàm gọi
    throw new Error(error.message);
  }
};

const checkExistenceMiddleware =
  (Model, queryField, errorMessage) => async (req, res, next) => {
    try {
      const query = {};
      query[queryField] = req.body[queryField];

      const exists = await checkExist(Model, query);

      if (exists) {
        return res.status(400).json({ message: errorMessage });
      }

      next(); // Tiếp tục đến middleware hoặc controller tiếp theo
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Error to check exist" });
    }
  };
module.exports = {checkExistenceMiddleware, checkExist }

