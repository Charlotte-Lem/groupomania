import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Oops, cette page n'existe pas</h1>
      <button aria-label="retour à l'accueil" onClick={() => navigate('/')}>
        Retourner à l'accueil
      </button>
    </div>
  );
}
