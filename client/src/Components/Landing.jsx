import React from 'react';
import Style from '../Styles/Landing.module.css';
import {Link} from 'react-router-dom';


function Landing(){
    return (
        <div  className = {Style.container}>
            <div className = {Style.box}>
                <h1 className={Style.title}>Dogs App</h1>
                <div className={Style.welcome}>
                    <h2></h2>
                    <Link to="/home"><button className={Style.btn}>Welcome</button></Link>
                    <h3>Desing by Javier Rossi</h3>
                </div>
            </div>
        </div>
    )
}

export default Landing;