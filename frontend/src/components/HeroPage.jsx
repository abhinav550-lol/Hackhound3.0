import { Link } from "react-router";
import { useNavigate } from "react-router-dom"; 




    export default function HeroPage() {
        return (
        <div className="w-full min-h-screen bg-blue-100 text-gray-900">
            {/* Navbar */}
            <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600" id="name"><Link to ="/">MED MATRIX</Link></h1>
            <div className="space-x-6">
                
                <button  className="hover:text-blue-600"><Link to='/d/login'>Join Us As a Doctor</Link></button>
                <button  className="hover:text-blue-600"><Link to="/login">Login/SignUp</Link></button>
                <login/>
            </div>
            </nav>
    
            {/* Hero Section */}
            <div
            className="relative w-full h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center"
            
            >
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" style={{
                backgroundImage: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1)"
            }}></div>
    
            {/* Hero Content */}
            <div className="relative z-10 max-w-3xl text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to Med Matrix</h1>
                <p className="text-lg mb-6">
                Your all-in-one hospital management solution for streamlined operations and improved patient care.
                </p>
                <div className="space-x-4">
                
                <button  className="bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                    <Link to="/login">Get Started</Link>
                </button>
                </div>
            </div>
            </div>
    
            {/* Features Section */}
            <section id="features" className="py-16 px-8 bg-white text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">Why Choose Med Matrix?</h2>
            <p className="text-lg text-gray-700 mb-8">
                A complete hospital management system tailored for efficiency and accuracy.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-blue-50 shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold mb-2">Patient Management</h3>
                <p>Seamless patient record management and appointment scheduling.</p>
                </div>
                <div className="p-6 bg-blue-50 shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold mb-2">Appointment Manager</h3>
                <p>View Book Reschedule.</p>
                </div>
                <div className="p-6 bg-blue-50 shadow-md rounded-lg">
                <h3 className="text-2xl font-semibold mb-2">Doctor Scheduling</h3>
                <p>Manage doctor availability and optimize appointment slots.</p>
                </div>
            </div>
            </section>
    
            {/* Contact Section */}
            <section id="contact" className="py-16 px-8 bg-gray-100 text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-700 mb-8">
                Contact us today to learn how Med Matrix can transform your healthcare management.
            </p>
            <button  className="bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold text-white hover:bg-blue-700 transition" >
                <Link to='/contact'>Contact Us</Link>
                </button>
            </section>
        </div>
        );
    }
