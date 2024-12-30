const Service = require("../models/Service");
const asyncHandler = require("../middleware/asyncHandler");

exports.createService = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const service = await Service.create({ name, description });
  res.status(201).json({ success: true, service });
});

exports.getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.json({ success: true, services });
});

exports.detailService = asyncHandler(async (req, res) => {
  const { service } = req.params;
  const serviceFound = await Service.findById(service);
  if (!serviceFound)
    return res.status(404).json({ message: "Service not found" });
  res.json({ success: true, data: serviceFound });
});

exports.updateService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const updateData = req.body;
  const service = await Service.findByIdAndUpdate(serviceId, updateData, {
    new: true,
  });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json({ success: true, service });
});

exports.deleteService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findByIdAndDelete(serviceId);
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json({ success: true, message: "Service deleted successfully" });
});
