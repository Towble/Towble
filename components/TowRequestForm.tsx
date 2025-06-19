import { useState } from 'react';

export default function TowRequestForm() {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    serviceType: '',
    phone: '',
    year: '',
    make: '',
    model: '',
    color: '',
    license: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const response = await fetch("https://towble-sheet-proxy.vercel.app/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Request submitted successfully!");
    } else {
      alert("Failed to submit. Please try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("An error occurred. Please try again.");
  }
};
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Request Roadside Service</h2>

      <input name="pickup" placeholder="Pickup Location" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="dropoff" placeholder="Drop-off Location (optional)" onChange={handleChange} className="w-full border p-2 rounded" />

      <select name="serviceType" onChange={handleChange} required className="w-full border p-2 rounded">
        <option value="">Select Service Type</option>
        <option value="Tow">Tow</option>
        <option value="Lockout">Lockout</option>
        <option value="Jumpstart">Jumpstart</option>
        <option value="Gas">Gas</option>
        <option value="Flat Tire">Flat Tire</option>
        <option value="Other">Other</option>
      </select>

      <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full border p-2 rounded" />

      <div className="grid grid-cols-3 gap-2">
        <input name="year" placeholder="Year" onChange={handleChange} className="border p-2 rounded" />
        <input name="make" placeholder="Make" onChange={handleChange} className="border p-2 rounded" />
        <input name="model" placeholder="Model" onChange={handleChange} className="border p-2 rounded" />
      </div>

     <input name="color" placeholder="Color" onChange={handleChange} className="w-full border p-2 rounded" />

      <input name="license" placeholder="License Plate Number" onChange={handleChange} className="w-full border p-2 rounded" />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Submit Request
      </button>
    </form>
  );
}
