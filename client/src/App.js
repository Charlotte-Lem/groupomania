import React from 'react';
import './Styles/_App.scss';
import Router from './Routes/Router';
import Header from './Components/Header/Header';
import NavBar from './Components/Nav/Navbar';
import Footer from './Components/Footer.js/Footer';


function App() {
  return (
    <>
      <Header />
    
      <Router />
      <Footer/>
    </>
  );
}

export default App;
