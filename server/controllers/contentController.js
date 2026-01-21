const Content = require('../models/Content');
const Service = require('../models/Service');
const Package = require('../models/Package');
const Product = require('../models/Product');
const Tech = require('../models/Tech');

// Content Controllers
const getContent = async (req, res) => {
  try {
    const content = await Content.find({});
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContent = async (req, res) => {
  const { page, section, data } = req.body;
  try {
    let content = await Content.findOne({ page: page || 'home', section });
    if (content) {
      content.data = data;
      await content.save();
    } else {
      content = await Content.create({ page: page || 'home', section, data });
    }
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Service Controllers
const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Package Controllers
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Product Controllers
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Tech Controllers
const getTechs = async (req, res) => {
  try {
    const techs = await Tech.find({});
    res.json(techs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTech = async (req, res) => {
  try {
    const tech = await Tech.create(req.body);
    res.status(201).json(tech);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContent, updateContent,
  getServices, createService, deleteService,
  getPackages, createPackage,
  getProducts, createProduct,
  getTechs, createTech
};
