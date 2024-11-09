import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';


export default function createVacancy({ auth }) {
  // Define form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    file: null,
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
// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send form data and file
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('file', formData.file);

    try {
      const response = await fetch('/addVacancy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
        body: data,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
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
                            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                            <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                            <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">File:</label>
                            <input
                            type="file"
                            onChange={handleFileChange}
                            required
                            className="w-full"
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
