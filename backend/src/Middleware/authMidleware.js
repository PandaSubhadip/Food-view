const food = require('../model/food_model');
const jwt = require('jsonwebtoken');
const user_model = require('../model/user_model');

const foodAuthMiddleware = async (req, res, next) => {
    const token = req.params.token || req.cookies.token || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'User not login' });
        
    }
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const foodUser = await food.findById(decoded.id);
        if (!foodUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.foodUser = foodUser;
        next();


    }catch (error) {
        console.error('foodAuthMiddleware error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const FoodUser = async (req, res, next) => {
    const token = req.params.token || req.cookies.token || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'User not login' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  

        const foodUser = await user_model.findById(decoded.id);
        if (!foodUser) {
          return res.status(401).json({ message: 'User not found' });
        }
        req.foodUser = foodUser;
        next();
    } catch (error) {
        console.error('FoodUser error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { foodAuthMiddleware, FoodUser };