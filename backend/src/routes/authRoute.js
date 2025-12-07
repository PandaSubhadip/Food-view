const express = require('express');
const router = express.Router();
const { addUser } = require('../controller/authController');
const { LoginUser } = require('../controller/authController');
const {LogoutUser} = require('../controller/authController');
// Import food user controller
const { addFoodUser } = require('../controller/authController');
const { FoodLoginUser } = require('../controller/authController');
const { FoodUserLogout } = require('../controller/authController');

// Route to add a new userauth
router.post('/register', addUser);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);

//Route food user register
router.post('/foodregister', addFoodUser );
router.post('/foodlogin', FoodLoginUser );
router.post('/foodlogout', FoodUserLogout );

module.exports = router;