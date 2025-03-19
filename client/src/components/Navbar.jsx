import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './style/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    setIsLogin(!storedToken);
}, []);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const handleProtectedRoute = (e, path) => {
    if (!token && (path === "/addrecipe" || path === "/myrecipe" || path === "/favrecipe")) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo' />
      <ul>
        <li><Link to="/">Recipe</Link></li>
       
        <li>
          <Link to="/addrecipe" onClick={(e) => handleProtectedRoute(e, "/addrecipe")}>Add Recipe</Link>
        </li>
     
        <li>
          <Link to="/myrecipe" onClick={(e) => handleProtectedRoute(e, "/myrecipe")}>My Recipe</Link>
        </li>
     
        <li>
          <Link to="/favrecipe" onClick={(e) => handleProtectedRoute(e, "/favrecipe")}>Fav Recipe</Link>
        </li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div>
        <ul>
          <li><Link to="/login" onClick={checkLogin}>{(isLogin) ? "Login" : "Logout"}{user?.username ? `(${user?.username})`: ""}</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
