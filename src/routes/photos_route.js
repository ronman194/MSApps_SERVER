const express = require('express');
const router = express.Router();
const photos = require('../controllers/photos.js');

// route for get all photos
router.get('/', photos.getAllPhotos)

// route for get all photos by category
router.get('/category', photos.getPhotosByCategory)

module.exports = router;