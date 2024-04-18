import React from 'react';
import Header from './component/header';
import Footer from './component/footer';
import ProtectedRoute from './component/protectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import Profil from './pages/Profil';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/myposts' element={<ProtectedRoute component={MyPosts} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route exact path='/addpost' element={<ProtectedRoute component={AddPost} />} />
        <Route exact path='/post/:id' element={<ProtectedRoute component={PostDetail} />} />
        <Route exact path='/edit/:id' element={<ProtectedRoute component={EditPost} />} />
        <Route exact path='/profil' element={<ProtectedRoute component={Profil} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
