const cloudinary=require("cloudinary").v2;
require("dotenv").config();

 function cloudinaryConnect(){
      try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret:process.env.SECRET_KEY,
            timeout: 120000,
        });
        console.log("Cloudinary connected successfully.");
      }catch(error){
        console.log(error);
        
      }
}
module.exports=cloudinaryConnect;