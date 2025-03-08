import React, { useState } from 'react';
import AdministratorLayout from '@/Layouts/AdministratorLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Sidebar from '../../Components/Administrator/Sidebar';
import { ArrowLeft } from 'lucide-react';

export default function EditPromotion({ auth }) {
  const { promotion } = usePage().props;

  const [formData, setFormData] = useState({
    ads_image: '',
    description: promotion.description,
    text: promotion.text,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, ads_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('ads_image', formData.ads_image);
    data.append('description', formData.description);
    data.append('text', formData.text);

    try {
      const response = await fetch(`/updatePromotion/${promotion.id}`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
        body: data,
      });

      if (response.ok) {
        alert('Promotion updated successfully!');
        window.location.href = "/administrator/getPromotions";
      } else {
        alert('Failed to update promotion.');
      }
    } catch (error) {
      console.error('Error updating promotion:', error);
    }
  };

  return (
    <AdministratorLayout user={auth.user}>
      <Head title="Edit Promotion" />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full p-8 bg-white shadow-md rounded-md space-y-4">
          <h3 className="text-3xl font-semibold mb-4">Edit Promotion</h3>

          {/* Back Button */}
          <div className="flex mb-2">
            <a
              href="/administrator/getPromotions"
              className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 flex items-center"
            >
              <ArrowLeft size={20} className="mr-2" /> Back
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-gray-700">Advertisment Image:</label>
              <input type="file" name="ads_image" onChange={handleFileChange} className="w-full mt-2" />
            </div>

            {/* Description Textarea */}
            <div className="mb-2">
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-2 border px-4 py-2 rounded-md"
                rows="4"
              />
            </div>

            {/* Text Textarea */}
            <div className="mb-2">
              <label className="block text-gray-700">Text:</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                className="w-full mt-2 border px-4 py-2 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-200 bg-blue-600 text-white px-4 py-2 mt-4 rounded-md"
            >
              Update Promotion
            </button>
          </form>
        </div>
      </div>
    </AdministratorLayout>
  );
}
