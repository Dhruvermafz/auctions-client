let REACT_APP_API_BASE_URL = "https://auction-api-xbhd.onrender.com/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  REACT_APP_API_BASE_URL = "http://localhost:4000";
}

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/live-auctions/uploads";
const UPLOAD_PRESET = "hgvapsg0";

export { REACT_APP_API_BASE_URL, CLOUDINARY_URL, UPLOAD_PRESET };
