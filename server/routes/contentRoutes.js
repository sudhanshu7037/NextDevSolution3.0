const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { cloudinaryUpload, cloudinary } = require('../middleware/cloudinaryMiddleware');
const {
  getContent, updateContent,
  getServices, createService, deleteService,
  getPackages, createPackage,
  getProducts, createProduct,
  getTechs, createTech
} = require('../controllers/contentController');

// Public routes
router.get('/', getContent);
router.get('/services', getServices);
router.get('/packages', getPackages);
router.get('/products', getProducts);
router.get('/techs', getTechs);

// Private routes (admin)
router.post('/', protect, updateContent);
router.post('/services', protect, createService);
router.delete('/services/:id', protect, deleteService);
router.post('/packages', protect, createPackage);
router.post('/products', protect, createProduct);
router.post('/techs', protect, createTech);

// Upload route - Cloudinary version
router.post('/upload', protect, cloudinaryUpload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    console.log('File uploaded to Cloudinary:', req.file.path);
    
    res.json({ 
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename, // Cloudinary public ID
      originalname: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Upload failed: ' + error.message });
  }
});

// Test Cloudinary configuration
router.get('/cloudinary-test', (req, res) => {
  try {
    const config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'Not set',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'Not set'
    };
    res.json({ 
      message: 'Cloudinary configuration loaded',
      config: config,
      cloudinary_ready: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error testing Cloudinary config', error: error.message });
  }
});

// Legacy local upload route (keep for backward compatibility)
router.post('/upload/local', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    console.log('File uploaded locally:', req.file.filename);
    const relativeUrl = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${relativeUrl}`;
    
    res.json({ 
      url: relativeUrl, 
      fullUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    console.error('Local upload error:', error);
    res.status(500).json({ message: 'Upload failed: ' + error.message });
  }
});

module.exports = router;
