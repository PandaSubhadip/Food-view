const User = require('../model/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const foodUser = require('../model/food_model');

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Generate JWT token
        const secret = process.env.JWT_SECRET || 'change_this_secret';
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('addUser error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const LoginUser = async (req, res) => {
    // Login user logic to be implemented
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    } else {
        // compaire password and generate token
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
         const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
         res.cookie('token', token, { httpOnly: true });
         res.status(200).json({ message: 'Login successful', token });
    }
}

const LogoutUser = async (req, res) => {
    // Logout user logic to be implemented
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

// Food user registration 
const addFoodUser = async (req, res) => {
    // Food user registration logic to be implemented
    try{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }
    const existingFoodUser = await foodUser.findOne({ email });
    if (existingFoodUser) {
        return res.status(400).json({ message: 'Food user already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newFoodUser = new foodUser({
        name,
        email,
        password: hashedPassword                    
    });
    await newFoodUser.save();
    const token = jwt.sign({ id: newFoodUser._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'Food user registered successfully' });

} catch (error) {
   
    res.status(500).json({ message: 'Server error' });
}
};
const FoodLoginUser = async (req, res) => {
    // Food user logout logic to be implemented
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    } else {
        // compaire password and generate token
        const foodUserExist = await foodUser.findOne({ email });
        if (!foodUserExist) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, foodUserExist.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
            const token = jwt.sign({ id: foodUserExist._id }, process.env.JWT_SECRET);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ message: 'Food Login successful', token });
    }

};

const FoodUserLogout = async (req, res) => {
    // Food user logout logic to be implemented
    res.clearCookie('token');
    res.status(200).json({ message: 'Food user logout successful' });
}
module.exports = { addUser ,LoginUser, LogoutUser, addFoodUser,FoodLoginUser, FoodUserLogout };