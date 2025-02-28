import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema({
	medicineName : {
		type : String,
		required : true
	},
	dosage : {
		type : String, //2-daily , 3-weekly , 4-monthly
		required: true
	},
	dosageDescripition : {
		type : String,
	}
}, {_id : false});

const alimentSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	status : {
		type : String,
		enum : ["Ongoing" , "Ended"]
	},
	startDate : {
		type : Number,
		required : true,
	},
	patientId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Patient',
		required : true
	},
	endDate : {
		type : Number,
		required : [function(){
			this.status === "ended"
		}, "Please provide a end date for this finish aliment."]
	},
	userDescripition : {
		type : String,
	},
	medications : {
		type : [MedicationSchema],
		ref : "Medication"
	},
	perscription : {
		type : [String],
		required : true
	},
	doctorId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Doctor"
	}
});

const Aliment = new mongoose.model('Aliment' , alimentSchema);

export default Aliment;