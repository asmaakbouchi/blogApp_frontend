import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function about() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [blogPosts, setBlogPosts] = useState([]);


  useEffect(() => {
      fetch('http://localhost:3000/posts')
          .then(response => response.json())
          .then(data => setBlogPosts(data))
          .catch(error => console.error('Error fetching blog posts:', error));
  }, []);


  const handleDelete = async (id) => {
      try {
          const response = await fetch(`http://localhost:3000/posts/${id}`, {
              method: 'DELETE',
              headers: {
                  'auth': `Bearer ${token}`
              }
          });
          if (!response.ok) {
              throw new Error('Failed to delete post');
          }
          console.log('Post deleted')
          navigate('/');
      } catch (error) {
          console.error('Error deleting post:', error);
      }
  };

  return (
  blogPosts.length > 0 ? (
  <div className="container mx-auto px-4 py-8 my-9">
      <h1 className="text-3xl font-bold mb-8">My Blog</h1>

      <Link to="/addPost" >
        <Button  gradientDuoTone='purpleToPink'>
           Add New Post
        </Button>

      </Link>
      <div className="posts lg:grid grid-cols-4 gap-6 mx-20">
          
          {blogPosts.map(post => (
              <div className="bg-white rounded-lg shadow-md p-6 my-10">
                  <h2 className="text-2xl font-bold mb-4">{post.titre}</h2>
                  <p className="text-gray-600 mb-2">Created By {post.auteur} </p>
                  <p className="text-gray-800">{post.contenu}</p>
                  <div className="mt-6" >
                      <Link to={`edit/${post._id}`}> <button className='focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Edit</button></Link>
                      <button type="button" onClick={() => handleDelete(post._id)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                  </div>

              </div>
          ))}
      </div>
  </div>
  ) : (
      <p className="text-gray-600 m-40 text-center text-4xl">No posts available</p>
  )
  )
}





