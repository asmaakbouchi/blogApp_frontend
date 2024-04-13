import React, { useEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  },
   []);

  return (
    <>
      <div className='grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-10'>
        {posts.map(post => (
          <Link to={`/post/${post._id}`} 
          className='max-w-sm rounded overflow-hidden shadow-lg flex flex-col' key={post._id}>
            <img className="w-full h-40 object-cover" src={post.image} alt={post.titre} />
            <div className="px-6 py-4 flex-grow">
              <div className="font-bold text-xl mb-2">{post.titre}</div>
              <p className="text-gray-700 text-base">{`${post.contenu.substring(0, 60)} [...]`}</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-black">Created By <span className='font-semibold'>{post.auteur}</span></p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}





// import Axios from 'axios'
//   // useEffect((()=>{
//   //   Axios.get("http://localhost:3000/posts")
//   //   .then(res=>{
//   //     setPosts(res.data)
//   //   })
//   // }),[])

