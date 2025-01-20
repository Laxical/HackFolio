import React from "react";
import axios from "axios";

const AdminSponsorDetail = ({ sponsor, onClose, onUpdate }) => {
  const handleVerify = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors/admin/verify/${sponsor.companyName}`, {
        verificationStatus: 'Verified',
      });
      
      onUpdate(); // Call onUpdate to refresh the sponsor list
      onClose(); // Close the detail view
    } catch (error) {
      console.error('Error verifying sponsor:', error);
      alert('Failed to verify sponsor');
    }
  };

  const handleDecline = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors/admin/decline/${sponsor.companyName}`, {
        verificationStatus: 'Rejected',
      });
      onUpdate(); // Call onUpdate to refresh the sponsor list
      onClose(); // Close the detail view
    } catch (error) {
      console.error('Error declining sponsor:', error);
      alert('Failed to decline sponsor');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          &times; {/* Close symbol */}
        </button>
        <h2 className="text-xl font-bold mb-2">{sponsor.companyName}</h2>
        <p><strong>Email:</strong> {sponsor.email}</p>
        <p><strong>Phone:</strong> {sponsor.phoneNumber}</p>
        <p><strong>Website:</strong> <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-[#5f3abd]">{sponsor.website}</a></p>
        <p><strong>Registration Number:</strong> {sponsor.registrationNumber}</p>
        <p><strong>Tax ID:</strong> {sponsor.taxId}</p>
        <p><strong>Address:</strong> {`${sponsor.address.street}, ${sponsor.address.city}, ${sponsor.address.state}, ${sponsor.address.zip}, ${sponsor.address.country}`}</p>
        <p><strong>Description:</strong> {sponsor.description}</p>
        <p><strong>Status:</strong> {sponsor.verificationStatus}</p>
        
        <div className="mt-4 flex justify-between">
          <button 
            onClick={handleVerify} 
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Verify
          </button>
          <button 
            onClick={handleDecline} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSponsorDetail;
