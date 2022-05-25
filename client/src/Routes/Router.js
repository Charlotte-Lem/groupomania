import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Layout/Home';
import Actus from '../Layout/Actus';
import Profil from '../Layout/Profil';
import NotFound from '../Layout/NotFound';
import Post from '../Components/Posts/Post';

export default function Router() {
  const isAuth = localStorage.getItem('token');
  return (
    <>
      {isAuth ? (
        <div>
          <Routes>
            <Route path="/" element={<Actus />} />
            <Route path="/:postId" element={<Post />} />
            <Route path="/profil/:id" element={<Profil />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path='/editprofil' element={<EditProfil />} /> */}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
      )}
    </>
  );
}
