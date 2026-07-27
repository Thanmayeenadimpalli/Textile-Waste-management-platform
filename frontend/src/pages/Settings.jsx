import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function Profile() {
  const [user] = useState({
    name: "Thanmayee",
    email: "thanmayee@example.com",
    role: "Administrator",
    department: "Textile Waste Management",
    joined: "July 2026",
    phone: "+91 XXXXX XXXXX",
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Header />

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">

          {/* Profile Avatar */}
          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {user.name.charAt(0)}
            </div>

            <h2 className="text-2xl font-semibold mt-4">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.role}
            </p>

          </div>

          {/* User Details */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="text-gray-600 font-medium">
                Full Name
              </label>

              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">
                Email
              </label>

              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">
                Phone
              </label>

              <input
                type="text"
                value={user.phone}
                readOnly
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">
                Department
              </label>

              <input
                type="text"
                value={user.department}
                readOnly
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">
                Role
              </label>

              <input
                type="text"
                value={user.role}
                readOnly
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-gray-600 font-medium">
                Member Since
              </label>

              <input
                type="text"
                value={user.joined}
                readOnly
                className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
              />
            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex gap-4 mt-8">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              Edit Profile
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
              Change Password
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;