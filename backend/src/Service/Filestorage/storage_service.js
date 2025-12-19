let ImageKit = require("imagekit");

let imagekit = new ImageKit({
    publicKey : process.env.IMG_KIT_PUBLIC_KEY,
    privateKey : process.env.IMG_KIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMG_KIT_URL_ENDPOINT
});
const uploadFile = async (fileBuffer, fileName) => {
  const response = await  imagekit.upload({
    file : fileBuffer, //required
    fileName : fileName,   //required
    });
    return response;



}


module.exports = { uploadFile };
