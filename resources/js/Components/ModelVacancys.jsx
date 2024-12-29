import { useEffect, useState } from 'react';
import moment from 'moment';
import { Eye } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Collapsible from 'react-collapsible';
function ModelVacancys({ searchTerm }) {
    const [jobdata, setData] = useState([]);
    const [request_page, setRequestPage] = useState(0);

    const getRevews = async (id) => {
        const url = `/getReviews/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    };

    // Load job vacancies
    const loadVacancies = async () => {
        const url = `/dashboard/initiateScroll?page=${request_page}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setData(jobdata.concat(json.data));  // Append data to existing jobs
            setRequestPage(json.current_page + 1);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Load more vacancies when scrolled to the end
    useEffect(() => {
        //loadVacancies();
        // console.log('Hi ')
        window.onscroll = function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadVacancies();
            }
        };
    }, [jobdata, request_page]);

    useEffect(() => {
        loadVacancies();
    }, []);

    // Filter jobs by search term
    const filteredJobs = searchTerm
        ? jobdata.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : jobdata;

    // View job vacancy and increment the view count
    const viewVacancy = async (id) => {
        // Send a POST request to increment the view count of the job vacancy
        try {
            const response = await fetch('/dashboard/increment-view-count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content, // CSRF token
                },
                body: JSON.stringify({ id }), // Send the job vacancy ID in the request body as a JSON object
            });

            const result = await response.json();
            // Check if the view count increment successfully
            if (result.success) {
                window.location.href = `/dashboard/${id}`;
            } else {
                console.error('Failed to increment view count');
            }
        } catch (error) {
            console.error('Error incrementing view count:', error);
        }
    };

    // Navigate to review form with job_id
    const navigateToReviewForm = (jobId) => {
        window.location.href = `/createReview/${jobId}`;
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-10 text-gray-900">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div className='w-full flex flex-col border-solid border rounded-sm hover:bg-gray-100'>
                                    <div
                                        key={job.id}
                                        className="flex flex-row mb-2"
                                        onClick={() => viewVacancy(job.id)}
                                        style={{ color: '#edeaea4a' }}
                                    >
                                        <div className="w-1/4 p-2">
                                            <div className="size-16 place-content-center ml-10">
                                                <img
                                                    src={`../../files/${job.company_logo}`}
                                                    className="object-scale-down w-96"
                                                    alt="company-logo"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex flex-col pt-3 fo">
                                            <p style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>{job.title}</p>
                                            <p style={{ fontSize: 14, color: 'black' }}>{job.company_name}</p>
                                        </div>

                                        <div className="w-1/4 flex items-center flex-col pt-4">
                                            <p className='text-center text-black w-full text-sm'>Closing Date</p>
                                            <p className='text-center text-gray-500 w-full'>{job.closing_date}</p>
                                        </div>
                                        <div className="w-1/4 inline-flex items-center">
                                            <p style={{ fontSize: 14, color: 'black' }}>{job.full_or_part_time}</p>
                                        </div>
                                        <div className="w-1/4 flex flex-col items-left pt-3 fo gap-2">
                                            <span class="text-xs text-lime-500">
                                                Posted<span> </span>
                                                {moment.utc(job.created_at).local().startOf('seconds').fromNow()}
                                            </span>
                                            <div className='flex flex-row gap-2 w-full'>
                                                <span className='text-xs text-orange-500'>  <Eye size={16} /> </span>
                                                <span className='text-xs text-orange-500'>  {job.view_count}</span>
                                            </div>
                                            <div className='flex flex-row gap-2 w-full'>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the parent div onClick
                                                        navigateToReviewForm(job.id);
                                                    }}
                                                    className="rounded px-4 py-2 text-xs bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300"
                                                >
                                                    Add Review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <div className="w-full flex flex-col fo gap-2">
                                            <Collapsible trigger={["",
                                                <button className='text-s text-lime-500' onClick={() => getRevews(job.id)}>Reviews <ChevronDown size={16} /> </button>
                                            ]}>
                                                <div className="w-full">
                                                    <p>
                                                        This is the collapsible content. It can be any element or React
                                                        component you like.
                                                    </p>
                                                    <p>
                                                        It can even be another Collapsible component. Check out the next
                                                        section!
                                                    </p>
                                                </div>
                                            </Collapsible>
                                        </div>
                                    </div> */}
                                </div>
                            ))
                        ) : (
                            <p>No jobs found for your search.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModelVacancys;
