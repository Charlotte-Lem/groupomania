import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './SignIn';
import url from '../../Utils/urlApi';



export default function Signup() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const prenomError = document.querySelector('.Prenom.error');
    const nomError = document.querySelector('.nom.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const confirmPasswordError = document.querySelector(
      '.password-confirm.error'
    );

    if (password !== confirmPassword) {
      confirmPasswordError.innerHTML =
        'Les mots de passe ne sont pas identiques';
    } else {
      await axios({
        method: 'post',
        url: `${url}user/signup`,
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            prenomError.innerHTML = res.data.errors.prenom;
            nomError.innerHTML = res.data.errors.nom;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
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
            onSubmit={handleSignup}
            id="sign-up-form"
          >
            <h2>S'enregistrer</h2>

            <div className="title-content">
              <label>Prénom</label>
              <br />
              <input
                type="name"
                placeholder="Prénom"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstName}
              />
              <div className="prenom error"></div>
            </div>

            <div className="title-content">
              <label>Nom</label>
              <br />
              <input
                type="name"
                placeholder="Nom"
                onChange={(e) => setLastname(e.target.value)}
                value={lastName}
              />
              <div className="nom error"></div>
            </div>

            <div className="title-content">
              <label>Adresse email</label>
              <br />
              <input
                type="email"
                placeholder="Adresse email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="email error"></div>
            </div>

            <div className="title-content">
              <label>Mot de passe</label>
              <br />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="password error"></div>
            </div>
            <div className="title-content">
              <label>Confirmer votre mot de passe</label>
              <br />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <div className="password-confirm error"></div>
            </div>

            <button className="btn-log" type="submit" value="S'inscrire">
              S'inscrire
            </button>
          </form>
        </div>
      )}
    </>
  );
}
