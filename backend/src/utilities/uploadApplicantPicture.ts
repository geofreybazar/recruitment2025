import { v2 as cloudinary } from "cloudinary";
import config from "./config";

export const uploadApplicantPicture = async (image: string) => {
  cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.uploader.upload(image, {
    folder: "applicants",
  });
  const publicId = result.public_id;
  const optimizeUrl = cloudinary.url(result.public_id, {
    fetch_format: "auto",
    quality: "auto",
  });

  return { publicId, optimizeUrl };
};
