import React from 'react';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage __content">
        <div className="homepage __link">
          <p className="homepage __text">
            Inscrivez-vous et connectez-vous pour accèder aux actualités de
            Groupomania !
          </p>
          <button className="homepage __link-content">
            <Link to="/"> Inscription et connexion </Link>{' '}
          </button>
          <img
            src={logo}
            alt="Logo Groupomania"
            className="homepage __logo"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
