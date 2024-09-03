const Service = require('../models/Service');
const Subservice = require('../models/Subservice');

exports.addSubservice = async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, price } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    const subserviceExists = await Subservice.findOne({ name, service: serviceId });
    if (subserviceExists) {
      return res.status(400).json({ message: 'SubService already exists in this service' });
    }

    const newSubservice = new Subservice({
      name,
      description,
      price,
      service: serviceId,
    });

    await newSubservice.save();

    res.status(201).json(newSubservice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.updateSubservice = async (req, res) => {
  const { subserviceId } = req.params;
  const { name, description, price, serviceId } = req.body;

  try {
    // Kiểm tra xem Subservice có tồn tại không
    const subservice = await Subservice.findById(subserviceId);
    if (!subservice) {
      return res.status(404).json({ msg: 'Subservice not found' });
    }

    // Nếu serviceId được cung cấp, kiểm tra xem Service có tồn tại không
    if (serviceId) {
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ msg: 'Service not found' });
      }
    }

    // Cập nhật thông tin Subservice
    if (name) subservice.name = name;
    if (description) subservice.description = description;
    if (price) subservice.price = price;
    if (serviceId) subservice.service = serviceId;

    await subservice.save();

    res.status(200).json(subservice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteSubservice = async (req, res) => {
  const { subserviceId } = req.params;

  try {
    // Kiểm tra xem Subservice có tồn tại không
    const subservice = await Subservice.findById(subserviceId);
    if (!subservice) {
      return res.status(404).json({ msg: 'Subservice not found' });
    }

    // Xóa Subservice
    await Subservice.findByIdAndDelete(subserviceId);

    res.status(200).json({ msg: 'Subservice removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getSubservicesByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Kiểm tra xem service có tồn tại hay không
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Truy vấn các subservices thuộc serviceId
    const subservices = await Subservice.find({ service: serviceId });

    res.status(200).json(subservices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.detailSubservice = async (req, res) => {
  const { subserviceId } = req.params;

  try {
    // Kiểm tra xem Subservice có tồn tại không
    const subservice = await Subservice.findById(subserviceId);
    if (!subservice) {
      return res.status(404).json({ msg: 'Subservice not found' });
    }

    // Trả về thông tin chi tiết của Subservice
    res.status(200).json(subservice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};