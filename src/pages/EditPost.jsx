import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput } from 'flowbite-react';

export default function EditPost() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ titre: '', contenu: '', image: '' }); // Initialize with empty strings
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        // Update formData state with fetched data
        setFormData(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titre.trim() || !formData.contenu || !formData.image) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('titre', formData.titre);
      formDataToSend.append('contenu', formData.contenu);
      formDataToSend.append('image', formData.image);

      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
          'auth': `Bearer ${localStorage.getItem('tokenkey')}`
        },
        body: formDataToSend,
      });
      const data = await res.json();
      
      // Handling errors
      if (!res.ok) {
        return setErrorMessage(data.message || 'Failed to update post.');
      }

      // If everything is well, navigate to the "about" page
      navigate('/myposts');
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred.');
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='p-4 max-w-2xl mx-auto'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label>Title</Label>
            <TextInput type='text' placeholder='Title' id='titre' value={formData.titre} onChange={handleChange} />
          </div>
          <div>
            <Label>Content</Label>
            <TextInput type='text' placeholder='Content' id='contenu' value={formData.contenu } onChange={handleChange} />
          </div>
          <div>
            <Label>Image</Label>
            <TextInput type='file' id='image' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit'>
            Update post 
          </Button>
          
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
