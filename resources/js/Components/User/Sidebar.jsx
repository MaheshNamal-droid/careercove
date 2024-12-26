import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-4">
      <h2 className="text-2xl font-bold mb-6">My Details</h2>
      <nav>
        <ul>
        <li className="mb-4">
            <a href="/userDashboard" className="hover:text-gray-300">Dashboard</a>
          </li>
          <li className="mb-4">
            <a href="/createUserProfile" className="hover:text-gray-300">Profile</a>
          </li>
          <li className="mb-4">
            <a href="/userDashboard/getApplications" className="hover:text-gray-300">My Applications</a>
          </li>
          <li className="mb-4">
            <a href="" className="hover:text-gray-300">My Vacancies</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
