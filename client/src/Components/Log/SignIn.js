import React, { useState } from 'react';
import axios from 'axios';

import { api } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
    msgError: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.email === '' || user.password === '') {
      setUser({
        ...user,
        msgError: 'Tous les champs doivent être remplis',
      });
    } else {
      let data = {
        email: user.email,
        password: user.password,
      };
      axios
        .post(api + '/api/user/login', data)
        .then((response) => {
          localStorage.setItem('token', JSON.stringify(response.data));
          console.log(response);
          navigate('/');
          window.location.reload();
        })
        .catch((err) => {
          const auth = localStorage.getItem('token');

          if (!auth) {
            setUser({
              ...user,
              msgError:
                'Utilisateur non trouvé, vérifiez vos informations ou contactez un admin ',
            });

            console.log('No Token');
          }
          console.log(err);
        });
    }
  };

  const handleInput = (e) => {
    if (e.target.classList.contains('inp-email')) {
      const newObjState = { ...user, email: e.target.value };
      setUser(newObjState);
    } else if (e.target.classList.contains('inp-password')) {
      const newObjState = { ...user, password: e.target.value };
      setUser(newObjState);
    }
  };

  return (
    <>
      <div className="card-log __signin">
        <form
          className="form form-signin"
          action=""
          onSubmit={handleLogin}
          id="sign-up-form"
        >
          <h2>Se connecter</h2>
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
          </div>

          <div className="title-content">
            <label>Mot de passe</label>
            <br />
            <input
              className="inp-password"
              type="password"
              placeholder="Mot de passe"
              id="password"
              onChange={handleInput}
              value={user.password}
            />
          </div>
          <button className="btn-log" type="submit" value="Se connecter">
            Envoyer
          </button>
          <p className="usernotfound"></p>
        </form>
      </div>
      <p className="usernotfound">{user.msgError}</p>
    </>
  );
}

// <Link
//       to='/'
//       className='link_login'>Identifiez vous dès maintenant</Link>
