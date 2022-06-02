import React, { useState } from 'react';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { api } from '../../Utils/api';

export default function Signup() {
  const [formSubmit, setFormSubmit] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const params = useParams();

  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    msgError: '',
  });

 
  const [errorres, setErrorres] = useState(null);

  const handleForm = (e) => {
    const errorUser = document.querySelector('.errorUser');
    e.preventDefault();
    let data = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    axios
      .post(api + '/api/user/signup', data)
      .then((res) => {
        if (res.data.error) {
          errorUser.innerHTML = 'Cette email est déjà utilisée';
        } else {
          setFormSubmit(false);
          setUser({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        
      });
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
                maxLength="32"
                pattern="[A-Za-z]{2,32}"
                title="Minimum 2 caractères"
                autoComplete="on"
                required
              />
            </div>

            <div className="title-content">
              <label>Nom</label>
              <br />
              <input
                className="inp-lastName"
                type="name"
                autoComplete="on"
                placeholder="Nom"
                onChange={handleInput}
                value={user.lastName}
                maxLength="32"
                pattern="[A-Za-z]{2,32}"
                title="Minimum 2 caractères"
                required
              />
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
                required
                pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
                title="Veuillez vérifiez le format de votre adresse email"
              />
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
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}"
                title="Le mot de passe doit contenir entre 6 et 20 caractère avec une majuscule une minuscule et un chiffre  "
              />
            </div>

            <button className="btn-log" type="submit" value="S'inscrire">
              S'inscrire
            </button>
            <div className="errorUser"></div>
          </form>
        </div>
      ) : (
        <>
          <SignIn />
          <h4 className="succes"> "Inscription réussie! Connectez-vous !"</h4>
        </>
      )}
    </>
  );
}
