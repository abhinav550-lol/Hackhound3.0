export default function errorMiddleware(err, req, res, next) {
	let name = err.name || "Error";
	let message = err.message || "Internal Server Error";
	let status = err.status || 500;
  
	if (name === "ValidationError") {
	  message = "Mongoose Validation Failed";
	  status = 400;
	}
  
	console.error(err); 
  
	res.status(status).json({
	  success: false,
	  message,
	});
  }
  