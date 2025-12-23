const express = require('express');
const router = express.Router();
const {foodAuthMiddleware} = require('../Middleware/authMidleware');
const {getFoodPartnerById} = require('../controller/FoodPartnerControler');

// Route to get food partner details by ID
router.get('/:id', 
   

    getFoodPartnerById

 )

module.exports = router;