import React from 'react'
import Header from './component/header'
import  Footer  from './component/footer'
import ProtectedRoute from './component/protectedRoute'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MyPosts from './pages/MyPosts'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'
import Profil from './pages/Profil'


export default function App() {
  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/myposts" element={<MyPosts />} ></Route>
      <Route path='/contact' element={<Contact />}></Route> 
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/addpost' element={<AddPost />}></Route> 
      <Route path='/post/:id' element={<PostDetail/>}></Route>
      <Route path='/edit/:id' element={<EditPost />} />
      <Route path='/profil' element={<Profil/>}></Route>
      
    </Routes>
    <Footer/>
   </BrowserRouter>
  )
}


