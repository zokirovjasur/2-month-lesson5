import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BasicModal from "./Modal";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <header className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <Link
          to="/update-profile"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Profile
        </Link>
      </header>
      <main className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
            src={
              user?.image
                ? `https://mustafocoder.pythonanywhere.com/api${user.image}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
            }
            alt="User profile"
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            {user?.username || "Username"}
          </h2>
        </div>
        <ul className="w-full max-w-md space-y-4">
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Gender:</span>
            <span className="text-gray-800">
              {user?.gender || "Not specified"}
            </span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">
              {user?.email || "Not specified"}
            </span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">
              {user?.name || "Not specified"}
            </span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-600">Age:</span>
            <span className="text-gray-800">
              {user?.age || "Not specified"}
            </span>
          </li>
        </ul>
        <div className="mt-6">
          <BasicModal />
        </div>
      </main>
    </div>
  );
};

export default Profile;
