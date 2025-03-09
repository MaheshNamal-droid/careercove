import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Sidebar from '../../Components/User/Sidebar';
import AdministratorLayout from '@/Layouts/UserDashboardLayout';
import { ArrowLeft } from 'lucide-react';

export default function JobApplications(props) {
    const { applications, job } = usePage().props;

    // State to track application statuses
    const [appStatus, setAppStatus] = useState(
        applications.reduce((acc, app) => ({ ...acc, [app.id]: app.is_approve }), {})
    );

    // Function to update application status
    const handleStatusChange = (id, status) => {
        setAppStatus((prev) => ({ ...prev, [id]: status }));
    
        // Send request to update status in database
        router.post(route('applications.updateStatus'), { id, is_approve: status }, {
            preserveScroll: true,
            onSuccess: () => router.reload(),
            onError: () => alert("Failed to update status"),
        });
    };

    return (
        <AdministratorLayout user={props.auth.user}>
            <Head title="Job Applications" />
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <h1 className="text-3xl font-medium mb-2 pl-4 pt-4">
                        Applications for {job.title}
                    </h1>

                    {/* Back button to return to the job postings page */}
                    <div className='flex mb-4'>
                        <a href="/userDashboard/getMyPostedJobs" className='rounded-lg px-4 ml-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 flex items-center'>
                            <ArrowLeft size={20} className='mr-2' /> Back
                        </a>
                    </div>

                    {/* Display applications table only if there are applications */}
                    {applications.length > 0 ? (
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Applicant Name</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">View Resume</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(({ id, user, is_approved }) => (
                                    <tr key={id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {user ? user.name : 'Unknown'}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {user ? user.email : 'N/A'}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {user?.profile?.resume ? (
                                                <a
                                                    href={`/files/${user.profile.resume}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    View Resume
                                                </a>
                                            ) : (
                                                'No Resume Uploaded'
                                            )}
                                        </td>

                                        {is_approved === 0 && <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100 text-red-600">Pending</td>}
                                        {is_approved === 1 && <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100 text-green-600">Approved</td>}
                                        
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                className={`px-4 py-2 rounded-lg ${appStatus[id] === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                                                onClick={() => handleStatusChange(id, 1)}
                                                disabled={appStatus[id] === 1}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className={`ml-2 px-4 py-2 rounded-lg ${appStatus[id] === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
                                                onClick={() => handleStatusChange(id, 0)}
                                                disabled={appStatus[id] === 0}
                                            >
                                                Pending
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">No applications found for this job vacancy.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdministratorLayout>
    );
}
