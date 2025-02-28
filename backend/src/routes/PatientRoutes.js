import express from 'express'
import PatientController from '../controllers/PatientController.js';
import { isLoggedIn } from '../utils/utils.js';
import notificationController from '../controllers/notificationController.js';
const router = express.Router();


router.post('/register' , PatientController.registerUser);
router.post('/login' , PatientController.loginUser);
router.post('/logout' , isLoggedIn , PatientController.logoutUser);
router.post('/appointment/:doctorId' , isLoggedIn , PatientController.requestAppointment);
router.patch('/appointment/:appointmentId' , isLoggedIn , PatientController.editAppointment);
router.get('/aliments' , isLoggedIn , PatientController.viewPastAliments);
router.post('/notifications/removeAll' , isLoggedIn , notificationController.removeAllNotifications);

export default router;