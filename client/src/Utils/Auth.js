import { Outlet } from 'react-router-dom';
import HomePage from '../Layout/Homepage';
import Home from '../Layout/Home';

const Auth = () => {
  let storage = localStorage.getItem('token');
  return storage === null ? <Home /> : <Outlet />;
};

export default Auth;
