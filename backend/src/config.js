const config = {
	FRONTEND_URI:process.env.FRONTEND_URI || "http://localhost:5173",
	BACKEND_PORT: process.env.BACKEND_PORT || 3000,
	SESSION_SECRET : process.env.SESSION_SECRET,
	MONGO_URI : process.env.MONGO_URI,
	FILEUPLOAD_LOCATION: process.env.FILEUPLOAD_LOCATION
}	

export default config;