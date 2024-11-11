import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';


export default function createVacancy({ auth }) {
  // Define form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirement: '',
    location: '',
    file: null,
    company_name: '',
    company_logo: null,
    contact_phone: '',
    contact_email:'',
    address:'',
  });
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    // Handle file selection
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
      };
      const handleFileChange2 = (e) => {
        setFormData({ ...formData, company_logo: e.target.files[0] });
      };
// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send form data and file
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('requirement', formData.requirement);
    data.append('closing_date', formData.closing_date);
    data.append('location', formData.location);
    data.append('file', formData.file);
    data.append('company_name', formData.company_name);
    data.append('company_logo', formData.company_logo);
    data.append('contact_phone', formData.contact_phone);
    data.append('contact_email', formData.contact_email);
    data.append('address', formData.address);
    
    try {
      const response = await fetch('/addVacancy', {
        method: 'POST',
        headers: {

            'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
        body: data,
      });

      if (response.ok) {
        alert('Vacancy added successfully!');
      } else {
        alert('Failed to add vacancy.');
      }
    } catch (error) {
      console.error('Error adding vacancy:', error);
    }
  };
    return (
        <AuthenticatedLayout
            user={auth.user}
            //header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="dashboard_top_container">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10 pb-10">
                    <div>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
                        <div>
                            <h3 className="block text-gray-700 font-semibold mb-2 text-lg text-center">New Vacancy</h3>
                        </div> 
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Job Title:</label>
                            <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Description:</label>
                            <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Requirements:</label>
                            <input
                            type="text"
                            name="requirement"
                            value={formData.requirement}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Location:</label>
                            <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Banner:</label>
                            <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            required
                            className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Company Name:</label>
                            <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Company Logo:</label>
                            <input
                            type="file"
                            name="company_logo"
                            onChange={handleFileChange2}
                            required
                            className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Phone Number:</label>
                            <input
                            type="text"
                            name="contact_phone"
                            value={formData.contact_phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                            <input
                            type="text"
                            name="contact_email"
                            value={formData.contact_email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Address:</label>
                            <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Closing Date:</label>
                            <input
                            type="date"
                            name="closing_date"
                            value={formData.closing_date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
