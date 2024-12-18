import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Head, Link ,usePage} from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Administrator/Sidebar';
import Pagination from '../../Components/Pagination';
import axios from "axios";
import { Eye } from 'lucide-react';

export default function Promotion(props) {
    const [promotions, setPromotions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get("/administrator/getPromotions");
            //console.log(response.data.data);
            setPromotions(response.data.data);
            setPagination(response.data.links);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };
    const handleRemvoeClick = (user) => {
        removeUser(user);
    };

    const removeUser = async (updatedUser) => {
        try {
            await axios.put(`/administrator/deleteUser/${updatedUser.id}`, updatedUser);
            fetchUsers(); // Refresh the user list
            setSelectedUser(null); // Close the modal
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await axios.put(`http://localhost:8000/api/users/${updatedUser.id}`, updatedUser);
            fetchUsers(); // Refresh the user list
            setSelectedUser(null); // Close the modal
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <Router>
            <AdministratorLayout
                user={props.auth.user}
            >
                <Head title="Adminstrator" />

                <div className="flex">
                    <Sidebar />
                    <div className="w-full">
                    <h1 class="text-3xl md:text-3xl font-medium mb-2 pl-4 pt-4">Manage Promotions</h1>
                        <div className='flex ml-4'>
                            <a href='/createPromotion' className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'>Add new Promotion</a>
                        </div>
                        <div>
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr class="">
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Promotion ID</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User ID</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Text</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ad Image</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {promotions.map((promo) => (
                                        <tr key={promo.id} >
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{promo.id}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{promo.user_id}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{promo.description}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{promo.text}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100"><button class="rounded-lg px-4 py-2 bg-green-300 hover:bg-green-400 duration-300" onClick={() => viewAdImg(promo.ads_image)}><Eye size={20} /></button></td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 mr-2" onClick={() => handleRemvoeClick(promo)}>Edit</button></td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button class="rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300" onClick={() => handleRemvoeClick(promo)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center">
                            <Pagination class="mt-6" links={pagination} />
                            </div>        
                            {selectedUser && (
                                <EditUserModal
                                    user={selectedUser}
                                    onClose={() => setSelectedUser(null)}
                                    onSave={handleUpdateUser}
                                />
                            )}
                        </div>
                    </div>
                </div>

            </AdministratorLayout>
        </Router>
    );
}