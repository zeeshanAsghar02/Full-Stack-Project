const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const imagekit = require('../config/imagekit');

// @desc    Upload image to ImageKit
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { file, fileName } = req.body;

    if (!file || !fileName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both file and fileName'
      });
    }

    console.log('Attempting to upload to ImageKit:', {
      fileName,
      fileLength: file.length,
      hasImageKitConfig: !!imagekit
    });

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: file, // base64 string
      fileName: fileName,
      folder: '/auis-events'
    });

    console.log('ImageKit upload successful:', {
      url: result.url,
      fileId: result.fileId
    });

    res.status(200).json({
      success: true,
      url: result.url
    });
  } catch (error) {
    console.error('Upload error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
});

module.exports = router; 