const foodUploder = require('../model/food_uploader');
const {uploadFile} = require('../Service/Filestorage/storage_service');
const foodModel = require('../model/user_model');

const uploadFood = async (req, res) => {
    try {
              const videoUploadResponse = await uploadFile(req.file.buffer, req.file.originalname);
        // Create new food uploader document
       
        const newFood = new foodUploder({
            Name: req.body.Name,
            video: videoUploadResponse.url,
            description: req.body.description,
            foodPartner: req.foodUser._id
        });
       
        await newFood.save();
        res.status(201).json({ message: 'Food video uploaded successfully', food: newFood });
    } catch (error) {
        console.error('uploadFood error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const GetfoodVideos = async (req, res) => {
    try {
        const foodVideos = await foodUploder.find({})
        
        res.status(201).json({ foodVideos });
    } catch (error) {
        console.error('GetfoodVideos error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { uploadFood, GetfoodVideos };
