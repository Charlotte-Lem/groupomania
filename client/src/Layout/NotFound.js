import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="err">
      <h1>Oops, cette page n'existe pas</h1>
      <button className="err btn-post" onClick={() => navigate('/actus')}>
        Retourner voir les actualités du moment
      </button>
    </div>
  );
}
