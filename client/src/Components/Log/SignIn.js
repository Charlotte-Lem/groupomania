import React, { useState } from 'react';
// import axios from 'axios';

// import url from '../../Utils/urlApi';
import { useNavigate } from 'react-router-dom';
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
  });

  const { userForm } = useSelector((state) => ({
    ...state.userReducer,
    ...state.inputReducer,
  }));

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.email | (user.password === '')) {
      alert('Veuillez remplir tous les champs');
      window.location.reload(false);
    } else {
      getLogin(user.email, user.password)
        .then((response) => {
          const userId = response.userId;
          localStorage.setItem('token', JSON.stringify(response));
          console.log(response);
          navigate(`/profil/${userId}`);
        })
        .catch((err) => {
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
          <div className="email error"></div>
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
          <div className="password error"></div>
        </div>

        <button className="btn-log" type="submit" value="Se connecter">
          Envoyer
        </button>
      </form>
    </div>
  );
}
