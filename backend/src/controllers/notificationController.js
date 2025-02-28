import wrapAsyncErrors from "../err/wrapAsyncErrors.js";
import Notification from "../models/notificationSchema.js";

const notificationController = {};


notificationController.issueNotification = async function(target , reason , recieverId , notificationMessage){
	await Notification.create({target , reason , recieverId , notificationMessage});
} 

notificationController.removeAllNotifications = wrapAsyncErrors(async (req , res , next) => {
	const {_id} = req.session.user;
	await Notification.deleteMany({recieverId : _id});
})



export default notificationController;