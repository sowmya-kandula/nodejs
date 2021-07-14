//import cloudinary,multer(middleware),multer-storage-cloudinary
const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary")

const multer = require("multer")

//configureing cloudinary
cloudinary.config({

    cloud_name: "sowmya",
      api_key: "158958128746638",
    api_secret: "I8Vaip3y7dCHLo4Okg-mbs8rsnU",
  
  });

//configuring multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
        return {

        folder: 'backend',       
        public_id: file.fieldname + '-' + Date.now()

    }},

});

//configuring multer 
var upload = multer({ storage: storage });

module.exports=upload