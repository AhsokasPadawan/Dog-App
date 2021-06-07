import React from 'react';
import Style from '../Styles/NavBar.module.css';
import Logo from '../Images/logo.png';
import {NavLink} from 'react-router-dom';

function NavBar(){
    return(
        <div className={Style.container}>
            <NavLink exact to="/home"><img src={Logo} alt="logo" className={Style.logo} /></NavLink> 
            <div className={Style.navLink}>
                <NavLink  className={Style.link} exact to="/home">Home</NavLink>
                <NavLink className={Style.link} exact to="/createDog">Create a Dog</NavLink>
            </div>
        </div>
    )
}

export default NavBar;