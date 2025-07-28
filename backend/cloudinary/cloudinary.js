import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

// configure dotenv
dotenv.config();

// cloudinary configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.log(`File not found for upload :- ${localFilePath}`);
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete the temp file using async method
    await fs.promises.unlink(localFilePath);
    // Console.log("Temp file deleted after successfuly from local folder") // For debug

    return response;

    // try part end
  } catch (error) {
    console.log(`Error in uploadOnCloudinary :- ${error}`);

    if (fs.existsSync(localFilePath)) {
      await fs.promises.unlink(localFilePath);
      // console.log("Temp file deleted after failure from local folder")
    }
    return null;
  }
};

export default uploadOnCloudinary;

// existsSync method in Node.js is used to check synchronously whether a file or directory exists at a given path.
