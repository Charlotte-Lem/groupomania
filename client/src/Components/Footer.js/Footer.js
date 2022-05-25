import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
import logofooter from '../../Assets/log.svg';
export default function Footer() {
  return (
    <div className="footer">
      <img
        className="footer__logo"
        src={logofooter}
        alt="logo groupomania"
        style={{ height: 150, width: 200 }}
      />
      {/* <h2 className="footer__title">Groupomania</h2> */}
      <a className="footer__link" href="#">
        Un problème? Contactez un admin{' '}
        <FontAwesomeIcon className="footer__icon" icon={faSquareEnvelope} />
      </a>
    </div>
  );
}
