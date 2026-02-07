const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
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

// Upload route
router.post('/upload', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    console.log('File uploaded:', req.file.filename);
    const relativeUrl = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${relativeUrl}`;
    
    res.json({ 
      url: relativeUrl, 
      fullUrl,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed: ' + error.message });
  }
});

module.exports = router;
