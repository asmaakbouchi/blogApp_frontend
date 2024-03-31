import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function signup() {
  const [formData,setFormData]=useState({});

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      const res =await fetch('/api/users/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      })
      const data=await res.json();
    }
    catch(err){
      console.log(err)
    }
  }

  console.log(formData);
  return (
    <div className='min-h-screen mt-20'>
      <div className="p-4 max-w-2xl mx-auto">
       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label>Username</Label>
          <TextInput type='text' placeholder='Username' id='name' onChange={handleChange}/>
        </div>
        <div>
          <Label>Email</Label>
          <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}/>
        </div>
        <div>
          <Label>Password</Label>
          <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
        </div>
       <Button gradientDuoTone='purpleToPink' type='submit'>
          Signup
       </Button>
       <div className="flex gap-2 text-sm mt-3">
        <span>Have an account </span>
          <Link to='/login' className='text-blue-500'>Login</Link>
       </div>
      

       </form>
      </div>
    </div>
  )
}
