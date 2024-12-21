import React, { useState, useEffect } from 'react';
import axios from "axios";
import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { Head } from '@inertiajs/react';
import Sidebar from '../../Components/Administrator/Sidebar';
import Pagination from '../../Components/Pagination';
import { BrowserRouter as Router } from "react-router-dom";

export default function JobVacancies(props) {
  const [vacancies, setVacancies] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    fetchVacancies(); // Initial fetch of vacancies
  }, []);

  // Fetch job vacancies with the optional search query
  const fetchVacancies = async (query = "") => {
    try {
      const response = await axios.get("/administrator/getJobVacancies", {
        params: { query }, // Pass search query to the backend
      });
      setVacancies(response.data.data);
      setPagination(response.data.links);
    } catch (error) {
      console.error("Error fetching job vacancies:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update search query
    if (query === "") {
      fetchVacancies(); // If input is cleared, fetch all vacancies
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    fetchVacancies(searchQuery); // Fetch vacancies based on search query
  };

  const handleRemoveClick = (vacancy) => {
    removeVacancy(vacancy);
  };

  const removeVacancy = async (vacancy) => {
    try {
      await axios.put(`/administrator/deleteJobVacancy/${vacancy.id}`);
      fetchVacancies(); // Refetch vacancies after removal
    } catch (error) {
      console.error("Error removing job vacancy:", error);
    }
  };

  const handleViewDetailsClick = (vacancy) => {
    setSelectedVacancy(vacancy);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVacancy(null);
  };

  return (
    <Router>
      <AdministratorLayout user={props.auth.user}>
        <Head title="Manage Job Vacancies" />
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <h1 className="text-3xl font-medium mb-4 pl-4 pt-4">Manage Job Vacancies</h1>

            {/* Search Bar */}
            <div className="mb-4 pl-4 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Job Title or Company Name"
                className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
              />
              <button
                onClick={handleSearchClick}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </div>

            <div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Vacancy ID</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Job Title</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Company Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Views</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.map((vacancy) => (
                    <tr key={vacancy.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{vacancy.id}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{vacancy.title}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{vacancy.company_name}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{vacancy.location}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{vacancy.view_count}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          className="mr-2 rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 duration-300 w-32"
                          onClick={() => handleViewDetailsClick(vacancy)}
                        >
                          View Details
                        </button>
                        <button
                          className="rounded-lg px-4 py-2 bg-red-600 text-white hover:bg-red-700 duration-300 w-32"
                          onClick={() => handleRemoveClick(vacancy)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-6">
                <Pagination links={pagination} />
              </div>
            </div>
          </div>
        </div>

        {/* Modal for viewing job vacancy details */}
        {showModal && selectedVacancy && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">Job Vacancy Details</h2>
              <p><strong>Job Title:</strong> {selectedVacancy.title}</p>
              <p><strong>Company Name:</strong> {selectedVacancy.company_name}</p>
              <p><strong>Location:</strong> {selectedVacancy.location}</p>
              <p><strong>Description:</strong> {selectedVacancy.description}</p>
              <p><strong>Requirements:</strong> {selectedVacancy.requirement}</p>
              <p><strong>Contact Phone:</strong> {selectedVacancy.contact_phone}</p>
              <p><strong>Contact Email:</strong> {selectedVacancy.contact_email}</p>
              <p><strong>Closing Date:</strong> {selectedVacancy.closing_date}</p>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AdministratorLayout>
    </Router>
  );
}
