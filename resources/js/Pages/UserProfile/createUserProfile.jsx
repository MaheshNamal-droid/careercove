import UserDashboardLayout from '@/Layouts/UserDashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Sidebar from '../../Components/User/Sidebar';

export default function CreateUserProfile({ auth }) {
  // Define form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    contact_phone: '',
    social_media: '',
    profile_picture: null,
    resume: null,
    description: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleFileChange2 = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

  // Create FormData object to send form data and file
    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('contact_phone', formData.contact_phone);
    data.append('social_media', formData.social_media);
    data.append('profile_picture', formData.profile_picture);
    data.append('resume', formData.resume);
    data.append('description', formData.description);

    try {
      const response = await fetch('/addUserProfile', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
        body: data,
      });

      if (response.ok) {
        alert('User profile added successfully!');
      } else {
        alert('Failed to add user profile.');
      }
    } catch (error) {
      console.error('Error adding user profile:', error);
    }
  };

  return (
    <UserDashboardLayout
      user={auth.user}>
      <Head title="Create User Profile" />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center min-h-screen bg-gray-50">
          <form
            onSubmit={handleSubmit}
            className="max-w-md w-full bg-gray-200 shadow-md rounded-md p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold text-center text-[#254336]">New User Profile</h3>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#41B06E] rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#41B06E] rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#41B06E] rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#41B06E] rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Phone Number:</label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#41B06E] rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Social Media:</label>
              <input
                type="url"
                name="social_media"
                value={formData.social_media}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#41B06E] rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Profile Picture:</label>
              <input
                type="file"
                name="profile_picture"
                onChange={handleFileChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Resume:</label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange2}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-[#254336] font-semibold mb-2">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#41B06E] rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A5319] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#254336] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </UserDashboardLayout>
  );
}