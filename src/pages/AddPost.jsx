 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput } from 'flowbite-react';

export default function AddPost() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titre || !formData.contenu || !formData.image) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('titre', formData.titre);
      formDataToSend.append('contenu', formData.contenu);
      formDataToSend.append('image', formData.image);

      const res = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'auth': `Bearer ${localStorage.getItem('tokenkey')}`
        },
        body: formDataToSend,
      });
      const data = await res.json();
      // Handling errors
      if (!res.ok) {
        return setErrorMessage(data.message || 'Failed to add post.');
      }
      // If everything is well, navigate to the "about" page
      navigate('/myposts');
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <div className='max-w-xl w-full p-8 bg-white border border-gray-300 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-pink-500 text-center'>Add New post</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label>Title</Label>
            <TextInput type='text' placeholder='Title' id='titre' onChange={handleChange} />
          </div>
          <div>
            <Label>Content</Label>
            <TextInput type='text' placeholder='Content' id='contenu' onChange={handleChange} />
          </div>
          <div>
            <Label>Image</Label>
            <TextInput type='file' id='image' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit'>
           Add post 
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




