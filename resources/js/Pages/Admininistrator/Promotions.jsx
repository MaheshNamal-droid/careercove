import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '../../Components/Administrator/Sidebar';
import Pagination from '../../Components/Pagination';
import { Eye, X } from 'lucide-react';

export default function Promotions(props) {
    const { posts } = usePage().props;
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to show the image in a modal
    const viewAdImg = (ads_image) => {
        if (ads_image) {
            setSelectedImage(`/files/${ads_image}`);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <Router>
            <AdministratorLayout user={props.auth.user}>
                <Head title="Administrator" />
                <div className="flex">
                    <Sidebar />
                    <div className="w-full">
                        <h1 className="text-3xl md:text-3xl font-medium mb-2 pl-4 pt-4">Manage Promotions</h1>
                        <div className='flex ml-4'>
                            <a href='/createPromotion' className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'>Add new Promotion</a>
                        </div>
                        <div>
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Promotion ID</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User ID</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Text</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ad Image</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.data.map(({ id, user_id, description, text, ads_image }) => (
                                        <tr key={id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{id}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{user_id}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{description}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{text}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">
                                                <button
                                                    className="rounded-lg px-4 py-2 bg-green-300 hover:bg-green-400 duration-300"
                                                    onClick={() => viewAdImg(ads_image)}
                                                >
                                                    <Eye size={20} />
                                                </button>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <a href={`/editPromotion/${id}`} className="rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-300 mr-2">Edit</a>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button className="rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-red-700 duration-300" onClick={() => handleRemoveClick(id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center">
                                <Pagination className="mt-6" links={posts.links} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
                        <div className="relative bg-white p-4 rounded-lg shadow-lg">
                            <button
                                className="absolute top-2 right-2 text-gray-700 hover:text-red-600"
                                onClick={closeModal}
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImage}
                                alt="Ad Image"
                                className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                )}
            </AdministratorLayout>
        </Router>
    );
}
