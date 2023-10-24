let REACT_APP_API_BASE_URL = "https://auctions-api.vercel.app";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  REACT_APP_API_BASE_URL = "http://auctions-api.vercel.app";
}

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/live-auctions/uploads";
const UPLOAD_PRESET = "hgvapsg0";

export { REACT_APP_API_BASE_URL, CLOUDINARY_URL, UPLOAD_PRESET };
