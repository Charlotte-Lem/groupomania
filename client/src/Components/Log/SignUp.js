import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRegister } from '../../Actions/userAction';

export default function Signup() {
  const [formSubmit, setFormSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    msgError: '',
  });

  const { userForm } = useSelector((state) => ({
    ...state.userReducer,
    ...state.inputReducer,
  }));

  const handleForm = (e) => {
    e.preventDefault();

    async function repRegister() {
      const result = getRegister(
        user.email,
        user.password,
        user.firstName,
        user.lastName
      );
      console.log(result);
      if (!result) {
        setUser({
          ...user,
          msgError: 'Erreur : Cette email existe déjà',
        });
      } else {
        dispatch({
          type: 'GET_REGISTER',
          payload: user,
        });

        setUser({
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        });

        navigate('/');
      }
    }
    if (!user.email || !user.firstName || !user.lastName || !user.password) {
      setUser({
        ...user,
        msgError: 'Tous les champs doivent être remplis',
      });
    } else {
      repRegister();
    }
  };

  const handleInput = (e) => {
    if (e.target.classList.contains('inp-firstName')) {
      const newObjState = { ...user, firstName: e.target.value };
      setUser(newObjState);
    } else if (e.target.classList.contains('inp-lastName')) {
      const newObjState = { ...user, lastName: e.target.value };
      setUser(newObjState);
    } else if (e.target.classList.contains('inp-email')) {
      const newObjState = { ...user, email: e.target.value };
      setUser(newObjState);
    } else if (e.target.classList.contains('inp-password')) {
      const newObjState = { ...user, password: e.target.value };
      setUser(newObjState);
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignIn />
          <h4 className="succes"> "Inscription réussie! Connectez-vous !"</h4>
        </>
      ) : (
        <div className="card-log __signup">
          <form
            className="form form-signup"
            action=""
            onSubmit={handleForm}
            id="sign-up-form"
          >
            <h2>S'enregistrer</h2>

            <div className="title-content">
              <label>Prénom</label>
              <br />
              <input
                className="inp-firstName"
                type="name"
                placeholder="Prénom"
                onChange={handleInput}
                value={user.firstName}
              />
              <div className="prenom error"></div>
            </div>

            <div className="title-content">
              <label>Nom</label>
              <br />
              <input
                className="inp-lastName"
                type="name"
                placeholder="Nom"
                onChange={handleInput}
                value={user.lastName}
              />
              <div className="nom error"></div>
            </div>

            <div className="title-content">
              <label>Adresse email</label>
              <br />
              <input
                className="inp-email"
                type="email"
                placeholder="Adresse email"
                onChange={handleInput}
                value={user.email}
              />
              <div className="email error"></div>
            </div>

            <div className="title-content">
              <label>Mot de passe</label>
              <br />
              <input
                className="inp-password"
                type="password"
                placeholder="Mot de passe"
                onChange={handleInput}
                value={user.password}
              />
              <div className="password error"></div>
            </div>

            <button className="btn-log" type="submit" value="S'inscrire">
              S'inscrire
            </button>
          </form>
        </div>
      )}
      <p className="errorregister">{user.msgError}</p>
    </>
  );
}
