import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="/administrator" className="hover:text-gray-300">Dashboard</a>
          </li>
          <li className="mb-4">
            <a href="/administrator/users" className="hover:text-gray-300">Users</a>
          </li>
          <li className="mb-4">
            <a href="/administrator/getPromotions" className="hover:text-gray-300">Promotions</a>
          </li>
          <li>
            <Link to="/settings" className="hover:text-gray-300">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
