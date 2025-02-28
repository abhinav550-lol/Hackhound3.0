import express from 'express'
import DoctorController from '../controllers/DoctorController.js';
import { isLoggedIn } from '../utils/utils.js';
import notificationController from '../controllers/notificationController.js';

const router=  express.Router();


router.post('/login' , DoctorController.loginUser);
router.post('/register' , DoctorController.registerUser);
router.post('/logout' , isLoggedIn , DoctorController.logoutUser)
router.get('/appointments/:doctorId' , isLoggedIn , DoctorController.viewAppointments)
router.post('/appointments/:appointmentId' , isLoggedIn , DoctorController.acceptAppointment)
router.post('/notifications/removeAll' , isLoggedIn , notificationController.removeAllNotifications);
router.post('/appointments/complete/:appointmentId' , isLoggedIn , DoctorController.completeAppointment)

export default router;