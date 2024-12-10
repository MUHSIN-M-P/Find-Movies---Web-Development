import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Icon from "../../assets/icon.png";
import { SearchBar } from "./SearchBox/Searchbox";

import "./NavigationBar.css";

export const NavigationBar = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { token } = useSelector((state) => state.Authentication);

  const handleSearchToggle = () => {
    setSearchOpen(!isSearchOpen);
    setNavOpen(false);
  };

  const handleNavOpen = () => {
    setNavOpen(true);
    setSearchOpen(false);
  };

  const handleNavClose = () => {
    setNavOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <nav
        className={`nav ${isSearchOpen ? "openSearch" : ""} ${
          isNavOpen ? "openNav" : ""
        }`}
      >
        <img
          src="https://img.icons8.com/?size=20&id=aflTW0mA9OBv&format=png&color=000000"
          className={`navOpenBtn ${theme === "light" ? null : "invert"}`}
          onClick={handleNavOpen}
          alt=""
        />
        <a href="/" className="logo">
          <img src={Icon} alt="" />
          Find Movies
        </a>
        <div className="items">
          <ul className="nav-links">
            <i
              className="uil uil-times navCloseBtn"
              onClick={handleNavClose}
            ></i>
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">TV Shows</a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
            {token && (
              <li>
                <a href="/account">Account</a>
              </li>
            )}
          </ul>
          <div className="icon">
            {/* theme button */}
            <label
              htmlFor="themeToggle"
              className="themeToggle st-sunMoonThemeToggleBtn"
              type="checkbox"
            >
              <input
                type="checkbox"
                id="themeToggle"
                className="themeToggleInput"
                onChange={toggleTheme}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="none"
              >
                <mask id="moon-mask">
                  <rect x="0" y="0" width="20" height="20" fill="white"></rect>
                  <circle cx="11" cy="3" r="8" fill="black"></circle>
                </mask>
                <circle
                  className="sunMoon"
                  cx="10"
                  cy="10"
                  r="8"
                  mask="url(#moon-mask)"
                ></circle>
                <g>
                  <circle
                    className="sunRay sunRay1"
                    cx="18"
                    cy="10"
                    r="1.5"
                  ></circle>
                  <circle
                    className="sunRay sunRay2"
                    cx="14"
                    cy="16.928"
                    r="1.5"
                  ></circle>
                  <circle
                    className="sunRay sunRay3"
                    cx="6"
                    cy="16.928"
                    r="1.5"
                  ></circle>
                  <circle
                    className="sunRay sunRay4"
                    cx="2"
                    cy="10"
                    r="1.5"
                  ></circle>
                  <circle
                    className="sunRay sunRay5"
                    cx="6"
                    cy="3.1718"
                    r="1.5"
                  ></circle>
                  <circle
                    className="sunRay sunRay6"
                    cx="14"
                    cy="3.1718"
                    r="1.5"
                  ></circle>
                </g>
              </svg>
            </label>
            <i
              className={`uil ${
                isSearchOpen ? "uil-times" : "uil-search"
              } search-icon ${theme === "light" ? "invert" : null}`}
              id="searchIcon"
              onClick={handleSearchToggle}
            ></i>
            <div className={`search-box ${isSearchOpen ? "visible" : ""}`}>
              <SearchBar />
            </div>
            {token && (<a href="/watch-list" style={{ color: "unset" }}>
              <span
                className={`material-symbols-rounded ${
                  theme === "dark" ? "invert" : null
                }`}
              >
                shop
              </span>
            </a>)}
            
          </div>
        </div>
      </nav>
    </div>
  );
};
