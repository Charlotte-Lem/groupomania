import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
export default function Logout() {
  const navigate = useNavigate();
  // const removeStorage = window.localStorage;
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <button onClick={logout} className=" btn-logout">
        <FontAwesomeIcon
          className="icon-logout"
          icon={faArrowRightFromBracket}
        />
      </button>
    </>
  );
}
