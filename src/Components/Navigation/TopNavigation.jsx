import React, {useState} from "react";
import '../../Styles/main.css';
import LeftNavigation from "./LeftNavigation";
import userLogo from "../../Images/user-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import {useDispatch} from 'react-redux';
import {LOGOUT, MENU_TOGGLE} from "../../Actions"

const TopNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("Token before logout:", localStorage.getItem("token"));
     AuthService.logout();
    console.log("Token after logout:", localStorage.getItem("token"));
     dispatch({
      type: LOGOUT,
    });
    navigate("/login");
   }

   const menuToggleHandler = () => {
    dispatch({
      type: MENU_TOGGLE,
      payload: true,
    });
   }
    return(
      <>
      <LeftNavigation />
      <div className="container-fluid">
      <div className="navbar-header d-flex align-items-center px-md-3 mb-3">
            <div className="mr-auto">
              <button type="button" className="btn btn-icon btn-primary mr-3 menuToggler" onClick={()=>menuToggleHandler()}>
                <i className="fa-sharp fa-solid fa-bars"></i>
              </button>
              <Link to="/" className="btn btn-style-2 btn-sm mr-1">AICU</Link>
              <button type="button" className="btn btn-primary btn-sm mr-1">PACU</button>
              <button type="button" className="btn btn-style-3 btn-sm">PART</button>
            </div>
            <div className="d-flex dropdown">
              <button className="dropdown-toggle border-0 p-0 bg-transparent noDropdownIcon" type="button" data-toggle="dropdown"
                aria-expanded="false">
                <img src={userLogo} alt="" style={{width: "30px" }}/>
              </button>
              <div className="dropdown-menu dropdown-menu-right mt-3">
                <a className="dropdown-item" href="#">My Profile</a>
                <a className="dropdown-item" href="#" onClick={()=>logoutHandler()}>Log Out</a>
              </div>
            </div>
          </div>
        </div>
        </>
        );
}

export default TopNavigation;