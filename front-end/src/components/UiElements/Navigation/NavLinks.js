import React, {useContext} from "react";
import {NavLink} from 'react-router-dom';
import './NavLinks.css';
import { authContext } from "../../context/auth-context";

const NavLinks = props =>{
    const auth = useContext(authContext);
    return <ul className="nav-links">
        {auth.isLoggedIn &&(
        <li>
            <NavLink to="/users" exact>All Users</NavLink>
        </li>)}
        {auth.isLoggedIn &&(
        <li>
            <NavLink to="/newuser">Add Users</NavLink>
        </li>)}
        <li>
            <NavLink to="/mode">Mode</NavLink>
        </li>
                
        <li>
            <NavLink to="/authentication">Authenticate</NavLink>
        </li>
    </ul>

}

export default NavLinks;
