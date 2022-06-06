import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

export default function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/home');
    window.location.reload();
  };

  return (
    <>
      <button onClick={logout} className=" btn-logout" aria-label="Déconnexion">
        <BiLogIn
          className=" btn-logout__icon-logout"
          aria-label="Déconnexion"
        />
      </button>
    </>
  );
}
