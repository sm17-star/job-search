import multer from "multer";
const storage=multer.memoryStorage();
export const upload=multer({storage}).single("file");
export const uploadCompanyLogo = multer({ storage }).single("companyLogo");