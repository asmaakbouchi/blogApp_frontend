import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenkey');
  const [blogPosts, setBlogPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
 

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts', {
        headers: {
          'auth': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
          const usersData = {};
          data.forEach(user => {
              usersData[user._id] = user;
          });
          setUsers(usersData);
      })
      .catch(error => console.error('Error fetching users data:', error));
    }

    const decoded=()=>{
    // Decode the token and set the logged-in user ID
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setLoggedInUserId(decodedToken._id);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    }

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    decoded();
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
      console.log('Post deleted');
      // Refresh posts after deletion
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const userPosts = blogPosts.filter(post => post.auteur === loggedInUserId);
  return ( 
    <div>
     <div className="flex flex-col sm:flex-row justify-between items-center mt-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold  sm:mb-0">My Blogs</h1>
        <Link to="/addPost">
          <Button  className='mt-4' gradientDuoTone='purpleToPink'>
            Add New Post
          </Button>
        </Link>
      </div>
      {userPosts.length > 0 ? (
        <div className="container mx-auto px-4 py-8 my-6">
          <div className="grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-6xl mx-auto my-10">
            {userPosts.map(post => (
              <div key={post._id} className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col">
                <img src={post.image} alt="product image" className="w-full h-40 object-cover" />
                <div className="px-6 py-4 flex-grow">
                  <div className="font-bold text-xl mb-2">{post.titre}</div>
                  <p className="text-gray-700 text-base">{`${post.contenu.substring(0, 60)} [...]`}</p>
                  <div className="py-4">
                    <p className="text-black">Date creation: <span className='font-semibold'>{post.date.split('T')[0]}</span></p>
                    <p className="text-black">Time creation: <span className='font-semibold'>{post.date.split('T')[1].substring(0, 8)}</span></p>
                    <p className="text-black">auteur: <span className='font-semibold'>{users[post.auteur].name }</span></p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <Link to={`/edit/${post._id}`}>
                    <button className='text-white bg-teal-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Edit</button>
                  </Link>
                  <button type="button" onClick={() => handleDelete(post._id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 m-40 text-center text-4xl">No posts available</p>
      )}
    </div>
  );
}
