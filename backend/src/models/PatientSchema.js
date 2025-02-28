import mongoose from 'mongoose'

const PatientSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
	},
	dateOfBirth : {
		type : String, 
		required : true,
	},
	age : {
		type : Number,
		required : true
	},
	phoneNo : {
		type : String,
		required : true,
	},
	password : {
		type : String,
		required : true
	},
	medicalHistory : {
		type : [mongoose.Schema.Types.ObjectId],
		default : [],
		ref : "Aliment",
	}
});

const Patient = new mongoose.model('Patient' , PatientSchema);

export default Patient;

