import React from 'react';

export default function UserAppliedJobs() {
  
  const appliedJobs = [    //Dummy data, backend will fetch real data
    {
      id: 1,                     
      title: "Software Engineer",
      company: "Tech Solutions",
      location: "Colombo",
      status: "Pending",
    },
    {
      id: 2,
      title: "Project Manager",
      company: "Innovate Lanka",
      location: "Galle",
      status: "Accepted",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Minds",
      location: "Kandy",
      status: "Rejected",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Applied Job Vacancies</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#29AB87] text-gray-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Vacancy ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Job Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Company Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Application Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job, index) => (
              <tr
                key={job.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{job.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{job.title}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{job.company}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{job.location}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : job.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
