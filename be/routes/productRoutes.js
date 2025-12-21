const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');

const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsByBrand,
  updateProduct
} = require('../controllers/productController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    { folder: 'products' },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Upload ảnh thất bại" });
      }
      req.body.image = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

router.post(
  '/',
  authenticateUser,
  authorizeRoles('admin'),
  upload.single('image'),
  uploadToCloudinary,
  createProduct
);

router.put(
  '/:id',
  authenticateUser,
  authorizeRoles('admin'),
  upload.single('image'),
  uploadToCloudinary,
  updateProduct
);

router.get('/', getAllProducts);
router.get('/brand/:brand', getProductsByBrand);
router.get('/:id', getProductById);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
