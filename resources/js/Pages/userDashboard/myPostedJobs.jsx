import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdministratorLayout from '@/Layouts/UserDashboardLayout';
import { Head, Link ,usePage} from '@inertiajs/react';
import Sidebar from '../../Components/User/Sidebar';
import Pagination from '../../Components/Pagination';


export default function MyPostedJobs(props) {

    const { posts } = usePage().props

    return (

        <Router>
            <AdministratorLayout user={props.auth.user}>
                <Head title="Adminstrator" />

                <div className="flex">
                    <Sidebar />
                    <div className="w-full">
                        <h1 class="text-3xl md:text-3xl font-medium mb-2 pl-4 pt-4">My Posted Job Vacancies</h1>

                        <div className='flex ml-4'>
                            <a href='/createVacancy' className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'>Add new Job Vacancy</a>
                        </div>

                        <div>
                            {posts.data.length > 0 ? (
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr class="">
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company Name</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Closing Date</th>
                                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {posts.data.map(({ id,company_name,title,location,closing_date, user_id}) => (
                                        <tr key={id} >
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{company_name}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{title}</td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-lime-100">{closing_date}</td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
                                                <Link
                                                    href={`/userDashboard/jobVacancy/${id}`}
                                                    className="rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-green-800 duration-300">
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/userDashboard/jobVacancy/${id}/edit`}
                                                    className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/userDashboard/jobVacancy/${id}/delete`}
                                                    className="rounded-lg px-4 py-2 bg-red-600 text-blue-100 hover:bg-red-700 duration-300">
                                                    Remove
                                                </Link> 
                                                <Link
                                                    href={`/userDashboard/jobVacancy/${id}/applications`}
                                                    className="rounded-lg px-4 py-2 bg-violet-600 text-blue-100 hover:bg-violet-900 duration-300">
                                                    View Applications
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500 text-lg">No job vacancies have been posted yet.</p>
                                    </div>
                                )}
                            {posts.links && posts.links.length > 1 && (
                                <div className="flex justify-center">
                                    <Pagination class="mt-6" links={posts.links} />
                                </div> 
                             )}       
                        </div>
                    </div>
                </div>

            </AdministratorLayout>
        </Router>

    );

}