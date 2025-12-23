const foodPartnerModel = require("../model/food_model");
const foodUploadModel = require("../model/food_uploader");

const getFoodPartnerById = async (req, res) => {
  try {
    const id = req.params.id .trim();  ;
    console.log("Food Partner ID:", id);

    const foodPartner = await foodPartnerModel
      .findById(id)
      const foodUploads = await foodUploadModel.find({ foodPartner: id });

     
     

    if (!foodPartner) {
      return res.status(404).json({
        message: "Food partner not found",
       
       

      });
    }

    res.status(200).json({
      success: true,
      foodPartner: {
        ...foodPartner.toObject(),
        foodUploads: foodUploads

        }
    });

  } catch (error) {
    console.error("getFoodPartnerById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getFoodPartnerById };
