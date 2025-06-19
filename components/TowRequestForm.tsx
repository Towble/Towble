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
  const form = new FormData();

  // Convert your formData object to FormData
  for (let key in formData) {
    form.append(key, formData[key]);
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwfr_zZRm8qlIa1vG-1X6FRiNYdiQEa6N197qLNFBKWCKhuhMhHxwHJRgtWmQy5G-fzVA/exec", {
      method: "POST",
      body: form,
    });

    if (response.ok) {
      alert("Request submitted successfully!");
    } else {
      alert("Submission failed.");
    }
  } catch (error) {
    alert("An error occurred while submitting.");
    console.error(error);
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
