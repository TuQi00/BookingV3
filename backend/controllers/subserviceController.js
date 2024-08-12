const Service = require('../models/Service');

exports.addSubservice = async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, price } = req.body;

  const service = await Service.findById(serviceId);
  if (!service) {
    return res.status(404).json({ msg: 'Service not found' });
  }

  const newSubservice = { name, description, price };
  service.subservices.push(newSubservice);
  await service.save();
  res.status(201).json(service);
};

exports.updateSubservice = async (req, res) => {
  const { serviceId, subserviceId } = req.params;
  const { name, description, price } = req.body;

  const service = await Service.findById(serviceId);
  if (!service) {
    return res.status(404).json({ msg: 'Service not found' });
  }

  const subservice = service.subservices.id(subserviceId);
  if (!subservice) {
    return res.status(404).json({ msg: 'Subservice not found' });
  }

  subservice.name = name || subservice.name;
  subservice.description = description || subservice.description;
  subservice.price = price || subservice.price;

  await service.save();
  res.json(service);
};

exports.deleteSubservice = async (req, res) => {
  const { serviceId, subserviceId } = req.params;

  const service = await Service.findById(serviceId);
  if (!service) {
    return res.status(404).json({ msg: 'Service not found' });
  }

  service.subservices.id(subserviceId).remove();
  await service.save();
  res.json({ msg: 'Subservice removed' });
};

exports.getSubservicesByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const service = await Service.findById(serviceId).select('subservices');
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    res.json(service.subservices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
