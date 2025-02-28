import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-blue-900 p-6">
        
      <div className="flex w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-2/3 text-white mr-6"
        >
          <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
          <div className="flex flex-col space-y-4 text-gray-300">
            <p className="flex items-center gap-3"><FaEnvelope /> contact@company.com</p>
            <p className="flex items-center gap-3"><FaPhone /> +123 456 7890</p>
            <p className="flex items-center gap-3"><FaMapMarkerAlt /> 123 Frost Street, Snowland</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input type="text" name="name" placeholder="Your Name" required
              className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange} value={formData.name} />
            <input type="email" name="email" placeholder="Your Email" required
              className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange} value={formData.email} />
            <textarea name="message" placeholder="Your Message" required rows="4"
              className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange} value={formData.message}></textarea>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-500 p-3 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
        <div className="w-1/3 bg-gray-700 p-6 rounded-2xl shadow-2xl flex items-center justify-center text-white">
          <p className="text-lg">Chatbot Coming Soon...</p>
        </div>
      </div>
    </div>
  );
}