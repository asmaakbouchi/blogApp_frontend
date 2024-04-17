import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Alert, Button, Label, TextInput } from 'flowbite-react';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      //Handling errors
      if(data.success===false){
        return setErrorMessage(data.message)
      }

      //if everything is well navigate to login 
      if(res.ok){ navigate('/login')}

    } catch (err) {
      setErrorMessage(err.message)
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <div className='max-w-xl w-full p-8 bg-white border border-gray-300 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-pink-500 text-center'>Sign Up</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label>Username</Label>
            <TextInput type='text' placeholder='Username' id='name' onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <TextInput type='email' placeholder='Email' id='email' onChange={handleChange} />
          </div>
          <div>
            <Label>Password</Label>
            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit'>
            Signup
          </Button>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Have an account </span>
            <Link to='/login' className='text-blue-500'>
              Login
            </Link>
          </div>

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
