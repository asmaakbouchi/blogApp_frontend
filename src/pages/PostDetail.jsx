import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchPostById } from '../api/post';
import { FaRegCalendarAlt, FaRegClock, FaUser } from 'react-icons/fa'; // Import React icons

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const PostById = async () => {
    try {
      const fetchedPost = await FetchPostById(id);
      setPost(fetchedPost);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  useEffect(() => {
    PostById();
  }, [id]);
  
  // Check if post.date exists before accessing its properties
  const formattedDate = post.date ? post.date.split('T')[0] : '';
  const formattedTime = post.date ? post.date.split('T')[1].substring(0, 8) : '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <img className="object-cover w-full h-full" src={post.image} alt={post.titre} />
          </div>
          <div className="w-full sm:w-1/2 p-4 sm:p-6">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{post.titre}</h2>
            <p className="text-base sm:text-lg mb-4">{post.contenu}</p>
            <div className="flex items-center mb-2">
              <FaRegCalendarAlt className="w-6 h-6 mr-2 text-gray-500" />
              <span className="text-sm sm:text-base font-semibold">{formattedDate}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaRegClock className="w-6 h-6 mr-2 text-gray-500" />
              <span className="text-sm sm:text-base font-semibold">{formattedTime}</span>
            </div>
            <div className="flex items-center">
              <FaUser className="w-6 h-6 mr-2 text-gray-500" />
              <span className="text-sm sm:text-base font-semibold">{post.auteur?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
