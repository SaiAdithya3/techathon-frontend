import React from 'react';
import './navbar.css';
import logo from '../assets/CC.png'

const Navbar = () => {
  return (
    
          <div className="nav-bar">
            <div className="logo">
              <img className="logo-img" src={logo} alt="Reload-Image" />
            </div>
            <div className="nav-links">
              <ul>
                <a href="#">
                  <li>C</li>
                </a>
                <a href="#">
                  <li>C++</li>
                </a>
                <a href="#">
                  <li>Python</li>
                </a>
              </ul>
            </div>
            <div className="log">
              <div className="log-in">LOGIN</div>
              <div className="sign-in">HOME</div>
            </div>
            {/* <div class="complie-area"> */}
            {/* <textarea name="code" id="" cols="30" rows="10"></textarea> */}
            {/* </div> */}
          </div>
        );
      }
   

export default Navbar