import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Log() {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === 'login') {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };
  return (
    <>
      <div className="connection-form">
      
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? 'active-btn' : null}
          >
            S'enregistrer
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? 'active-btn' : null}
          >
            Se connecter
           
          </li>

        </ul>
        {signInModal && <SignIn />}
        {signUpModal && <SignUp />}
        
      </div>
    </>
  );
}
