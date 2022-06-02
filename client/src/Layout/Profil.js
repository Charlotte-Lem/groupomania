import React, { useEffect, useState } from 'react';
import pictureProfile from '../Assets/defaultUserPicture.png';
import NavBar from '../Components/Nav/Navbar';
import axios from 'axios';
import { api } from '../Utils/api';
import { useNavigate } from 'react-router-dom';
import { BiUpload } from 'react-icons/bi';
export default function Profile() {
  const [userData, setUserData] = useState('');
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [profilePicture, setProfilePicture] = useState('');
  const [updateMode, setupdateMode] = useState(false);

  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem('token')).token;
  // console.log(accessToken);
  const id = JSON.parse(localStorage.getItem('token')).userId;
  // console.log(id);

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
      console.log('RES', res.data);
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

    const regex = /\.(jpe?g|png|gif)$/i;
    const checkType = profilePicture.type.match('image/', regex);

    if (checkType !== null) {
      axios
        .put(`${api}/api/user/${id}`, formData, {
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
    } else {
      alert('Veuillez renseigner un fichier de type image.');
    }
  };

  // //suppression du compte

  const deleteAccount = () => {
    axios
      .delete(`${api}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        localStorage.clear();
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });

    console.log('suppression du compte');
    //message de confirmation de suppression du compte
  };

  return (
    <>
      <NavBar />
      {updateMode ? (
        <div className="card-profile">
          <div className="container">
            <div className="title">Profil de {userData.firstName}</div>
            <div className="title title__img-profil">
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
            </div>
            <form onSubmit={saveUpdateProfil} className="content-profil">
              <h3> Nom: {userData.lastName}</h3>
              <input
                type="text"
                className="input "
                onChange={(e) => setlastName(e.target.value)}
                required
              ></input>
              <h3>Prénom: {userData.firstName}</h3>
              <input
                type="text"
                className="input __firstName"
                onChange={(e) => setfirstName(e.target.value)}
                required
              ></input>
              <h3>Adresse email : {userData.email}</h3>
              <input
                type="text"
                className="input __email"
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
                  name="images"
                ></img>
              ) : (
                <img className="__imgPicture" src={pictureProfile} alt="" />
              )}
            </div>

            <form onSubmit={modifyPicture} className="pict-prof">
              {' '}
              {/* Modifier la photo de profile */}
              {/* <p>Changer la photo de profil :</p> */}
              <label htmlFor="file" className="label-file">
                <BiUpload />
                Changez votre photo
              </label>
              <input
                id="file"
                className="input-file"
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                name="images"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              ></input>
              <br />
              <button className="pict-prof btn-post">Enregistrer</button>
            </form>
            <div className="content-profil">
              <h3> Nom: </h3>
              <div className="profil-content">{userData.lastName}</div>
              <h3>Prénom:</h3>
              <div className="profil-content">{userData.firstName}</div>
              <h3>Adresse email :</h3>
              <div className="profil-content"> {userData.email}</div>
            </div>
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
