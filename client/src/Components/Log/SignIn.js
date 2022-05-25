import React, { useState } from 'react';
import axios from 'axios';

import { api } from '../../Utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLogin } from '../../Actions/userAction';

export default function SignIn() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
    msgError: '',
  });

  const { userForm } = useSelector((state) => ({
    ...state.userReducer,
    ...state.inputReducer,
  }));

  const handleLogin = (e) => {
    e.preventDefault();
    // const userNotFound = document.querySelector('.usernotfound');
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
          // const userId = response.userId;
          localStorage.setItem('token', JSON.stringify(response.data));
          // localStorage.setItem('Token', response.data.token);
          console.log(response);
          // AuthRequired();
          window.location.reload();
        })
        .catch((err) => {
          const auth = localStorage.getItem('token');

          if (!auth) {
            setUser({
              ...user,
              msgError:
                'Utilisateur non trouvé,verifiez vos informations ou contactez un admin ',
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
