import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from '../../Components/ModelSuccess';
import moment from 'moment';
import { ArrowLeft } from 'lucide-react';



export default function viewVacancy({ data, auth }) {
    const [showModel, setShowModel] = useState(false);
    const [responsemsg, setResponsemsg] = useState(false);
    const [responsestatus, setresponsestatus] = useState(false);
    const [userprofilestatus, setuserprofilestatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    console.log(auth.user);
    const handleApply = async (e) => {
        e.preventDefault();
        // check if user has a logged in 
        if(!auth.user){
                setResponsemsg("You need to login to apply vacancy.");
                setLoginStatus(false);
                setShowModel(true);
            return false;
        }else{
            setLoginStatus(true);
        }
        // Create FormData object to send form data and file
        const form_data = new FormData();
        form_data.append('jobid', data.id);

        try {
            const response = await fetch('/applyVacancy', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                body: form_data,
            });

            if (response.ok) {
                console.log(response.status);
                setResponsemsg("Your application has been submitted successfully!");
                setShowModel(true);
                setresponsestatus(true);
                setuserprofilestatus(true);
            } else {
                if (response.status === 403) {
                    setuserprofilestatus(false);
                    setResponsemsg("Oops! Create a user profile to apply vacancy.");
                } else {
                    setResponsemsg("Oops! Something went wrong. Please try again.");
                }
                setShowModel(true);
                setresponsestatus(false);
                // alert('Failed to Apply vacancy.');
            }
        } catch (error) {
            console.error('Error adding vacancy:', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Vacancy{data.id}</h2>}
        >
            <Head title="Dashboard" />
            {showModel && <Modal onClose={() => setShowModel(false)} responsemsg={responsemsg} responsestatus={responsestatus} userprofilestatus={userprofilestatus} loginStatus={loginStatus} />}
            <div className="py-12 bg-gray-700">
                <main class="main bg-white px-6 md:px-16 py-6 mt-5">

                <button  //Back button
            onClick={() => (window.location.href = '/')} 
            className="absolute top-20 right-6 flex items-center px-2 py-2 text-sm font-bold text-white bg-gray-500 rounded-sm hover:bg-gray-700"
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
        </button>
                    <div class="flex flex-wrap justify-between max-w-6xl mx-auto">
                        <div class="job-post w-full md:w-12/12">
                            <div class="job-meta mb-4">
                                <span class="text-xs text-gray-500">
                                    Posted<span> </span>
                                    {moment.utc(data.created_at).local().startOf('seconds').fromNow()}
                                </span>

                                <h1 class="job-title text-2xl">
                                    {data.title}
                                </h1>

                                <span class="job-type bg-teal-500 text-white p-1 text-xs mr-4">{data.full_or_part_time}</span>
                                <span class="job-location text-xs">{data.company_name}</span>
                                <span class="remote-job text-xs ml-4">Remote Job</span>
                            </div>
                        </div>
                        <div class="job-description mb-4">
                            <h3 class="text-xl">Prerequisites</h3>
                            <p class="mb-2">
                                {data.requirement}
                            </p>
                        </div>
                        <div class="job-description mb-4 w-full">
                            <h3 class="text-xl">Description</h3>
                            <p class="mb-2">
                                {data.description}
                            </p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div class="place-content-center">
                                    <img src={`../../files/${data.files}`} alt="product-img" />
                                </div>
                                <div class="job-post w-full md:w-12/12">
                                    <div class="job-meta mb-4 mt-5 m-b-5">
                                        <h1 class="job-title text-2xl">
                                        Contact Details
                                        </h1>
                                        <span class="text-s">Email : {data.contact_email}</span>
                                        <span class="text-s ml-4">Phone : {data.contact_phone}</span>
                                        <span class="text-s ml-4">Location :{data.location}</span>
                                    </div>
                                </div>
                                <a onClick={handleApply}

                                    className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm font-bold bg-green-300 leading-6 capitalize duration-100 rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
                                    Apply
                                    <span class="ml-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
