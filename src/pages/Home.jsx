import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SliderImage from '../component/sliderImage';
import HomeContent from '../component/homeContent';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Fetch posts
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));

    // Fetch users
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        // Map user IDs to names
        const usersData = {};
        data.forEach(user => {
          usersData[user._id] = user.name; // Assuming the user object has a 'name' field
        });
        setUsers(usersData);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <>
      <SliderImage />
      <HomeContent />
      <div className='grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-10'>
        {posts.map(post => (
          <Link to={`/post/${post._id}`} className='max-w-sm rounded overflow-hidden shadow-lg flex flex-col' key={post._id}>
            <img className="w-full h-40 object-cover" src={post.image} alt={post.titre} />
            <div className="px-6 py-4 flex-grow">
              <div className="font-bold text-xl mb-2">{post.titre}</div>
              <p className="text-gray-700 text-base">{`${post.contenu.substring(0, 60)} [...]`}</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-black">Created By <span className='font-semibold'>{users[post.auteur]}</span></p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
