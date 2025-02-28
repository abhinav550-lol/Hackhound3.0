import mongoose from 'mongoose'


const appointmentSchema=  new mongoose.Schema({
	doctorId : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
	},
	patientId : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
	},
	description : {
		type : String,
		required : true,
		max : [200, "Descripition can only have 200 charecters."]
	},
	isAccepted : {
		type : Boolean,
		default : false
	},
	isCompleted : {
		type : Boolean,
		default : false
	},

	typeOfAppointment : {
		type : String,
		enum : ["Offline" , "Online"]
	},
	images : {
		type : [String]
	},
	meetingLink : {
		type : "String",
		required : [function(){
			return this.typeOfAppointment === "Online"
		}, "Please provide a meeting link for this online appointment."]
	},
	meetingVenue : {
		type : String,
		required : [function(){
			return this.typeOfAppointment === "Offline"
		}, "Please provide a meeting link for this offline appointment."]
	},
	timeOfMeeting : {
		type : Number,
	}
})


const Appointment = new mongoose.model('Appointment' , appointmentSchema);

export default Appointment;


