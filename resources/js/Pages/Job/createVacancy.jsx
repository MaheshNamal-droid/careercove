import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';


export default function createVacancy({data,auth }) {
  // Define form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    full_or_part_time: '',
    description: '',
    requirement: '',
    location: '',
    file: null,
    company_name: '',
    company_logo: null,
    contact_phone: '',
    contact_email:'',
    city:'',
    address:'',
  });
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };
  const getCategory = (e) => {
    setFormData({ ...formData, category: e.target.value });
  }
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
    // let job_category = document.getElementById('category').value;
    // var e = document.getElementById("job_category");
    // var c_value = e.options[e.selectedIndex].value;
    // setFormData({ ...formData, category: c_value });
    // Create FormData object to send form data and file
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('full_or_part_time', formData.job_type);
    data.append('description', formData.description);
    data.append('requirement', formData.requirement);
    data.append('closing_date', formData.closing_date);
    data.append('location', formData.location);
    data.append('file', formData.file);
    data.append('company_name', formData.company_name);
    data.append('company_logo', formData.company_logo);
    data.append('contact_phone', formData.contact_phone);
    data.append('contact_email', formData.contact_email);
    data.append('city', formData.city);
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
                <div className='flex inset-0 bg-black bg-opacity-50 justify-center items-center backdrop-brightness-75'>
                   
                        <div className ="pt-24 w-xl">
                        <form onSubmit={handleSubmit} className="p-12 bg-white shadow-lg rounded-md space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold text-center mb-6">New Vacancy</h3>
                            </div> 
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Job Title:</label>
                                <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Category:</label>
                                <select
                                id="job_category"
                                name="category"
                                onChange={getCategory}
                                required
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                >
                                <option >Select a category</option>
                                {data.map((item) => (
                                    <option value={item.id}>{item.title}</option>
                                ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Job Type:</label>
                                <select
                                id="job_type"
                                name="job_type"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Description:</label>
                                <textarea 
                                    name="description" 
                                    rows={4} value={formData.description} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                    required>
                                </textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Requirements:</label>
                                <textarea
                                    name='requirement'
                                    rows={4}
                                    value={formData.requirement}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                    required>
                                </textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Location(Google Map Link):</label>
                                <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
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
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
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
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
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
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">City:</label>
                                <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
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
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
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
                                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-lime-700  text-white py-2 px-4 rounded-lg text-lg font-medium  focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
