const Service = require('../models/Service');

exports.createService = async (req, res) => {
  const { name, description, price, subservices } = req.body;
  const service = new Service({ name, description, price, subservices });
  await service.save();
  res.status(201).json(service);
};

exports.getAllServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};
