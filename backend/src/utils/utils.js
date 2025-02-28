export const isLoggedIn = (req,  res , next) => {
	console.log()
	if(req.session.user){
		return next();
	}

	return res.status(400).json({
		success : false,
		message : "Please login!"
	})
}

export  function formatDate(timestamp = Date.now()) {
    const date = new Date(timestamp);
    
    // Extracting date parts
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    // Extracting time parts
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}
