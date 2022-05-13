import React, { useEffect, useState } from 'react';
import pictureProfile from '../../Assets/defaultUserPicture.png';
import NavBar from '../../Components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from '../../Utils/urlApi';
// import modifyProfil from '../../Components/Profil/UpdateProfile';
// import {
//   getUser,
//   user,
//   id,
//   token,
//   UpdateProfile,
// } from '../../Services/AuthService';

export default function Profile() {
  const [userData, setUserData] = useState('');
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [profilePicture, setprofilePicture] = useState();
  const [updateMode, setupdateMode] = useState(false);

  const accessToken = JSON.parse(localStorage.getItem('token')).token;
  console.log(accessToken);
  const id = JSON.parse(localStorage.getItem('token')).userId;
  console.log(id);

  const handleModals = (e) => {
    if (e.target.id === 'update') {
      setupdateMode(true);
    } else {
      setupdateMode(false);
    }
  };

  useEffect(() => {
    const dataAxios = async () => {
      const res = await axios.get(`${url}user/${id}`, {
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

  //fonction pour modifier et sauver les informations de profil
  const saveUpdateProfil = (e) => {
    axios
      .put(
        `${url}user/${id}`,
        { firstName, lastName, email, profilePicture },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((error) => {
        console.error(error);
      });
  };

  //fonction pour modifier la photo du user
  const modifyPicture = () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('userId', id);
    //console.log(id);
    axios
      .put(`${url}user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <NavBar />
      {updateMode ? (
        <div className="card-profile">
          <div className="container">
            <div className="title">Profil de {userData.firstName}</div>
            <div className="title title__img-profil">
              <label className="center flex-col">Ma photo :</label>
              <br />
              {userData.profilePicture ? (
                <img
                  className="__imgPicture"
                  alt="img profil"
                  src={userData.profilePicture}
                ></img>
              ) : (
                <img className="__imgPicture" src={pictureProfile} alt="" />
              )}
            </div>
            <form onSubmit={modifyPicture} className="image-profil">
              {/* Modifier la photo de profile */}
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                name="imageprofil"
                onChange={(e) => setprofilePicture(e.target.files[0])}
              ></input>
              {/* 
              <button className="button myFont text-xl text-grey bg-primary hover:text-black">
                Enregistrer
              </button> */}
            </form>
            {/* <button className="change-picture" onClick={modifyPicture}>
              <FontAwesomeIcon className="btn-upload" icon={faUpload} /> Changez
              ma photo
            </button> */}

            <form onSubmit={saveUpdateProfil} className="content-profil">
              <h3> Nom: {userData.lastName}</h3>
              <input
                type="text"
                // placeholder={userData.lastName}
                className="input "
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                required
              ></input>
              <h3>Prénom: {userData.firstName}</h3>
              <input
                type="text"
                // placeholder={userData.firstName}
                className="input __firstName"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required
              ></input>
              <h3>Adresse email : {userData.email}</h3>
              <input
                type="text"
                // placeholder=
                className="input __email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </form>
            <button className="change-profil" onClick={saveUpdateProfil}>
              Enregistrez mes informations
            </button>
          </div>
        </div>
      ) : (
        <div className="card-profile">
          <div className="container">
            <div className="title">Profil de {userData.firstName}</div>
            <div className="title title__img-profil">
              {userData.profilePicture ? (
                <img
                  className="__imgPicture"
                  alt="img profil"
                  src={userData.profilePicture}
                ></img>
              ) : (
                <img className="__imgPicture" src={pictureProfile} alt="" />
              )}
            </div>
            {/* <button className="change-picture" onClick={modifyPicture}>
              <FontAwesomeIcon className="btn-upload" icon={faUpload} /> Changez
              ma photo
            </button> */}

            <form className="content-profil">
              <h3> Nom: </h3>
              <div className="profil-content">{userData.lastName}</div>
              <h3>Prénom:</h3>
              <div className="profil-content">{userData.firstName}</div>
              <h3>Adresse email :</h3>
              <div className="profil-content"> {userData.email}</div>
            </form>
            <button
              className="change-profil"
              id="update"
              onClick={handleModals}
            >
              Modifiez mes informations
            </button>
          </div>
        </div>
      )}
    </div>
  );
}












import React, { useState, useEffect } from 'react';
import pictureProfile from '../Assets/defaultUserPicture.png';
//import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//import { getUser } from '../Actions/userAction';
import axios from 'axios';
import { api } from '../Utils/api';

export default function Profil() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const [updateMode, setupdateMode] = useState(false);
  // const { userForm, userInfo } = useSelector((state) => ({
  //   ...state.userReducer,
  //   ...state.inputReducer,
  // }));

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
  });
  const token = JSON.parse(localStorage.getItem('token')).token;
  const id = JSON.parse(localStorage.getItem('token')).userId;

  const handleModals = (e) => {
    if (e.target.id === 'update') {
      setupdateMode(true);
    } else {
      setupdateMode(false);
    }
  };
  useEffect(() => {
    async function getInfo() {
      const res = await axios.get(api + '/api/user/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      setUser({
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        profilePicture: res.data.profilePicture,
      });
      console.log(res);
    }
    getInfo();
  }, [id, token]);

  const updateProfil = (e) => {
    axios
      .put(
        `${api}/api/user/${id}`,
        { user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((error) => {
        console.error(error);
      });
  };
  // const handleInput = (e) => {
  //   if (e.target.classList.contains('content-firstName')) {
  //     const newObjState = { ...user, firstName: e.target.value };
  //     setUser(newObjState);
  //   } else if (e.target.classList.contains('content-lastName')) {
  //     const newObjState = { ...user, lastName: e.target.value };
  //     setUser(newObjState);
  //   } else if (e.target.classList.contains('content-email')) {
  //     const newObjState = { ...user, email: e.target.value };
  //     setUser(newObjState);
  //   } else if (e.target.classList.contains('content-picture')) {
  //     const newObjState = { ...user, profilePicture: e.target.value };
  //     setUser(newObjState);
  //   }
  // };
  const handleInput = (e) => {
    if (e.target.id === 'firstName') {
      setUser({
        ...user,
        firstName: e.target.value,
      });
    }
    if (e.target.id === 'lastName') {
      setUser({
        ...user,
        lastName: e.target.value,
      });
    }
    if (e.target.id === 'email') {
      setUser({
        ...user,
        email: e.target.value,
      });
    }
  };

  return (
    <>
      {updateMode ? (
        <div className="card-profile">
          <div className="container" id="container-profil">
            <div className="title">Profil de {user.firstName}</div>
            <div className="title title__img-profil">
              <img className="__imgPicture" src={pictureProfile} alt="" />
            </div>
            {/* <button className="change-picture" onClick={modifyPicture}>
              <FontAwesomeIcon className="btn-upload" icon={faUpload} /> Changez
              ma photo
            </button> */}

            <form className="content-profil" onSubmit={updateProfil}>
              <h3> Nom: </h3>
              <input
                type="text"
                // placeholder={userData.lastName}
                className="input "
                value={user.lastName}
                onChange={(e) => setUser(e.target.value)}
                required
              ></input>
              <h3>Prénom:</h3>
              <input
                id="firstName"
                type="text"
                // placeholder={userData.lastName}
                onInput={(e) => setUser(e.target.value)}
                value={user.firstName}
              />
              <h3>Adresse email :</h3>
              <input
                id="email"
                className="content-email"
                type="text"
                // placeholder={userData.lastName}
                onChange={handleInput}
                value={user.email}
              />
            </form>
            <button
              className="change-profil"
              id="update"
              onClick={updateProfil}
            >
              Enregistrez les modifications
            </button>
          </div>
        </div>
      ) : (
        <div className="card-profile">
          <div className="container" id="container-profil">
            <div className="title">Profil de {user.firstName}</div>
            <div className="title title__img-profil">
              <img className="__imgPicture" src={pictureProfile} alt="" />
            </div>
            {/* <button className="change-picture" onClick={modifyPicture}>
              <FontAwesomeIcon className="btn-upload" icon={faUpload} /> Changez
              ma photo
            </button> */}

            <div className="content-profil">
              <h3> Nom: </h3>
              <div className="content-lastName">{user.lastName}</div>
              <h3>Prénom:</h3>
              <div className="content-firstName">{user.firstName}</div>
              <h3>Adresse email :</h3>
              <div className="content-email">{user.email} </div>
            </div>
            <button
              className="change-profil"
              id="update"
              onClick={handleModals}
              // onClick={""}
            >
              Modifiez mes informations
            </button>
          </div>
        </div>
      )}
    </>
  );
}
