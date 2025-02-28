import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Dashboard from './components/Dashboard'
import HeroPage from './components/HeroPage'
import Appointment from './components/apointment'
import ContactUs from './components/contact'
import LoginPopup from './components/login'
import LoginPopup2 from './components/login2'
import PatientDashboard from './components/patient'
import DoctorDashboard from './components/doctor'


export default function App(){
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/dashboard' element={<Dashboard />}></Route>
				<Route path='/' element={<HeroPage />}></Route>
				<Route path='/apoint' element={<Appointment />}></Route>
				<Route path='/contact' element={<ContactUs />}></Route>
				<Route path='/patient' element={<PatientDashboard  />}></Route>
				<Route path='/doc' element={<DoctorDashboard  />}></Route>
				<Route path='/d/login' element={<LoginPopup2 onClose={()=> setShowModal(false)}/>}></Route>
				<Route path='/login' element={<LoginPopup onClose={()=> setShowModal(false)}/>}></Route>
			</Routes>
		</BrowserRouter>
	)
}
	