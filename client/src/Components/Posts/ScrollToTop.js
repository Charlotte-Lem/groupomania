import React, { useState, useEffect } from 'react';
//import de l'icone de fléche via react-icon
import { FaAngleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  //state qui controle la visibilité du bouton scrolltotop
  const [showTopBtn, setShowTopBtn] = useState(false);

  const visibleScroll = () => {
    // sur true quand l'utilisateur fait défiler 500pixels
    if (window.pageYOffset > 500) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  //fonction pour la gestion onClick qui ramène vers le haut
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    // evenement qui définit l'état du state
    window.addEventListener('scroll', visibleScroll);
    return () => {
      window.removeEventListener('scroll', visibleScroll);
    };
  }, []);
  return (
    <div className="top-to-btm">

      {showTopBtn && (
        <FaAngleUp className="icon-position icon-style" onClick={goToTop} />
      )}
    </div>
  );
};
export default ScrollToTop;
