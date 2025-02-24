import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, file) => ({
    folder: "blog_app",
    // format: "png",
    public_id: `${Date.now()}-${path.parse(file.originalname).name}`,
  }),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

export default upload;
