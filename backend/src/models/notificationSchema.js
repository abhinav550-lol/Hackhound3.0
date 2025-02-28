import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    target: {
        type: String,
        enum: ["Doctor", "Patient"],
        required: true
    },
    reason: {
        type: String,
        enum: ['Appointment', 'Medication'],
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'target', 
        required: true
    },
    notificationMessage: {
        type: String,
        required: true
    }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
