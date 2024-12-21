import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { BrowserRouter as Router } from "react-router-dom";
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Administrator/Sidebar';
import Pagination from '../../Components/Pagination';
import axios from "axios";
import { Eye, Edit3, Link } from 'lucide-react';

export default function Promotion(props) {
    const [promotions, setPromotions] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get("/administrator/getPromotions");
            setPromotions(response.data.data);
            setPagination(response.data.links);
        } catch (error) {
            console.error("Error fetching promotions:", error);
        }
    };

    const handleRemoveClick = async (promo) => {
        if (!window.confirm(`Are you sure you want to remove the promotion with ID: ${promo.id}?`)) {
            return;
        }
        try {
            await axios.delete(`/administrator/removePromotion/${promo.id}`);
            setPromotions(promotions.filter((p) => p.id !== promo.id));
            alert("Promotion removed successfully!");
        } catch (error) {
            console.error("Error removing promotion:", error);
            alert("Failed to remove promotion. Please try again.");
        }
    };

    const handleViewImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdministratorLayout from '@/Layouts/AdministratorLayout';

import { Head, Link ,usePage} from '@inertiajs/react';
import Sidebar from '../../Components/Administrator/Sidebar';
import Pagination from '../../Components/Pagination';
import { Eye } from 'lucide-react';
  

export default function Promotions(props) {

    const { posts } = usePage().props

  

    return (

        <Router>
            <AdministratorLayout user={props.auth.user}>
                <Head title="Administrator" />
                <div className="flex">
                    <Sidebar />
                    <div className="w-full">
                        <h1 className="text-3xl font-medium mb-2 pl-4 pt-4">Manage Promotions</h1>
                        <div className="flex ml-4">
                            <a href='/createPromotion' className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'>Add new Promotion</a>
                        </div>
                        <div>
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Promotion ID</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">User ID</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Text</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Ad Image</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {promotions.map((promo) => (
                                        <tr key={promo.id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{promo.id}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{promo.user_id}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{promo.description}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{promo.text}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button
                                                    className="rounded-lg px-4 py-2 bg-green-300 hover:bg-green-400 duration-300"
                                                    onClick={() => handleViewImage(promo.ads_image)}
                                                >
                                                    <Eye size={20} />
                                                </button>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button
                                                    className="rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300 mr-2"
                                                    onClick={() => handleRemoveClick(promo)}
                                                >
                                                    Remove
                                                </button>
                                {posts.data.map(({ id, user_id, description, text,ads_image}) => (
                                        <tr key={id} >
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{id}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{user_id}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{description}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{text}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100"><button class="rounded-lg px-4 py-2 bg-green-300 hover:bg-green-400 duration-300" onClick={() => viewAdImg(ads_image)}><Eye size={20} /></button></td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mr-2" onClick={() => handleRemvoeClick(id)}>Edit</button></td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button class="rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300" onClick={() => handleRemvoeClick(id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {selectedImage && (
                                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                                    <div className="bg-white p-4 rounded-lg shadow-lg relative">
                                        <button
                                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                            onClick={closeImageModal}
                                        >
                                            Close
                                        </button>
                                        <img src={selectedImage} alt="Ad Preview" className="max-w-full max-h-[500px]" />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-center">
                                <Pagination className="mt-6" links={pagination} />
                            </div>
                            <div className="flex justify-center">
                            <Pagination class="mt-6" links={posts.links} />
                            </div>        
                        </div>
                    </div>
                </div>
            </AdministratorLayout>
        </Router>

    );
}

}
