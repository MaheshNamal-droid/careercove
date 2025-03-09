import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdministratorLayout from '@/Layouts/UserDashboardLayout';
import Sidebar from '../../Components/User/Sidebar';
import { ArrowLeft } from 'lucide-react';

export default function EditJobVacancy({ jobVacancy,cat_data, auth}) {
    const { data, setData, put, processing, errors } = useForm({
        title: jobVacancy.title || "",
        job_category: jobVacancy.job_category || "",
        full_or_part_time: jobVacancy.full_or_part_time || "",
        description: jobVacancy.description || "",
        requirement: jobVacancy.requirement || "",
        location: jobVacancy.location || "",
        closing_date: jobVacancy.closing_date || "",
        company_name: jobVacancy.company_name || "",
        contact_phone: jobVacancy.contact_phone || "",
        contact_email: jobVacancy.contact_email || "",
        city: jobVacancy.city || "",
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
                                        Category:
                                        <select
                                            value={data.job_category}
                                            onChange={(e) => setData("job_category", e.target.value)}
                                            id="job_category"
                                            name="job_category"
                                            required
                                            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                            >
                                            <option >Select a category</option>
                                            {cat_data.map((item) => (
                                                <option value={item.id}>{item.title}</option>
                                            ))}
                                        </select>
                                    </label>
                                    {/* <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option> */}
                                    <label className="block">
                                        Job Type:
                                        <select
                                            value={data.job_type}
                                            onChange={(e) => setData("full_or_part_time", e.target.value)}
                                            id="job_type"
                                            name="full_or_part_time"
                                            required
                                            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                                            >
                                            <option >Select a job type</option>
                                            {data.full_or_part_time === "Full Time" ? (
                                                <option value="Full Time" selected>Full Time</option>
                                            ) : (
                                                <option value="Full Time">Full Time</option>
                                            )}
                                            {data.full_or_part_time === "Part Time" ? (
                                                <option value="Part Time" selected>Part Time</option>
                                            ) : (
                                                <option value="Part Time">Part Time</option>
                                            )}
                                            {data.full_or_part_time === "Remote" ? (
                                                <option value="Remote" selected>Remote</option>
                                            ) : (
                                                <option value="Remote">Remote</option>
                                            )}
                                            {data.full_or_part_time === "Internship" ? (
                                                <option value="Internship" selected>Internship</option>
                                            ) : (
                                                <option value="Internship">Internship</option>
                                            )}
                                        </select>
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
                                        City:
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={(e) => setData("city", e.target.value)}
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
