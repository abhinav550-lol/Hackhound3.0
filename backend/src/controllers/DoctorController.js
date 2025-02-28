import wrapAsyncErrors from "../err/wrapAsyncErrors.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcrypt";
import AppError from "../err/AppError.js";
import Appointment from "../models/AppointmentSchema.js";
import notificationController from "./notificationController.js";
import {formatDate} from '../utils/utils.js'
import { uploadFile } from "../utils/fileUpload.js";
import Aliment from "../models/AlimentSchema.js";
const DoctorController = {};


function extractCategories(inputString) {
    return inputString.split(',').map(str => str.trim());
}

function convertToMilliseconds(datetimeString) {
    return new Date(datetimeString).getTime();
}

DoctorController.registerUser = wrapAsyncErrors(async (req, res, next) => {
    const {
        name,
        operatingHospitalName,
        IMRregistrationNo,
        yearOfRegistration,
        stateMedicalCouncil,
        password,
        confirmPassword,
        specializations,
		phoneNo
    } = req.body;

    if (!name || !operatingHospitalName || !IMRregistrationNo || !yearOfRegistration || !stateMedicalCouncil || !password || !confirmPassword || !specializations) {
        return next(new AppError(400, "Please fill all the required fields."));
    }

    if (password !== confirmPassword) {
        return next(new AppError(400, "Passwords do not match."));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

	const extractedSpecializations = extractCategories(specializations);

    const newDoctor = await Doctor.create({
        name,
        operatingHospitalName,
        IMRregistrationNo,
        yearOfRegistration,
        stateMedicalCouncil,
        password: hashedPassword,
        specializations : extractedSpecializations,
		phoneNo
    });

    delete newDoctor.password;
	newDoctor.role = "Doctor";
    req.session.user = newDoctor;

    return res.status(200).json({
        success: true,
        message: "Doctor registered successfully.",
        doctor: {
            _id: newDoctor._id,
            name: newDoctor.name,
            operatingHospitalName: newDoctor.operatingHospitalName,
            IMRregistrationNo: newDoctor.IMRregistrationNo,
            yearOfRegistration: newDoctor.yearOfRegistration,
            stateMedicalCouncil: newDoctor.stateMedicalCouncil,
            specializations: newDoctor.specializations,
			phoneNo 
        }
    });
});

DoctorController.loginUser = wrapAsyncErrors(async (req, res, next) => {
    const { IMRregistrationNo, password } = req.body;

    if (!IMRregistrationNo || !password) {
        return next(new AppError(400, "Please fill all the required fields."));
    }

    const doctor = await Doctor.findOne({ IMRregistrationNo });

    if (!doctor) {
        return next(new AppError(401, "Invalid credentials."));
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
        return next(new AppError(401, "Invalid credentials."));
    }

    delete doctor.password;
	doctor.role = "Doctor";
    req.session.user = doctor;

    return res.status(200).json({
        success: true,
        message: "Login successful.",
        doctor: {
            _id: doctor._id,
            name: doctor.name,
            operatingHospitalName: doctor.operatingHospitalName,
            IMRregistrationNo: doctor.IMRregistrationNo,
            yearOfRegistration: doctor.yearOfRegistration,
            stateMedicalCouncil: doctor.stateMedicalCouncil,
            specializations: doctor.specializations
        }
    });
});

DoctorController.logoutUser = wrapAsyncErrors(async (req, res, next) => {
    req.session.destroy();
    return res.status(200).json({
        success: true,
        message: "User logged out successfully."
    });
});

//Issue notification for both
//View all Appointment (Upcoming , Ended)
DoctorController.viewAppointments = wrapAsyncErrors(async (req ,res , next) => {
	const {doctorId} = req.params;

	const foundAppointments = await Appointment.find({doctorId});


	return res.status(400).json({
		success : true,
		message : "Here are all the appointments.",
		foundAppointments 
	})
})

//Accept Appointment
DoctorController.acceptAppointment = wrapAsyncErrors(async (req, res, next) => {
    const { appointmentId } = req.params;

    const foundAppointment = await Appointment.findById(appointmentId);
    if (!foundAppointment) {
        return next(new AppError(404, "Appointment not found."));
    }

    const doctorUser = req.session.user;

    const { accepted } = req.body; // Accept or Reject action
    if (accepted === "true") {
        foundAppointment.isAccepted = true;

        const { typeOfAppointment, meetingLink, meetingVenue, timeOfMeeting } = req.body;

        if (!timeOfMeeting) {
            return next(new AppError(400, "Please mention the time of the meeting."));
        }

        const meetingTimeInMs = convertToMilliseconds(timeOfMeeting);
        if (isNaN(meetingTimeInMs)) {
            return next(new AppError(400, "Invalid meeting time format."));
        }

        foundAppointment.timeOfMeeting = meetingTimeInMs;

        if (typeOfAppointment === "Online") {
            if (!meetingLink) {
                return next(new AppError(400, "Please enter a scheduled meeting link."));
            }
            foundAppointment.meetingLink = meetingLink;
        } else if (typeOfAppointment === "Offline") {
            if (!meetingVenue) {
                return next(new AppError(400, "Please enter a scheduled meeting venue."));
            }
            foundAppointment.meetingVenue = meetingVenue;
        } else {
            return next(new AppError(400, "Please enter a valid type for the appointment."));
        }

        // Issue notification for appointment acceptance
        await notificationController.issueNotification(
            "Patient",
            "Appointment",
            foundAppointment.patientId,
            `Appointment accepted by ${doctorUser.name}.`
        );
        await notificationController.issueNotification(
            "Patient",
            "Appointment",
            foundAppointment.patientId,
            `Appointment scheduled at ${formatDate(meetingTimeInMs)}`
        );
    } else {
        await foundAppointment.remove(); // Delete appointment if rejected

        // Issue notification for appointment rejection
        await notificationController.issueNotification(
            "Patient",
            "Appointment",
            foundAppointment.patientId,
            `Appointment rejected by ${doctorUser.name}.`
        );
    }

    await foundAppointment.save();

    res.status(200).json({
        success: true,
        isAccepted: foundAppointment.isAccepted,
        message: foundAppointment.isAccepted ? "Appointment accepted." : "Appointment declined.",
        foundAppointment: foundAppointment.isAccepted ? foundAppointment : {},
    });
});


//Complete Appontment and add the aliment to the user's profile
DoctorController.completeAppointment = wrapAsyncErrors(async (req, res, next) => {
	const { appointmentId } = req.params;

	const foundAppointment = await Appointment.findById(appointmentId);
	if (!foundAppointment) {
		return next(new AppError(404, "Appointment not found."));
	}

	foundAppointment.isCompleted = true;

	const { name, medications } = req.body;
	const newAliment = {
		userDescription: foundAppointment.description, // Fixed typo
		startDate: foundAppointment.timeOfMeeting,
		endDate: Date.now(),
		patientId: foundAppointment.patientId,
		doctorId: foundAppointment.doctorId, // Fixed typo
		name,
		medications,
	};

	if (req.files?.prescription) {
		newAliment.prescription = await uploadFile(req.files.prescription, foundAppointment.doctorId.toString());
	}

	if (!newAliment.prescription || !name || !medications) {
		return next(new AppError(400, "Please fill all the required fields."));
	}

	const createdAliment = await Aliment.create(newAliment);

	const foundPatient = await Patient.findById(foundAppointment.patientId);
	if (!foundPatient) {
		return next(new AppError(404, "Patient not found."));
	}

	foundPatient.medicalHistory.push(createdAliment._id);
	await foundPatient.save();

	return res.status(200).json({
		success: true,
		message: "Medical History Updated.",
		aliment: createdAliment,
	});
});



export default DoctorController;
