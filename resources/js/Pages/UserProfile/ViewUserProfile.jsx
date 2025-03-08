import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UserDashboardLayout from '@/Layouts/UserDashboardLayout';
import Sidebar from '../../Components/User/Sidebar';

export default function ViewUserProfile({ auth, user_profile }) {
  return (
    <UserDashboardLayout user={auth.user}>
      <Head title="User Profile" />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center min-h-screen bg-gray-50">
          <div className="max-w-2xl w-full bg-white shadow-md rounded-md p-6 space-y-4 ">
            <h3 className="text-3xl font-semibold text-center text-[#254336] pb-2">My User Profile</h3>

            {/* Render user profile details */}
            {user_profile ? (
              <>

                {/* Render user profile picture */}
                {user_profile.profile_picture && (
                  <div className="flex justify-center">
                    <img
                      src={`/files/${user_profile.profile_picture}`}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full border-2 border-blue-600"
                    />
                  </div>
                )}

                {/* Render user details */}
                <div>
                  <label className="block text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    value={`${user_profile.first_name} ${user_profile.last_name}`}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="text"
                    value={user_profile.email}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Address</label>
                  <input
                    type="text"
                    value={user_profile.address}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Phone</label>
                  <input
                    type="text"
                    value={user_profile.contact_phone}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Social Media</label>
                  <a
                    href={user_profile.social_media}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Profile
                  </a>
                </div>

                {user_profile.resume && (
                  <div>
                    <label className="block text-gray-700 font-medium">Resume </label>
                    <a
                      href={`/files/${user_profile.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Resume
                    </a>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium">Description</label>
                  <textarea
                    value={user_profile.description}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
                    rows="4"
                  />
                </div>

                {/* Edit Profile Button */}
                <div className="text-center mt-4">
                  <Link
                    href={route('editUserProfile', { id: user_profile.id })}
                    className="rounded-lg px-6 py-2 bg-blue-600 text-blue-200 hover:bg-blue-700 duration-300 "
                  >
                    Edit Profile
                  </Link>
                </div>
              </>
            ) : (

              // If user profile is not available, display this message and button to create a profile

              <div className="flex flex-col justify-start items-center text-center space-y-4 mt-20">
                <p className="text-gray-600 text-lg pb-4">You do not have a profile yet. Create your profile now.</p>
                <Link
                  href={route('createUserProfile')}
                  className="rounded-lg px-12 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 text-lg font-semibold"
                >
                  Create Profile
                </Link>
              </div>

            )}
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
}
