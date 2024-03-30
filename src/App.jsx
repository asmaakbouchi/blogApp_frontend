import React from 'react'
import Header from './component/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Singup from './pages/Signup'

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/about' element={<About />}></Route> 
    <Route path='/contact' element={<Contact />}></Route> 
    <Route path='/login' element={<Login />}></Route>
    <Route path='/singup' element={<Singup />}></Route>
   </Routes>
   </BrowserRouter>
  )
}


