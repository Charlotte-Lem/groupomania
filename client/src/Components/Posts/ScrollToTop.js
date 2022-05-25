import React, { useState, useEffect } from 'react';
//import de l'icone de fléche via react-icon
import { FaAngleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  //state qui controle la visibilité du bouton scrolltotop
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    // evenement qui définit l'état du state
    // sur true quand l'utilisateur fait défiler 2000pixels
    window.addEventListener('scroll', () => {
      if (window.scrollY > 2000) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  //fonction pour la gestion du click qui ramène vers le haut

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="top-to-btm">
      {' '}
      {showTopBtn && (
        <FaAngleUp className="icon-position icon-style" onClick={goToTop} />
      )}{' '}
    </div>
  );
};
export default ScrollToTop;
