import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function createPromotion({ auth }) {

     // Define form state
    const [formData, setFormData] = useState({
        ads_image: '',
        description: '',
        text: '',
      });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setFormData({ ...formData, ads_image: e.target.files[0] });
    };
      
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to send form data and file
        const data = new FormData();
        data.append('ads_image', formData.ads_image);
        data.append('description', formData.description);
        data.append('text', formData.text);
        
        try {
        const response = await fetch('/addPromotion', {
            method: 'POST',
            headers: {

                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            },
            body: data,
        });

        if (response.ok) {
            alert('Promotion added successfully!');
        } else {
            alert('Failed to add promotion.');
        }
        } catch (error) {
        console.error('Error adding promotion:', error);
        }
    };
    
    return(
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
                        <h3 className="block text-gray-700 font-semibold mb-2 text-lg text-center">Add Promotion</h3>
                    </div> 
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Advertisment image:</label>
                        <input
                        type="file"
                        name="ads_image"
                        onChange={handleFileChange}
                        required
                        className="w-full"/>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Description:</label>
                        <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Text:</label>
                        <input
                        type="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required                            
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Submit
                    </button>
                </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
}