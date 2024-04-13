
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStart, LoginSuccess, LoginFailure } from '../redux/user/userSlice';

export default function login() {
  const [formData, setFormData] = useState({});
  const {loading,error:errorMessage}=useSelector(state=>state.users)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(LoginFailure('Please fill out all fields.'))
    }

    try {
      dispatch(LoginStart())
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); 
  
      //Handling errors
      if(data.success===false){
       dispatch(LoginFailure(data.message))
      }

      //if everything is well navigate to login 
      if(res.ok){
        dispatch(LoginSuccess(data))
         localStorage.setItem('tokenkey',data.token)
         navigate('/')
        }
    } catch (err) {
      dispatch(LoginFailure(err.message))
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='p-4 max-w-2xl mx-auto '  >
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label>Email</Label>
            <TextInput type='email' placeholder='Email' id='email' onChange={handleChange} />
          </div>
          <div>
            <Label>Password</Label>
            <TextInput type='password' placeholder='*********' id='password' onChange={handleChange} />
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
}
