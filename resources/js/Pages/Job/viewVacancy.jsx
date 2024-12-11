import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Modal from '../../Components/ModelSuccess';


export default function viewVacancy({ data, auth }) {
    const [showModel, setShowModel] = useState(false);
    const [responsemsg, setResponsemsg] = useState(false);
    const [responsestatus, setresponsestatus] = useState(false);
    const handleApply = async (e) => {
        e.preventDefault();
        
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
           // alert('Applyed successfully!');
            setResponsemsg("Your application has been submitted successfully!");
            setShowModel(true);
            setresponsestatus(true);
          } else {
            setResponsemsg("Oops! Something went wrong. Please try again.");
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
            {showModel && <Modal onClose={() => setShowModel(false)} responsemsg={responsemsg} responsestatus={responsestatus}/>}

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
                                <img src={`../../files/${data.files}`} alt="product-img" />
                            </div>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight  leading-6 mb-2 text-center underline underline-offset-1 mt-5">Contact details</p>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight text-center mb-2">Email : {data.contact_email}</p>
                            <p className="font-semibold text-1xl text-gray-800 leading-tight text-center mb-2">Phone : {data.contact_phone}</p>
                            <div class="font-semibold text-1xl text-gray-800 leading-tight text-center mb-2">
                                <a href={data.location} target="_blank" class="text-blue-500">View Location</a>
                            </div>
                            <a  onClick={handleApply}
                           
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
            </div>
        </AuthenticatedLayout>
    );
}
