import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboardLayout from '@/Layouts/UserDashboardLayout';
import { Head, Link ,usePage} from '@inertiajs/react';
import Sidebar from '../../Components/User/Sidebar';
import Pagination from '../../Components/Pagination';
import { Eye } from 'lucide-react';
  

export default function myApplications(props) {

    const { posts } = usePage().props
    return (

        <Router>
            <UserDashboardLayout user={props.auth.user}>
                <Head title="User Dashboard" />

                <div className="flex">
                    <Sidebar />
                    <div className="w-full">
                    <h1 class="text-3xl md:text-3xl font-medium mb-2 pl-4 pt-4">My Applications</h1>
                        <div>
                            {posts.data.length > 0 ? (
                                <table class="min-w-full leading-normal">
                                    <thead>
                                        <tr class="">
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Appication ID</th>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applied Date</th>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Note</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {posts.data.map(({ id,user_id,title,created_at,is_approved,note}) => (
                                            <tr key={id} >
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{id}</td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{title}</td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{created_at}</td>
                                                {is_approved === 0 && <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100 text-red-600">Pending</td>}
                                                {is_approved === 1 && <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100 text-green-600">Approved</td>}
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500 text-lg">No job applications have been submitted yet.</p>
                                    </div>
                                )}
                            <div className="flex justify-center">
                                <Pagination class="mt-6" links={posts.links} />
                            </div>        
                        </div>
                    </div>
                </div>

            </UserDashboardLayout>
        </Router>

    );

}