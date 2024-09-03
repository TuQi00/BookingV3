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
  
module.exports = checkExist;