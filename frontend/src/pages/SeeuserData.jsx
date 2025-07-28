import React from "react";

const SeeuserData = ({ userData, onClose }) => {
  if (!userData) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-red-600"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <p><strong>Full Name:</strong> {userData.fullName || "N/A"}</p>
        <p><strong>Email:</strong> {userData.email || "N/A"}</p>
        <p><strong>Phone:</strong> {userData.phoneNumber || "N/A"}</p>
        <p><strong>State:</strong> {userData.address.state || "N/A"}</p>
        <p><strong>City:</strong> {userData.address.city || "N/A"}</p>
        <p><strong>Street:</strong> {userData.address.street || "N/A"}</p>
        <p><strong>Pincode:</strong> {userData.address.pincode || "N/A"}</p>
      </div>
    </div>
  );
};

export default SeeuserData;
