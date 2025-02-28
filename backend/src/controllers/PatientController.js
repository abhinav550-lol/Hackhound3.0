import wrapAsyncErrors from "../err/wrapAsyncErrors.js";
import Doctor from "../models/DoctorSchema.js";
import Patient from "../models/PatientSchema.js";
import bcrypt from 'bcrypt'
import { uploadFile } from "../utils/fileUpload.js";
import AppError from "../err/AppError.js";
import Appointment from "../models/AppointmentSchema.js";
import Aliment from "../models/AlimentSchema.js";
import notificationController from '../controllers/notificationController.js'

const PatientController = {};

PatientController.registerUser = wrapAsyncErrors(async (req, res, next) => {
    try {
        const { name, dateOfBirth, phoneNo, password, confirmPassword } = req.body;

        if (!name || !dateOfBirth || !phoneNo || !password || !confirmPassword) {
            return next(new AppError(400, "Please fill all the required fields."));
        }

        if (password !== confirmPassword) {
            return next(new AppError(400, "Passwords do not match."));
        }

        let age = Math.trunc((Date.now() - new Date(dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365.25));

        // ✅ Ensure this is inside an async function
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await Patient.create({
            name,
            dateOfBirth,
            age,
            phoneNo,
            password: hashedPassword
        });

        delete newUser.password;
        newUser.role = "Patient";
        req.session.user = newUser;

        return res.status(200).json({
            success: true,
            message: "User created successfully.",
            patient: {
                _id: newUser._id,
                name: newUser.name,
                dateOfBirth: newUser.dateOfBirth,
                age: newUser.age,
                phoneNo: newUser.phoneNo,
            }
        });
    } catch (error) {
        next(error); // Pass error to the error handler middleware
    }
});

PatientController.loginUser = wrapAsyncErrors(async (req, res, next) => {
	const { phoneNo, password } = req.body;
	
    if (!phoneNo || !password) {
		return next(new AppError(400, "Please fill all the required fields."));
    }
	
    const patient = await Patient.findOne({ phoneNo });
	
    if (!patient) {
		return next(new AppError(401, "Invalid credentials."));
    }
	
    const isMatch = await bcrypt.compare(password, patient.password);
	
    if (!isMatch) {
		return next(new AppError(401, "Invalid credentials."));
    }
	
	delete patient.password;
	patient.role = "Patient"
    req.session.user = patient;
	
    return res.status(200).json({
		success: true,
        message: "Login successful.",
        patient: {
            _id: patient._id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            age: patient.age,
            phoneNo: patient.phoneNo,
        }
    });
});



PatientController.logoutUser = wrapAsyncErrors(async (req,  res , next) => {
	req.session.user = null;
	req.session.destroy();
	return res.status(200).json({
		success : true,
		message : "User logged out successfully.",
	})
})

//Doctor Appointment
//Request Appointment
PatientController.requestAppointment = wrapAsyncErrors(async (req, res, next) => {
	const { doctorId } = req.params;

	const foundDoctor = await Doctor.findById(doctorId);
	if (!foundDoctor) {
		return next(new AppError(400, `Doctor with ID: ${doctorId} not found.`));
	}

	const patientUser = req.session.user;
	const patientId = patientUser._id;

	const { description } = req.body;
	if (!description) {
		return next(new AppError(400, "Please enter a description."));
	}
	
	let images = [];
	if (req.files && req.files.images) {
		if(!Array.isArray(req.files.images)){
			req.files.images = [req.files.images]
		}
		images = req.files.images;
	}
	
	let postedImages = [];
	if (images.length > 0) {
		try {
			postedImages = await uploadFile(images, patientId);
		} catch (error) {
			return next(new AppError(500, "Failed to upload images."));
		}
	}
	
	const newAppointment = {
		description,
		doctorId,
		patientId
	};
	
	if (postedImages.length > 0) {
		newAppointment.images = postedImages;
	}
	
	// Issue notification (if needed)
	try {
		await notificationController.issueNotification(
			'Doctor', 'Appointment', doctorId, `A new appointment by ${patientUser.name}`
		);
	} catch (error) {
		return next(new AppError(500, "Failed to send notification."));
	}
	
	let createdAppointment;
	try {
		createdAppointment = await Appointment.create(newAppointment);
	} catch (error) {
		return next(new AppError(500, "Failed to create an appointment."));
	}
	
	return res.status(201).json({
		success: true,
		message: "Appointment created",
		appointment: createdAppointment
	});
});


//Edit Appointment
PatientController.editAppointment = wrapAsyncErrors(async (req , res , next) =>{
	const {appointmentId} = req.params;

	const foundAppointment = await Appointment.findById(appointmentId);

	if (!foundAppointment) {
		return next(new AppError(400, `Appointment with ID: ${appointmentId} not found.`))
	}

	const patientUser = req.session.user;
	const patientId = patientUser._id;

	const { description } = req.body;
	if (!description) {
		return next(new AppError(400, "Please enter a description."));
	}

	let images = [];
	if (req.files && req.files.images) {
		if(!Array.isArray(req.files.images)){
			req.files.images = [req.files.images]
		}
		images = req.files.images;
	}
	

	let postedImages = [];
	if (images.length > 0) {
		postedImages =  await uploadFile(images, patientId); 
	}

	const updatedAppointment = {};
	if(description) updatedAppointment.description = description;
	if(postedImages) updatedAppointment.postedImages = postedImages;

	const newUpdatedAppointment = await Appointment.findByIdAndUpdate(appointmentId , updatedAppointment , {new : true , runValidators : true});

	return res.status(200).json({
		success : true,
		message : "Appointment updated successfully.",
		appointment : newUpdatedAppointment
	})

})	
//View Past Aliments 
PatientController.viewPastAliments = wrapAsyncErrors(async (req , res , next) => {
	const patientUser = req.session.user;
	const patientId = patientUser._id;

	const foundPatient = await Patient.findById(patientId);
	if(!foundPatient){
		return next(new AppError(400 , "User not found."));
	}

	const foundPastAliments = await Aliment.find({patientId});

	return res.status(200).json({
		success : true,
		message : "Here's are all the found past aliments.",
		foundAliments : foundPastAliments
	})
})

export default PatientController;