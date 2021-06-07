import React, {useEffect} from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Footer from './Footer';
import Style from '../Styles/Home.module.css';
import CardContainer from './CardContainer';
import {connect} from 'react-redux';
import {getDogs, getTemperaments, getNames} from '../Actions/index';



function Home({getDogs, getTemperaments, getNames}){
    
    useEffect(
        ()=>{ 
            getDogs()
            getTemperaments()
            getNames()
        },[]
    )

    return(
        <div id="home" className={Style.container}>
            <NavBar />
            <SearchBar />
            <CardContainer />
            <Footer />
        </div>
    )
}


function mapDispatchToProps(dispatch){
    return{
        getDogs: ()=> dispatch(getDogs()),
        getTemperaments: ()=> dispatch(getTemperaments()),
        getNames: ()=> dispatch(getNames())
    }
}

export default connect(null, mapDispatchToProps)(Home);
