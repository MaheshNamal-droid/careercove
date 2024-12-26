import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdministratorLayout from '@/Layouts/UserDashboardLayout';
import Sidebar from '../../Components/User/Sidebar';
import { ArrowLeft } from 'lucide-react';

export default function EditJobVacancy({ jobVacancy, auth}) {

    const { data, setData, put, processing, errors } = useForm({
        title: jobVacancy.title || "",
        description: jobVacancy.description || "",
        requirement: jobVacancy.requirement || "",
        location: jobVacancy.location || "",
        closing_date: jobVacancy.closing_date || "",
        company_name: jobVacancy.company_name || "",
        contact_phone: jobVacancy.contact_phone || "",
        contact_email: jobVacancy.contact_email || "",
        address: jobVacancy.address || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/userDashboard/jobVacancy/${jobVacancy.id}`); // Send PUT request to update
    };

    return (
        <Router>
            <AdministratorLayout user={auth.user}>
                <div className="flex">
                    <Sidebar />
                    <div className="w-full">
                        <div className="p-6">
                            <Head title={`Edit Job Vacancy: ${jobVacancy.title}`} />
                            <h1 className="text-3xl font-semibold mb-4">Edit Job Vacancy</h1>

                            <div className='flex mb-4'>
                                    <a href="/userDashboard/getMyPostedJobs" className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 flex items-center'>
                                    <ArrowLeft size={20} className='mr-2'/> Back</a>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4 mb-6">
                                    <label className="block">
                                        Title:
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                        {errors.title && <span className="text-red-500">{errors.title}</span>}
                                    </label>
                                    <label className="block">
                                        Description:
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData("description", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                        {errors.description && <span className="text-red-500">{errors.description}</span>}
                                    </label>
                                    <label className="block">
                                        Requirements:
                                        <textarea
                                            value={data.requirement}
                                            onChange={(e) => setData("requirement", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                        {errors.requirement && <span className="text-red-500">{errors.requirement}</span>}
                                    </label>
                                    <label className="block">
                                        Location:
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData("location", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                        {errors.location && <span className="text-red-500">{errors.location}</span>}
                                    </label>
                                    <label className="block">
                                        Closing Date:
                                        <input
                                            type="date"
                                            value={data.closing_date}
                                            onChange={(e) => setData("closing_date", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                        {errors.closing_date && <span className="text-red-500">{errors.closing_date}</span>}
                                    </label>
                                    <label className="block">
                                        Company Name:
                                        <input
                                            type="text"
                                            value={data.company_name}
                                            onChange={(e) => setData("company_name", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                        {errors.company_name && <span className="text-red-500">{errors.company_name}</span>}
                                    </label>
                                    <label className="block">
                                        Contact Phone:
                                        <input
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={(e) => setData("contact_phone", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                    </label>
                                    <label className="block">
                                        Contact Email:
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData("contact_email", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                    </label>
                                    <label className="block">
                                        Address:
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData("address", e.target.value)}
                                            className="block w-full border rounded px-3 py-2"
                                        />
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    disabled={processing}>
                                    {processing ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </AdministratorLayout>
        </Router>
    );
}
