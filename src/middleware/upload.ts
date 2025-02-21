import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, file) => ({
    folder: "blog_app",
    format: "png",
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});
const upload = multer({ storage });

export default upload;
