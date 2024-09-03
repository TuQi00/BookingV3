const Service = require('../models/Service');
const checkExist = require('../helper/checkExist')

exports.createService = async (req, res) => {
  const { name, description } = req.body;
  try {
    // Sử dụng hàm checkExist để kiểm tra nếu dịch vụ đã tồn tại
    const serviceExists = await checkExist(Service, { name });

    if (serviceExists) {
      return res.status(400).json({
        message: 'Service already exists',
      });
    }

    // Nếu dịch vụ chưa tồn tại, tiếp tục tạo dịch vụ mới
    const service = new Service({ name, description });
    await service.save();

    // Trả về phản hồi thành công
    res.status(201).json(service);
  } catch (error) {
    // Xử lý lỗi nếu có vấn đề trong quá trình tạo dịch vụ
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.updateService = async (req, res) => {
  const { serviceId } = req.params; // Lấy ID từ route params
  const { name, description } = req.body; // Lấy dữ liệu từ request body

  try {
    // Kiểm tra xem dịch vụ có tồn tại hay không bằng ID
    const serviceExists = await checkExist(Service, { _id: serviceId });

    if (!serviceExists) {
      return res.status(404).json({
        message: 'Service not found',
      });
    }

    // Cập nhật dịch vụ với các thông tin mới
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { name, description },
      { new: true, runValidators: true } // `new: true` trả về tài liệu đã được cập nhật
    );

    // Trả về phản hồi thành công với dữ liệu của dịch vụ đã được cập nhật
    res.status(200).json({
      message: 'Service updated successfully',
      service: updatedService,
    });
  } catch (error) {
    // Xử lý lỗi nếu có vấn đề trong quá trình cập nhật
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  const { serviceId } = req.params; // Lấy ID từ route params

  try {
    // Kiểm tra xem dịch vụ có tồn tại hay không bằng ID
    const serviceExists = await checkExist(Service, { _id: serviceId });

    if (!serviceExists) {
      return res.status(404).json({
        message: 'Service not found',
      });
    }

    // Xóa dịch vụ khỏi cơ sở dữ liệu
    await Service.findByIdAndDelete(serviceId);

    // Trả về phản hồi thành công
    res.status(200).json({
      message: 'Service deleted successfully',
    });
  } catch (error) {
    // Xử lý lỗi nếu có vấn đề trong quá trình xóa
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.getAllServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.detailService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Kiểm tra xem Service có tồn tại không
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Trả về thông tin chi tiết của Service
    res.status(200).json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};