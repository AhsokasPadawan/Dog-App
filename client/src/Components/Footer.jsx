import React from 'react';
import Style from '../Styles/Footer.module.css';
import GitHub from '../Images/github.png';
import LinkedIn from '../Images/linkedIn.png';
import Torre from '../Images/torre.png';

function Footer(){
    return(
        <div className={Style.container}>
            <h3>Design By Javier Rossi</h3>
            <div className={Style.navLink}>
              <a href="https://github.com/AhsokasPadawan"><img src={GitHub} alt="gitHub" className={Style.images} /></a> 
              <a href="https://www.linkedin.com/in/javier-rossi-856410126/"><img src={LinkedIn} alt="linkedIn" className={Style.images} /></a>
              <a href="https://torre.co/en/mrossijavier"><img src={Torre} alt="torre.Co" className={Style.images} /></a>
            </div>
        </div>
    )
}

export default Footer;