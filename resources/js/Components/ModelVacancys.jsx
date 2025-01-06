import { useEffect, useState } from 'react';
import moment from 'moment';
import { Eye } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
function ModelVacancys({ searchTerm }) {
    const [jobdata, setData] = useState([]);
    const [request_page, setRequestPage] = useState(0);

    // get reviews by job id
    const getRevews = async (id, e) => {
        let parent = e.target.parentElement.parentElement.children[2];
        //parent.appendChild(Pagination);

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
    // submit review
    const submitReview = async (id, text) => {
        // Create FormData object to send form data and file
        const data = new FormData();
        data.append('text', text);
        data.append('job_id', id);  // Add job_id to the data
        try {
            const response = await fetch('/addReview', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                body: data,
            });

            if (response.ok) {
                alert('Review added successfully!');
            } else {
                alert('Failed to add review.');
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    }
    // toggel rewiews
    const toggleRewiew = (e, id) => {
        let rewiews = e.target.parentElement.parentElement.children[1];
        rewiews.style.display = rewiews.style.display === 'none' ? 'block' : 'none';
        rewiews.innerHTML = "";
        let reviews = getRevews(id, e);

        // Create a new input element for add reviews
        var newreview = document.createElement("textarea");
        newreview.className = "w-full text-slate-600 bg-white border border-slate-300 appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";
        newreview.placeholder = "Write your review here...";
        rewiews.appendChild(newreview);
        // Create a new button element for add reviews
        var newreviewbtn = document.createElement("button");
        newreviewbtn.className = "rounded px-4 py-2 text-xs bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300";
        newreviewbtn.textContent = "Post Review";
        newreviewbtn.addEventListener("click", () => {
            submitReview(id, newreview.value);
        })
        rewiews.appendChild(newreviewbtn);

        reviews.then((result) => {
            result.forEach((review) => {
                var rewiewuser = document.createElement("div");
                rewiewuser.className = "px-4 py-2 text-xs font-semibold underline";
                rewiewuser.textContent = review.name + " - " + review.created_at;
                rewiews.appendChild(rewiewuser);

                var reviewselement = document.createElement("div");
                reviewselement.className = "px-4 py-2 text-xs";
                reviewselement.textContent = review.text;
                rewiews.appendChild(reviewselement);
            })
        })
    }
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
                                        className="flex flex-row"
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

                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-col fo gap-2'>

                                        <div className='flex flex-row gap-2 w-1/4 p-2' onClick={(e) => toggleRewiew(e, job.id)}>
                                            <span className='ml-5 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150'> Reviews <ChevronDown size={16} align="center" /></span>
                                        </div>
                                        <div className='w-full flex flex-col fo gap-2 p-5' style={{ display: 'none' }} >

                                        </div>
                                        <div class="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent"></div>
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
