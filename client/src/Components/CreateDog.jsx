import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Form from './Form';
import Style from '../Styles/CreateDog.module.css';


function CreateDog(){
    return(
        <div className={Style.container}>
            <NavBar />
            <h1>Here you can Create your own breed</h1>
            <Form />
            <Footer />
        </div>
    )
}

export default CreateDog;