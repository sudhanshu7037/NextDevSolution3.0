import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/contact`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Form Submissions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <th className="p-4 border-b">Date</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Phone</th>
              <th className="p-4 border-b">Service</th>
              <th className="p-4 border-b">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border-b text-sm">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="p-4 border-b font-medium">{c.name}</td>
                <td className="p-4 border-b text-sm">{c.phone}</td>
                <td className="p-4 border-b text-sm">
                  <span className="bg-[#e8f4f4] text-[#17a2a2] px-2 py-1 rounded text-xs font-bold uppercase">
                    {c.service || 'General'}
                  </span>
                </td>
                <td className="p-4 border-b text-sm text-gray-600">{c.message}</td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">No submissions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContacts;
