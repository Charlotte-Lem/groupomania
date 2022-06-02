import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Log/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { api } from '../../Utils/api';
export default function Nav() {
  const [userData, setUserData] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

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
      console.log('RES', res.data);
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
            <h5> Hello {userData.firstName}</h5>
          </div>
        ) : (
          <div></div>
        )}
        <div className="nav-item">
          <NavLink className="nav-link" to="/">
            Actus
          </NavLink>
          {/* <NavLink className="nav-link" to="/actus">
            Posts
          </NavLink> */}
          <NavLink className="nav-link" to="/profil/:id">
            <FontAwesomeIcon icon={faUser} /> Profil
          </NavLink>
          <Logout />{' '}
        </div>
      </div>
    </nav>
  );
}
