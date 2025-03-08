import UserDashboardLayout from '@/Layouts/UserDashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '../../Components/User/Sidebar';
import { ArrowLeft } from 'lucide-react';

export default function EditUserProfile({ auth, user_profile }) {
  const { data, setData, post, processing } = useForm({  
    first_name: user_profile.first_name || "",
    last_name: user_profile.last_name || "",
    email: user_profile.email || "",
    address: user_profile.address || "",
    contact_phone: user_profile.contact_phone || "",
    social_media: user_profile.social_media || "",
    description: user_profile.description || "",
    profile_picture: null,
    resume: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('updateUserProfile', { id: user_profile.id }), {
      forceFormData: true, // Required for file uploads
    });
  };

  return (
    <UserDashboardLayout user={auth.user}>
      <Head title="Edit Profile" />
      <div className="flex">
        <Sidebar />

        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold mb-4">Edit Profile</h1>

          {/* Back Button */}
          <div className="flex mb-4">
            <a
              href="/userProfile"
              className="rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-300 flex items-center"
            >
              <ArrowLeft size={20} className="mr-2" /> Back
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 gap-4 mb-6">
              <label className="block">
                First Name:
                <input
                  type="text"
                  value={data.first_name}
                  onChange={(e) => setData('first_name', e.target.value)}
                  className="block w-full border rounded px-3 py-2"
                />
              </label>

              <label className="block">
                Last Name:
                <input
                  type="text"
                  value={data.last_name}
                  onChange={(e) => setData('last_name', e.target.value)}
                  className="block w-full border rounded px-3 py-2"
                />
              </label>

              <label className="block">
                Email:
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="block w-full border rounded px-3 py-2"
                />
              </label>

              <label className="block">
                Profile Picture:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData('profile_picture', e.target.files[0])}
                  className="block w-full border rounded px-3 py-2"
                />
              </label>

              <label className="block">
                Resume (Image, PDF, DOCX):
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, image/*"
                  onChange={(e) => setData('resume', e.target.files[0])}
                  className="block w-full border rounded px-3 py-2"
                />
              </label>

              <label className="block">
                Address:
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => setData('address', e.target.value)}
                  className="block w-full border rounded px-3 py-2"
                />
              </label>

              <label className="block">
                Contact Phone:
                <input
                  type="text"
                  value={data.contact_phone}
                  onChange={(e) => setData('contact_phone', e.target.value)}
                  className="block w-full border rounded px-3 py-2"
                />
              </label>

              <label className="block">
                Description:
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="block w-full border rounded px-3 py-2"
                  rows="4"
                />
              </label>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={processing}
            >
              {processing ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </UserDashboardLayout>
  );
}
