import { useState } from "react";

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    //setTimeout(() => setSubmitted(false), 3000); // Hide confirmation after 3s
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Book an Appointment</h1>

      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-600">Appointment Confirmed!</h2>
            <p className="text-gray-700 mt-2">We have received your booking request.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Name */}
            <div>
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Select Doctor */}
            <div>
              <label className="block text-gray-700 font-semibold">Select Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose a Doctor --</option>
                <option value="Dr. John Doe">Dr. John Doe - Cardiologist</option>
                <option value="Dr. Sarah Smith">Dr. Sarah Smith - Dermatologist</option>
                <option value="Dr. Michael Lee">Dr. Michael Lee - Orthopedic</option>
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-gray-700 font-semibold">Appointment Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-gray-700 font-semibold">Preferred Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition btn"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
