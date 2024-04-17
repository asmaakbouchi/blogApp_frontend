import axios from 'axios';

const fetchProfil = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/profil`, {
      headers: {
        'auth': `Bearer ${localStorage.getItem('tokenkey')}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
}

const fetchUsers=async()=> {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    // Map user IDs to names
    const usersData = {};
    data.forEach(user => {
      usersData[user._id] = user.name; // Assuming the user object has a 'name' field
    });
    return usersData;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
}




export { fetchProfil, fetchUsers };