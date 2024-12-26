import React from 'react';
import { Head } from '@inertiajs/react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdministratorLayout from '@/Layouts/UserDashboardLayout';
import Sidebar from '../../Components/User/Sidebar';
import { ArrowLeft } from 'lucide-react';

export default function ViewJobVacancy({ jobVacancy, auth }) {
    return (
        <Router>
            <AdministratorLayout user={auth.user}>
                <div className="flex">
                    <Sidebar />
                    <div className="w-full">
                        <div className="p-4">
                            <Head title={`Job Vacancy: ${jobVacancy.title}`} />
                            <h1 className="text-3xl font-semibold mb-4">View Job Vacancy</h1>

                            <div className='flex mb-4'>
                                <a href="/userDashboard/getMyPostedJobs" className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 flex items-center'>
                                <ArrowLeft size={20} className='mr-2'/> Back</a>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">Company Name</label>
                                    <input
                                        type="text"
                                        value={jobVacancy.company_name}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Title</label>
                                    <input
                                        type="text"
                                        value={jobVacancy.title}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Location</label>
                                    <input
                                        type="text"
                                        value={jobVacancy.location}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Closing Date</label>
                                    <input
                                        type="text"
                                        value={jobVacancy.closing_date}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Description</label>
                                    <textarea
                                        value={jobVacancy.description}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                        rows="4"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Requirements</label>
                                    <textarea
                                        value={jobVacancy.requirement}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                        rows="4"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Contact Phone</label>
                                    <input
                                        type="text"
                                        value={jobVacancy.contact_phone}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Contact Email</label>
                                    <input
                                        type="text"
                                        value={jobVacancy.contact_email}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Address</label>
                                    <input
                                        type="text"
                                        value={jobVacancy.address}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdministratorLayout>
        </Router>
    );
}
