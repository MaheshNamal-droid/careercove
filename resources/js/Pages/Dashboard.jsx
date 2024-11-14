import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const [jobdata, setData] = useState([]);
    const [request_page, setRequestPage] = useState(0)
    const loadVacancys = async (e) => {
        console.log(request_page);
        const url = "/dashboard/initiateScroll?page="+request_page;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }    
          const json = await response.json();
          //console.log(json);
          setData(jobdata.concat(json.data));
          setRequestPage(json.current_page+1);
        //   console.log(jobdata);
        } catch (error) {
          console.error(error.message);
        }
    };
    // calle load more vacancys when whan page is end
    window.onscroll = function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          //   console.log("end of page");
          loadVacancys();
        }
      };
    // window load
    window.onload = function() {
        loadVacancys();
      };
    return (
        <AuthenticatedLayout
            user={auth.user}
            //header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="dashboard_top_container">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <div class="bg-sky-500/100 h-10 w-10 rounded-full">
                   <p>Dashboard</p>
                    </div> 
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                                
                                {jobdata.map(job => {
                                    return (
                                        <div className="flex flex-row mb-2 border-solid border-2 border-sky-500">
                                            <div className="w-1/4">
                                                <div class="size-16 place-content-center">
                                                <img src={`../../files/${job.company_logo}`}  class="object-scale-down w-96"  alt="product-img"/>
                                                </div>
                                            </div>
                                            <div className="w-1/4">
                                            <p style={{ fontSize: 20, color: 'black' }}>{job.title}</p>
                                            <p style={{ fontSize: 20, color: 'black' }}>{job.company_name}</p>
                                            </div>
                                            <div className="w-1/4">
                                            <p style={{ fontSize: 20, color: 'black' }}>{job.city}</p>
                                            </div>
                                            <div className="w-1/4">
                                            <p style={{ fontSize: 20, color: 'black' }}>{job.full_or_part_time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
