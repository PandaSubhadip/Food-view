const express = require('express');
const multer = require('multer');
const router = express.Router();



const { uploadFood } = require('../controller/foodControler');

const {foodAuthMiddleware } = require('../Middleware/authMidleware');
const {FoodUser}= require('../Middleware/authMidleware');
const { GetfoodVideos } = require('../controller/foodControler');

const upload = multer({
    storage: multer.memoryStorage(),
});

// Route to upload food video
router.post(
  '/upload',
  upload.single('video'),  // 👈 FIRST
  foodAuthMiddleware,
  uploadFood
);


router.get('/videos',
  FoodUser,
  GetfoodVideos
);

module.exports = router;