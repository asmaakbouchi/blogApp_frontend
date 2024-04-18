import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStart, LoginSuccess, LoginFailure } from '../redux/reducer/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error: errorMessage, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('login ',isAuthenticated)
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return dispatch(LoginFailure('Please fill out all fields.'));
    }

    try {
      dispatch(LoginStart());
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        dispatch(LoginFailure(data.message));
      }

      if (res.ok) {
        dispatch(LoginSuccess(data));
        localStorage.setItem('tokenkey', data.token);
        navigate('/');
      }
    } catch (err) {
      dispatch(LoginFailure(err.message));
    }
  };
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-xl w-full p-8 bg-white border border-gray-300 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-4 text-pink-500 text-center'>Login</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label>Email</Label>
            <TextInput type='email' placeholder='Email' id='email' value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Password</Label>
            <TextInput type='password' placeholder='*********' id='password' value={formData.password} onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            Login
          </Button>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Sign Up
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
};

export default Login;
