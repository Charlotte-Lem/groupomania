import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="err">
      <h1>Oops, cette page n'existe pas</h1>
      <button
        aria-label=" page d'erreur retour à l'actualités "
        className="err btn-post"
        onClick={() => navigate('/')}
      >
        Retourner à l'accueil
      </button>
    </div>
  );
};
export default NotFound;
