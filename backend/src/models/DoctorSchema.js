import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
	},
	operatingHospitalName : {
		type : String,
		required : true,
	},
	IMRregistrationNo : {
		type : String,
		required : true,
	},
	yearOfRegistration : {
		type : String,
		required : true,
	},
	stateMedicalCouncil : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	operatingPatients : {
		type :[ mongoose.Schema.Types.ObjectId],
		ref : 'Patient',
		default : []
	},
	phoneNo : {
		type : String,
		required : true
	},
	specializations : {
		type : [String],
		required : true
	}
});


const Doctor = new mongoose.model('Doctor' , DoctorSchema);
export default Doctor;