import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../Log/Logout';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { api } from '../../Utils/api';

export default function Nav() {
  const [userData, setUserData] = useState('');

  const accessToken = JSON.parse(localStorage.getItem('token')).token;
  const id = JSON.parse(localStorage.getItem('token')).userId;

  useEffect(() => {
    const dataAxios = async () => {
      const res = await axios.get(api + '/api/user/' + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      setUserData({
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        profilePicture: res.data.profilePicture,
      });
    };
    dataAxios();
  }, [id, accessToken]);

  return (
    <nav>
      <div className="nav-container">
        {id ? (
          <div className="nav-container__hello">
            <img
              className="nav-container__picture"
              alt="img profil"
              src={userData.profilePicture}
            ></img>
            <h1> Hello {userData.firstName}</h1>
          </div>
        ) : (
          <div></div>
        )}
        <div className="nav-item">
          <NavLink className="nav-link" to="/">
            Actus
          </NavLink>
         
          <NavLink className="nav-link" to="/profil/:id">
            <FaUserAlt className='="nav-link__icon' /> Profil
          </NavLink>
          <Logout />
        </div>
      </div>
    </nav>
  );
}
