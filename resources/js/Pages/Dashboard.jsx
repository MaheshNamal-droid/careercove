import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ModelVacancys from '../Components/ModelVacancys';
import ModalPromo from '../Components/ModelPromotions';

export default function Dashboard({ auth, candidates, jobsPosted, companies }) {

    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        setShowModel(true);
    }, []);
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            {showModel && <ModalPromo onClose={() => setShowModel(false)} />}
            <div className="dashboard_top_container">
                <div className='inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-brightness-75'>
                    <div className='flex flex-col gap-5 text-white mt-20 mb-20'>
                        <div className='px-20 py-10 flex flex-col gap-5 items-center'>
                            <h1 className='text-2xl text-center'>The Easiest Way To Get Your Dream<br /> Job</h1>
                            <p className='text-1xl text-center'>Find jobs that fit your skills, passions, and dreams.</p>
                            <div className='flex gap-5 flex-row text-black'>
                              <input type="text" className='bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' placeholder='job title , company' />
                              <button class="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">Search</button>
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
            <ModelVacancys />
            <div className="py-12">
            </div>
        </AuthenticatedLayout>
    );
}
