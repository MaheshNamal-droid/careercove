import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';


export default function viewVacancy({ data, auth }) {
    console.log(data);
    return (
        <AuthenticatedLayout
            user={auth.user}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Vacancy{data.id}</h2>}
        >
            <Head title="Dashboard" />

            <div className="dashboard_top_container">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="bg-sky-500/100 h-10 w-10 rounded-full">
                        <p>View Vacancy{data.id}</p>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="font-semibold text-2xl text-gray-800 leading-tight text-center underline underline-offset-1 mb-5">{data.title}</h1>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight text-center mb-2">{data.company_name}</p>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight text-center leading-6 mb-2">{data.description}</p>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight  leading-6 mb-2 text-center underline underline-offset-1 mb-1">Prerequisites</p>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight text-center leading-6 mb-2">{data.requirement}</p>
                            <div class="place-content-center">
                                <img src={`../../files/${data.files}`}  alt="product-img"/>
                            </div>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight  leading-6 mb-2 text-center underline underline-offset-1 mt-5">Contact details</p>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight text-center mb-2">Email : {data.contact_email}</p>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight text-center mb-2">Phone : {data.contact_phone}</p>
                            <div class="font-semibold text-1xl text-gray-800 leading-tight text-center mb-2">
                                <a href={data.location} target="_blank" class="text-blue-500">View Location</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
