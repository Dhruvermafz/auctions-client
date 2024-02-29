let REACT_APP_API_BASE_URL = "http://localhost:8000";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  REACT_APP_API_BASE_URL = "http://localhost:8000";
}

export { REACT_APP_API_BASE_URL };
