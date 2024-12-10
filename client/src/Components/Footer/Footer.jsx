import React from "react";
import './Footer.css'
import logo from '../../assets/icon.png'
export const Footer = () => {
        const year = new Date().getFullYear()
  return (
    <footer>
      <div className="footer-content">
        <div className="top">
          <div className="logo-details">
            <img src={logo} alt="" />
            <span className="logo-name">Find Movies</span>
          </div>
          <div className="media-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="link-boxes">
          <ul className="box">
            <li className="link_name">Company</li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Get started</a>
            </li>
          </ul>
          <ul className="box">
            <li className="link_name">Services</li>
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">TV Shows</a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
            <li>
              <a href="#">Documentaries</a>
            </li>
          </ul>
          <ul className="box">
            <li className="link_name">Account</li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">My account</a>
            </li>
            <li>
              <a href="#">Prefrences</a>
            </li>
            <li>
              <a href="#">Purchase</a>
            </li>
          </ul>
          
          <ul className="box input-box">
            <li className="link_name">Subscribe</li>
            <li>
              <input type="text" placeholder="Enter your email" />
            </li>
            <li>
              <input type="button" value="Subscribe" />
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-details">
        <div className="bottom_text">
          <span className="copyright_text">
            Copyright © {year} <a href="#">Find Movies.</a>All rights reserved
          </span>
          <span className="policy_terms">
            <a href="#">Privacy policy</a>
            <a href="#">Terms & condition</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
