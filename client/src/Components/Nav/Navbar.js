import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../Log/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function Nav() {
  // const handleSelect = (e) => alert(`selected ${e}`);

  // modifier l'event sur le clic

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-item">
          <NavLink className="nav-link" to="/">
            Actus
          </NavLink>
          {/* <NavLink className="nav-link" to="/actus">
            Posts
          </NavLink> */}
          <NavLink className="nav-link" to="/profil/:id">
            <FontAwesomeIcon icon={faUser} /> Profil
          </NavLink>
          <Logout />{' '}
        </div>
      </div>
    </nav>
  );
}
