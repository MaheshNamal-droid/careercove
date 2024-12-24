import { useEffect, useState } from 'react';

function ModelVacancys({ searchTerm }) {
    const [jobdata, setData] = useState([]);
    const [request_page, setRequestPage] = useState(0);

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
        window.onscroll = function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadVacancies();
            }
        };
    }, [jobdata, request_page]);

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

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-10 text-gray-900">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="flex flex-row mb-2 border-solid border rounded-sm hover:bg-gray-100"
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
                                    <div className="w-1/4 flex flex-col pt-2">
                                        <p style={{ fontSize: 17, color: 'black' }}>{job.title}</p>
                                        <p style={{ fontSize: 13, color: 'black' }}>{job.company_name}</p>
                                    </div>
                                    <div className="w-1/4 inline-flex items-center">
                                        <p style={{ fontSize: 14, color: 'black' }}>{job.city}</p>
                                    </div>
                                    <div className="w-1/4 inline-flex items-center">
                                        <p style={{ fontSize: 14, color: 'black' }}>{job.full_or_part_time}</p>
                                    </div>
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
