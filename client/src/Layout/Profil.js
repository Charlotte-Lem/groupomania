import React, { useEffect, useState } from 'react';
import pictureProfile from '../Assets/defaultUserPicture.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { api } from '../Utils/api';

export default function Profile() {
  const [userData, setUserData] = useState('');
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [profilePicture, setProfilePicture] = useState();
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

  //fonction pour modifier et sauver les informations de profil
  const saveUpdateProfil = (e) => {
    axios
      .put(
        `${api}/api/user/${id}`,
        { firstName, lastName, email },
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
    formData.append('images', profilePicture);
    formData.append('userId', id);
    //console.log(id);
    axios
      .put(api + '/api/user/' + id, formData, {
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
  //suppression du compte

  const deleteAccount = () => {
    console.log('suppression du compte');
    //message de confirmation de suppression du compte
  };
  console.log(userData);

  return (
    <>
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
                <img
                  className="__imgPicture"
                  src={pictureProfile}
                  alt="img-profil"
                />
              )}

              <form onSubmit={modifyPicture} className="image-profil">
                {/* Modifier la photo de profile */}
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  name="profilePicture"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                ></input>

                <button className="change-profil">Enregistrer ma photo</button>
              </form>
             
            </div>
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
            <br />
            <button className="change-profil" onClick={deleteAccount}>
              Supprimez mon compte
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
                  name="profilePicture"
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
    </>
  );
}
