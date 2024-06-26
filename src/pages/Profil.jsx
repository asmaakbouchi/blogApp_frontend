import React, { useEffect, useState } from 'react';
import { fetchProfil } from '../api/user';
import { FaEdit, FaEnvelope } from 'react-icons/fa';
import userImg from '../assets/image/userimg.jpg'; // Import the user image
import {Button } from 'flowbite-react';

export default function Profil() {
  const [userdata, setUserdata] = useState(null);
 
  const fetchUserData = async () => {
    try {
      const data = await fetchProfil();
      setUserdata(data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();

  }, []); 

  if (!userdata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center">
      <div className="max-w-3xl w-full lg:w-2/3 bg-pink-100 rounded-2xl shadow-lg p-6">
        <img src={userImg} className="rounded-full w-48 h-48 mx-auto mb-4" alt='user' /> {/* Use the avatar image */}
        <h1 className="text-3xl font-bold text-center">{userdata.name}</h1>
        <p className="text-gray-500 text-center mb-4">@{userdata.role}</p>
        <p className="text-lg text-center">
          Hello {userdata.name}, you are in your space on our blog app. Here, you can verify your information and reach out with any questions or issues you may have. Feel free to contact us for assistance with resolving any problems you encounter.
        </p>


        {/* Example: Email with icon */}
        <p className="text-gray-500 mt-4 text-center"><FaEnvelope className="inline-block mr-2" /> {userdata.email}</p>

        {/* Edit profile button with icon */}
        <div className="flex justify-center mt-6">
          <Button gradientDuoTone='purpleToPink' type='submit'>
            Add a New post 
          </Button>
        </div>
      </div>
    </div>

  );
}
