import React, { useState, useEffect } from 'react';
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

    // State to manage the note functionality
    const [note, setNote] = useState('');
    const [editingAppId, setEditingAppId] = useState(null);

    // Function to update application status
    const handleStatusChange = (id, status) => {
        setAppStatus((prev) => ({ ...prev, [id]: status }));
    
        // Send request to update status in the database
        router.post(route('applications.updateStatus'), { id, is_approve: status }, {
            preserveScroll: true,
            onSuccess: () => router.reload(),
            onError: () => alert("Failed to update status"),
        });
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const saveNote = () => {
        if (note.trim() !== '') {
            // Send the note to the backend
            router.post(route('application.addNote'), { id: editingAppId, note }, {
                preserveScroll: true,
                onSuccess: () => {
                    setNote(''); // Clear the note input field
                    setEditingAppId(null); // Close the modal
                    router.reload();
                },
                onError: () => alert("Failed to add the note."),
            });
        }
    };

    const openEditNoteModal = (id, currentNote) => {
        setEditingAppId(id);
        setNote(currentNote); // Set the current note in the textarea for editing
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
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Note</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(({ id, user, is_approved, note }) => (
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

                                        {is_approved === 0 && <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100 text-red-600">Pending</td>}
                                        {is_approved === 1 && <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100 text-green-600">Approved</td>}

                                        {/* Display the existing note */}
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {note ? note : 'No note added'}
                                        </td>

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
                                            <button
                                                className="ml-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white"
                                                onClick={() => openEditNoteModal(id, note)} // Open the modal for adding a note
                                            >
                                                Add/Edit Note
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

            {/* Modal to add/edit note */}
            {editingAppId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-2xl mb-4">Add/Edit Note</h2>
                        <textarea
                            value={note}
                            onChange={handleNoteChange}
                            className="w-full p-2 border rounded"
                            rows="4"
                            placeholder="Write your note here"
                        />
                        <div className="mt-4">
                            <button onClick={saveNote} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                                Save Note
                            </button>
                            <button onClick={() => setEditingAppId(null)} className="bg-gray-500 text-white py-2 px-4 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdministratorLayout>
    );
}
