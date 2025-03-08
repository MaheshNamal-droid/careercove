import UserDashboardLayout from '@/Layouts/UserDashboardLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Sidebar from '../../Components/User/Sidebar';
import { ArrowLeft } from 'lucide-react';

export default function CreateUserProfile({ auth }) {
  // State to store form data
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
    <UserDashboardLayout user={auth.user}>
      <Head title="Create User Profile" />
      <div className="flex">
        <Sidebar />
        {/* Main Content Area */}
        <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6 relative">

          {/* Back Button */}
          <div className="absolute top-6 left-4">
            <a
              href="/userProfile"
              className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 flex items-center shadow-md"
            >
              <ArrowLeft size={20} className="mr-2" /> Back
            </a>
          </div>

          {/* Centered Form */}
          <div className="flex justify-center items-center  ">
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200 "
            >
              <h3 className="text-2xl font-bold text-center text-[#254336]">New User Profile</h3>

              {/* Form Fields */}
              {[{ label: 'First Name', name: 'first_name', type: 'text' },
              { label: 'Last Name', name: 'last_name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Address', name: 'address', type: 'text' },
              { label: 'Phone Number', name: 'contact_phone', type: 'text' },
              { label: 'Social Media', name: 'social_media', type: 'url' }].map((field, index) => (
                <div key={index}>
                  <label className="block text-[#254336] font-medium mb-2">{field.label}:</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                  />
                </div>
              ))}

              {/* File Inputs */}
              {[{ label: 'Profile Picture', name: 'profile_picture', handler: handleFileChange },
              { label: 'Resume', name: 'resume', handler: handleFileChange2 }].map((fileField, index) => (
                <div key={index}>
                  <label className="block text-[#254336] font-medium mb-2">{fileField.label}:</label>
                  <input
                    type="file"
                    name={fileField.name}
                    onChange={fileField.handler}
                    required
                    className="w-full border border-gray-500 rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              ))}

              {/* Description Field */}
              <div>
                <label className="block text-[#254336] font-medium mb-2">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-gray-50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="rounded-lg px-2 py-2 bg-blue-600 text-blue-100 hover:bg-blue-700 duration-300 text-lg font-semibold w-full"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </UserDashboardLayout>
  );
}