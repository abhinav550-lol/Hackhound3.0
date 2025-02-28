import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("personal-details");

  const navigate = useNavigate();

  function handleClick(){
    navigate('/apoint')
  }

  const tabs = [
    { id: "personal-details", label: "Personal Details", icon: "👤" },
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "medical-reports", label: "Medical Reports", icon: "📋" },
    { id: "reminders", label: "Reminders", icon: "⏰" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "nearby-hospitals", label: "Nearby Hospitals", icon: "🏥" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-6 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-indigo-400">Patient Dashboard</h1>
          <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 btn" onClick={() => navigate("/")}>Logout</button>
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
          {activeTab === "personal-details" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
              <form className="grid md:grid-cols-2 gap-6">
                {[{ label: "Full Name", type: "text" },
                  { label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
                  { label: "Age", type: "number" },
                  { label: "Date of Birth", type: "date" },
                  { label: "Address", type: "textarea" },
                  { label: "Email", type: "email" },
                  { label: "Phone Number", type: "text" },
                  { label: "Emergency Contact", type: "text" },
                  { label: "Blood Group", type: "select", options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
                ].map((field) => (
                  <div key={field.label}>
                    <label>{field.label}:</label>
                    {field.type === "textarea" ? (
                      <textarea className="w-full p-2 bg-gray-700 rounded"></textarea>
                    ) : field.type === "select" ? (
                      <select className="w-full p-2 bg-gray-700 rounded">
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input type={field.type} className="w-full p-2 bg-gray-700 rounded" />
                    )}
                  </div>
                ))}
                <button type="submit" className="p-2 bg-indigo-600 rounded btn">Save</button>
              </form>
            </section>
          )}

          {activeTab === "medical-reports" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Medical Reports</h2>
              <form className="grid md:grid-cols-2 gap-6">
                {[{ label: "Disease", type: "text" },
                  { label: "Accident History", type: "textarea" },
                  { label: "Family Medical History", type: "textarea" },
                  { label: "Description of Disease", type: "textarea" },
                  { label: "Status", type: "select", options: ["Ongoing", "Recovered"] },
                ].map((field) => (
                  <div key={field.label}>
                    <label>{field.label}:</label>
                    {field.type === "textarea" ? (
                      <textarea className="w-full p-2 bg-gray-700 rounded"></textarea>
                    ) : field.type === "select" ? (
                      <select className="w-full p-2 bg-gray-700 rounded">
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input type={field.type} className="w-full p-2 bg-gray-700 rounded" />
                    )}
                  </div>
                ))}
              </form>
            </section>
          )}

          {activeTab === "appointments" && (
            <section className="p-6 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
            <p>You have no upcoming appointments.</p>
            <button id="appointButton" onClick={handleClick}> Book an appointment</button>
          </section>
            
          )}

          {activeTab === "reminders" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
              <p>Set reminders for medications and doctor visits.</p>
            </section>
          )}

          {activeTab === "billing" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Billing</h2>
              <p>Latest Bill: $200 (Paid)</p>
            </section>
          )}

          {activeTab === "nearby-hospitals" && (
            <section className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Nearby Hospitals</h2>
              <ul>
                <li>City Hospital - 2 km away</li>
                <li>Metro Medical Center - 5 km away</li>
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;