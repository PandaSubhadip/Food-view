
const mongoose = require('mongoose');
const foodUploaderSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },

  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }  ,
  description:{
    type: String,
    required: true,
  }
}, { timestamps: true}

);
module.exports = mongoose.model('FoodUploader', foodUploaderSchema);