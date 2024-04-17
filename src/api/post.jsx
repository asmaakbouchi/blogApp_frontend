import axios from "axios";

const FetchPostById=async(id)=>{
try {
  const response = await axios.get(`http://localhost:3000/posts/${id}`, {
    headers: {
      'auth': `Bearer ${localStorage.getItem('tokenkey')}`
    }
  });
  return response.data;
} catch (error) {
  console.error('Error fetching post:', error);
  throw new Error('Error fetching post');
}
}


const fetchPosts=async()=>{
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Error fetching posts');
    }
  }

  const DeletePost = async (id, token) => {
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
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };



  export{fetchPosts,FetchPostById,DeletePost}