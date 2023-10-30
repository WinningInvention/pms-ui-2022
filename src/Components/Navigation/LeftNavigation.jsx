import React from "react";
import '../../Styles/main.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { MENU_TOGGLE } from "../../Actions";
import { useLocation } from "react-router-dom";
import leftNav from '../../constants/leftNav.json'

const LeftNavigation = (props) => {
  const dispatch = useDispatch();

  const menuToggleHandler = () => {
    dispatch({
      type: MENU_TOGGLE,
      payload: false,
    });
   };

   const location = useLocation();
    const { pathname } = location;
    return (
      <nav
        className="navbar navbar-inverse fixed-top active"
        id="sidebarWrapper"
        role="navigation"
      >
        <div className="sidebar-header">
            Critical Care{" "}
            <span className="pointer menuToggler" onClick={()=>menuToggleHandler()}>
              <i className="fa-solid fa-caret-right"></i>
            </span>
          </div>
          <ul className="nav sidebar-nav">
          {leftNav.map(lNav => (
            <li>
            <Link to={lNav.pathName} className={pathname===lNav.pathName?'active':''}>
              <i className={lNav.className}></i> {lNav.name}
            </Link>
          </li>          
          ))
}
        </ul>
      </nav>
    );
}

export default LeftNavigation;