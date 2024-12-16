import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Head, Link ,usePage} from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Administrator/Sidebar';
import Pagination from '../../Components/Pagination';
import axios from "axios";

export default function Users(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/administrator/getUsers");
            //console.log(response.data.data);
            setUsers(response.data.data);
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
                    <h1 class="text-3xl md:text-3xl font-medium mb-2 pl-4 pt-4">Manage Users</h1>
                        <div>
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User ID</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User Name</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.id}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.name}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button class="rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300" onClick={() => handleRemvoeClick(user)}>Remove</button>
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