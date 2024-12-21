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