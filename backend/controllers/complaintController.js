const Complaint = require('../models/Complaint');
const path = require('path');

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'GPS coordinates are required' });
    }

    // Relative path to store in DB
    const imageUrl = `/uploads/${req.file.filename}`;

    // --- FUTURE AI INTEGRATION HOOKS ---
    // 1. Sightengine (Fake Image Check)
    // const isAiGenerated = await checkSightengine(imageUrl);
    // if (isAiGenerated) return res.status(400).json({ message: 'Invalid Image' });

    // 2. YOLO (Waste Detection)
    // const detection = await runYoloDetection(imageUrl);
    // const { detectedObject, wasteLevel } = detection;
    
    // Default values for now (to be replaced by AI)
    const detectedObject = 'none';
    const wasteLevel = 1;
    const isAiGenerated = false;

    const complaint = await Complaint.create({
      user: req.user.id, // Set by auth middleware
      imageUrl,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      },
      isAiGenerated,
      detectedObject,
      wasteLevel,
      status: 'New'
    });

    // 3. Emergency Alert Trigger
    if (wasteLevel === 3) {
      // triggerNmcAlert(complaint);
    }

    res.status(201).json({
      success: true,
      data: complaint
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private
exports.getComplaints = async (req, res) => {
  try {
    let query;

    // Admin can see everything, user can only see their own
    if (req.user.role === 'admin') {
      query = Complaint.find().populate('user', 'name email');
    } else {
      query = Complaint.find({ user: req.user.id });
    }

    const complaints = await query.sort('-createdAt');

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private (Admin Only)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = req.body.status || complaint.status;
    await complaint.save();

    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
