const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  createComplaint, 
  getComplaints, 
  updateComplaintStatus 
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
});

router.route('/')
  .post(protect, upload.single('image'), createComplaint)
  .get(protect, getComplaints);

router.route('/:id')
  .put(protect, authorize('admin'), updateComplaintStatus);

module.exports = router;
