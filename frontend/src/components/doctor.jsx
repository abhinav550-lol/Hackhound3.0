import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("doctor-details");
  const [searchQuery, setSearchQuery] = useState("");
  const [patientRequests, setPatientRequests] = useState([
    { id: "P001", name: "John Doe", disease: "Flu" },
    { id: "P002", name: "Jane Smith", disease: "Diabetes" },
    { id: "P003", name: "David Johnson", disease: "Hypertension" },
  ]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: "P004", name: "Alice Brown", disease: "Asthma", date: "March 5, 2025", time: "10:00 AM", mode: "In-person", prescription: "Pending" },
    { id: "P005", name: "Bob Martin", disease: "Migraine", date: "March 6, 2025", time: "2:00 PM", mode: "Video Call", prescription: "Completed" }
  ]);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  
  // State for doctor details
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    specialization: "",
    experience: "",
    contact: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const performanceMetrics = {
    totalPatients: 120,
    successfulTreatments: 95,
    pendingCases: 25,
    averageConsultationTime: "30 mins",
    patientSatisfaction: "4.7/5",
  };

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), task: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle input changes for doctor details
  const handleDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const tabs = [
    { id: "doctor-details", label: "Doctor Details", icon: "👨‍⚕" },
    { id: "patient-requests", label: "Patient Requests", icon: "📅" },
    { id: "upcoming-appointments", label: "Upcoming Appointments", icon: "📋" },
    { id: "to-do-list", label: "To-Do List", icon: "✅" },
    { id: "performance-metrics", label: "Performance Metrics", icon: "📊" },
    { id: "invoice-generation", label: "Invoice Generation", icon: "💳" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-6 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-indigo-400">Doctor Dashboard</h1>
          <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 btn"onClick={() => navigate("/")}>Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-lg ${
                activeTab === tab.id ? "bg-indigo-600" : "bg-gray-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "doctor-details" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Doctor Information</h2>
              {isEditing ? (
                <form onSubmit={handleDoctorSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={doctorDetails.name}
                      onChange={handleDoctorInputChange}
                      className="w-full p-2 bg-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Specialization:</label>
                    <input
                      type="text"
                      name="specialization"
                      value={doctorDetails.specialization}
                      onChange={handleDoctorInputChange}
                      className="w-full p-2 bg-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Experience (Years):</label>
                    <input
                      type="number"
                      name="experience"
                      value={doctorDetails.experience}
                      onChange={handleDoctorInputChange}
                      className="w-full p-2 bg-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Contact Email:</label>
                    <input
                      type="email"
                      name="contact"
                      value={doctorDetails.contact}
                      onChange={handleDoctorInputChange}
                      className="w-full p-2 bg-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 btn"
                    >
                      Save
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  {doctorDetails.name ? (
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {doctorDetails.name}</p>
                      <p><strong>Specialization:</strong> {doctorDetails.specialization}</p>
                      <p><strong>Experience:</strong> {doctorDetails.experience} Years</p>
                      <p><strong>Contact:</strong> {doctorDetails.contact}</p>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        Edit Details
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>No doctor details provided yet.</p>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 btn"
                      >
                        Add Details
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {activeTab === "patient-requests" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Patient Requests</h2>
              <ul>
                {patientRequests.map((patient) => (
                  <li key={patient.id} className="p-3 bg-gray-700 mb-2 rounded">
                    {patient.name} - {patient.disease}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === "upcoming-appointments" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
              <ul>
                {upcomingAppointments.map((appointment) => (
                  <li key={appointment.id} className="p-3 bg-gray-700 mb-2 rounded">
                    {appointment.name} - {appointment.date} at {appointment.time} ({appointment.mode})
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === "to-do-list" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">To-Do List</h2>
              <input
                type="text"
                placeholder="Enter new task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-white"
              />
              <button onClick={addTask} className="mt-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">Add Task</button>
              <ul>
                {tasks.map((task) => (
                  <li key={task.id} className="p-3 bg-gray-700 mb-2 rounded flex justify-between items-center">
                    <span className={task.completed ? "line-through text-red-400 font-bold" : ""}>{task.task}</span>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="ml-2"
                    />
                    {task.completed && (
                      <button onClick={() => removeTask(task.id)} className="ml-4 px-3 py-1 bg-red-500 rounded hover:bg-red-600">Remove</button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div>
          {activeTab === "performance-metrics" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
              <ul className="list-disc pl-6">
                <li><strong>Total Patients Treated:</strong> {performanceMetrics.totalPatients}</li>
                <li><strong>Successful Treatments:</strong> {performanceMetrics.successfulTreatments}</li>
                <li><strong>Pending Cases:</strong> {performanceMetrics.pendingCases}</li>
                <li><strong>Average Consultation Time:</strong> {performanceMetrics.averageConsultationTime}</li>
                <li><strong>Patient Satisfaction Rating:</strong> {performanceMetrics.patientSatisfaction}</li>
              </ul>
            </section>
          )}

          {activeTab === "invoice-generation" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Invoice Generation</h2>
              <p>Invoice generation feature coming soon!</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;