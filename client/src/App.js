import React from 'react';
import './Styles/_App.scss';
import Router from './Routes/Router';
import Header from './Components/Header/Header';
import NavBar from './Components/Nav/Navbar';


function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Router />
    </>
  );
}

export default App;
