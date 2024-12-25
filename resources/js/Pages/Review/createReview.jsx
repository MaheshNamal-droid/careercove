import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function createReview({ auth, job_id }) {

    // Define form state
    const [formData, setFormData] = useState({
        text: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to send form data and file
        const data = new FormData();
        data.append('text', formData.text);
        data.append('job_id', job_id);  // Add job_id to the data

        try {
            const response = await fetch('/addReview', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                body: data,
            });

            if (response.ok) {
                alert('Review added successfully!');
            } else {
                alert('Failed to add review.');
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Review" />
            <div className="min-h-screen bg-gradient-to-t from-sky-50 via-gray-300 to-sky-600">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-10 pb-10">
                    <div className ="pt-20">
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md space-y-4">
                            <div>
                                <h3 className="block text-gray-700 font-semibold mb-2 text-lg text-center">Add Review</h3>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Text:</label>
                                <input
                                    type="text"
                                    name="text"
                                    value={formData.text}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-lime-700  text-white py-2 px-4 rounded-lg text-lg font-medium  focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
