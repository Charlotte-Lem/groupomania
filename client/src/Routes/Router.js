import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Layout/Home';
import Actus from '../Layout/Actus';
import Profil from '../Layout/Profil';
import NotFound from '../Layout/NotFound';
import Post from '../Components/Posts/Post';
import HomePage from '../Layout/Homepage';
import Auth from '../Utils/Auth';
export default function Router() {
  // const token = localStorage.getItem('token');
  // const isAuth = token;
  //   return (
  //     <>
  //       {isAuth ? (
  //         <div>
  //           <Routes>
  //             <Route path="/" element={<Actus />} />
  //             <Route path="/:postId" element={<Post />} />
  //             <Route path="/profil/:id" element={<Profil />} />
  //             <Route path="*" element={<NotFound />} />
  //             <Route path="/home" element={<Homepage />} />
  //           </Routes>
  //         </div>
  //       ) : (
  //         <Routes>
  //           <Route path="/home" element={<Homepage />} />
  //           <Route path="/" element={<Home />} />
  //           <Route path="*" element={<NotFound />} />
  //         </Routes>
  //       )}
  //     </>
  //   );
  // }
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/home" element={<HomePage />} />
      <Route element={<Auth />}>
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/" element={<Actus />} />
        <Route path="/:postId" element={<Post />} />
        <Route path="/profil/:id" element={<Profil />} />
      </Route>
    </Routes>
  );
}
