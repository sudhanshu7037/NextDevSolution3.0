const multer = require('multer');
const path = require('path');

const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
console.log('Upload directory:', uploadDir);
if (!fs.existsSync(uploadDir)) {
  console.log('Creating upload directory...');
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Upload directory created successfully');
} else {
  console.log('Upload directory already exists');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  },
});

module.exports = upload;
