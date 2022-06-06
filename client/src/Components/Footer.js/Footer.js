import React from 'react';
import { GoMail } from 'react-icons/go';
import logofooter from '../../Assets/log.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <img
        className="footer__logo"
        src={logofooter}
        alt="logo groupomania"
        style={{ height: 150, width: 150 }}
        height="150"
        width="150"
      />
      <a className="footer__link" href="#">
        Un problème? Contactez un admin{' '}
        <GoMail className="footer__icon"  />
      </a>
    </footer>
  );
}
