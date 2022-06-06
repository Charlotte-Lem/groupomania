import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Actus from '../Layout/Actus';
import Profil from '../Layout/Profil';
import NotFound from '../Layout/NotFound';
import Post from '../Components/Posts/Post';
import HomePage from '../Layout/Homepage';
import Auth from '../Utils/Auth';

export default function Router() {

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route element={<Auth />}>
        <Route path="/" element={<Actus />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/profil/:id" element={<Profil />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
