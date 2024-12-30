const Subservice = require("../models/Subservice");
const Service = require("../models/Service");

exports.addSubservice = async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, price } = req.body;

  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: "Service not found" });

  const subservice = await Subservice.create({
    name,
    description,
    price,
    service: serviceId,
  });
  res.status(201).json({ success: true, data: subservice });
};
exports.getDetailSubserviceById = async (req, res) => {
  const { serviceId, subserviceId } = req.params;

  try {
    // Tìm subservice với serviceId và subserviceId
    const subservice = await Subservice.findOne({
      service: serviceId,
      _id: subserviceId,
    });

    // Nếu không tìm thấy subservice
    if (!subservice) {
      return res
        .status(404)
        .json({ success: false, message: "Subservice not found" });
    }

    // Trả về thông tin subservice
    return res.status(200).json({ success: true, data: subservice });
  } catch (error) {
    console.error("Error fetching subservice details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getSubservicesByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const subservices = await Subservice.find({ service: serviceId });

    // Nếu không tìm thấy subservices
    if (!subservices.length) {
      return res
        .status(404)
        .json({ message: "No subservices found for this service" });
    }
    res.status(200).json({ success: true, data: subservices });
  } catch (error) {
    console.error("Error fetching subservices:", error); // Log error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateSubservice = async (req, res) => {
  const { subserviceId } = req.params;
  const { name, description, price } = req.body;

  const subservice = await Subservice.findByIdAndUpdate(
    subserviceId,
    { name, description, price },
    { new: true, runValidators: true }
  );
  if (!subservice)
    return res.status(404).json({ message: "Subservice not found" });
  res.status(200).json({ success: true, data: subservice });
};

exports.deleteSubservice = async (req, res) => {
  const { subserviceId } = req.params;
  const subservice = await Subservice.findByIdAndDelete(subserviceId);
  if (!subservice)
    return res.status(404).json({ message: "Subservice not found" });
  res
    .status(200)
    .json({ success: true, message: "Subservice deleted successfully" });
};
