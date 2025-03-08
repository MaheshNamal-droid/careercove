import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ModelVacancys from '../Components/ModelVacancys';
import ModalPromo from '../Components/ModelPromotions';
import Footer from '../Components/Footer';

export default function Dashboard({ auth, candidates, jobsPosted, companies }) {

    const [showModel, setShowModel] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // State for user input
    const [activeSearchTerm, setActiveSearchTerm] = useState(""); // State for triggered search

    useEffect(() => {
        setShowModel(true);
    }, []);

    const handleSearchInput = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setActiveSearchTerm(""); // Reset search term
        }
    };

    const handleSearchClick = () => {
        setActiveSearchTerm(searchTerm.trim());
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="dashboard_top_container">
                <div className="inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-brightness-75">
                    <div className="flex flex-col gap-5 text-white mt-20 mb-20">
                        <div className="px-20 py-10 flex flex-col gap-5 items-center">
                            <h1 className="text-2xl text-center">
                                The Easiest Way To Get Your Dream Job
                            </h1>

                            <p className="mt-4 text-lg text-center text-white">
                                Unlock your career potential with Career Cove, where opportunities meet talent, and your dream job is just a click away.
                            </p>

                            <div className="flex gap-5 flex-row text-black">
                                <input
                                    type="text"
                                    className="bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm px-4 py-2 text-left w-96"
                                    placeholder="Job title, company"
                                    value={searchTerm}
                                    onChange={handleSearchInput}
                                />
                                <button
                                    className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleSearchClick}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard_second_container">
                <div className='inset-0 flex justify-center items-center bg-lime-500 bg-opacity-90'>
                    <div className='flex flex-col gap-5 text-white'>
                        <div className='px-20 py-10 flex flex-col gap-5 items-center'>
                            <h1 className='text-2xl text-center'>CAREER COVE Site Stats</h1>
                            <p className='text-1xl text-center'>Your gateway to career success - where opportunities and talent meet. </p>
                            <div className='flex gap-20 flex-row text-white'>
                                <div className='flex flex-col gap-5'>
                                    <h1 className='text-2xl text-center font-black'>{candidates}</h1>
                                    <p className='text-xs text-center'>Candidates</p>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <h1 className='text-2xl text-center font-black'>{jobsPosted}</h1>
                                    <p className='text-xs text-center'>Jobs Posted</p>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <h1 className='text-2xl text-center font-black'>{companies}</h1>
                                    <p className='text-xs text-center'>Companies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModelVacancys searchTerm={activeSearchTerm} />
            {showModel && <ModalPromo onClose={() => setShowModel(false)} />}
            <div className="py-12"></div>

            {/* Footer */}
            <Footer />
        </AuthenticatedLayout>
    );
}
