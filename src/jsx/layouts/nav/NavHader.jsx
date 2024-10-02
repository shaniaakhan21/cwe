import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import { navtoggle } from "../../../store/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES } from "../../constant/theme";

const NavHader = () => {
  const { openMenuToggle } = useContext(
    ThemeContext
  );
  const dispatch = useDispatch();
  const sideMenu = useSelector(state => state.sideMenu);
  const handleToogle = () => {
    dispatch(navtoggle());
  };
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">

        <img src={IMAGES.LogoWhite} alt="CWE Logo" className="image-dash" />
        <img src={IMAGES.LogoPhone} alt="CWE Logo" className="image-phone" />

      </Link>
      <div
        className="nav-control"
        onClick={() => {
          handleToogle();
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${sideMenu ? "is-active" : ""}`}>
          {sideMenu ? (
            // Close Icon SVG

            <svg
              version="1.1"
              id="a"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
               width="24" height="24"
            >
              <path
                fill="#EAECEF"
                d="M22.8,3c0,0.4-0.3,0.8-0.8,0.8H2C1.6,3.8,1.2,3.4,1.2,3S1.6,2.2,2,2.2h20C22.4,2.2,22.8,2.6,22.8,3z
              M22,8.2H10C9.6,8.2,9.2,8.6,9.2,9S9.6,9.8,10,9.8h12c0.4,0,0.8-0.3,0.8-0.8S22.4,8.2,22,8.2z
              M22,14.2H10c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h12c0.4,0,0.8-0.3,0.8-0.8S22.4,14.2,22,14.2z
              M22,20.2H2c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h20c0.4,0,0.8-0.3,0.8-0.8S22.4,20.2,22,20.2z
              M1.2,15V9c0-0.3,0.2-0.5,0.4-0.7s0.6-0.1,0.8,0.1l4,3c0.2,0.1,0.3,0.4,0.3,0.6s-0.1,0.5-0.3,0.6l-4,3
              c-0.1,0.1-0.3,0.1-0.5,0.1c-0.1,0-0.2,0-0.3-0.1C1.4,15.5,1.2,15.3,1.2,15L1.2,15z M2.8,13.5l2-1.5l-2-1.5V13.5z"
              />
            </svg>
          ) : (
            // Open Icon SVG
            <svg version="1.1"
              id="a"
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              viewBox="0 0 24 24">

              <path fill="#EAECEF" d="M22.8,3c0,0.4-0.3,0.8-0.8,0.8H2C1.6,3.8,1.2,3.4,1.2,3S1.6,2.2,2,2.2h20C22.4,2.2,22.8,2.6,22.8,3z M22,8.2H10
                C9.6,8.2,9.2,8.6,9.2,9S9.6,9.8,10,9.8h12c0.4,0,0.8-0.3,0.8-0.8S22.4,8.2,22,8.2z M22,14.2H10c-0.4,0-0.8,0.3-0.8,0.8
                s0.3,0.8,0.8,0.8h12c0.4,0,0.8-0.3,0.8-0.8S22.4,14.2,22,14.2z M22,20.2H2c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h20
                c0.4,0,0.8-0.3,0.8-0.8S22.4,20.2,22,20.2z M1.5,12.6c-0.2-0.1-0.3-0.4-0.3-0.6s0.1-0.5,0.3-0.6l4-3c0.2-0.2,0.5-0.2,0.8-0.1
                C6.6,8.5,6.8,8.7,6.8,9v6c0,0.3-0.2,0.5-0.4,0.7c-0.1,0.1-0.2,0.1-0.3,0.1c-0.2,0-0.3-0.1-0.5-0.1C5.5,15.6,1.5,12.6,1.5,12.6z
                M3.3,12l2,1.5v-3L3.3,12z"/>
            </svg>

          )}
        </div>
      </div>

    </div>
  );
};

export default NavHader;
