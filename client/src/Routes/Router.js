import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Layout/Home';
import Actus from '../Layout/Actus';
import Profil from '../Layout/Profil';
import NotFound from '../Layout/NotFound';
import Post from '../Layout/Post';
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/actus" element={<Actus />} /> */}
        <Route path="actus/" element={<Actus />}></Route>
        <Route path="actus/:postId" element={<Post />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
