import React, {useEffect}from 'react';
import { getFullDogs } from '../Actions';
import {connect} from 'react-redux';
import Style from '../Styles/FullDog.module.css';
import NavBar from './NavBar';
import Footer from './Footer';


function FullDogCard({getFullDogs, fullDog, dogId}){

    
    useEffect(()=>{
        getFullDogs(dogId);
    }, [])
    
   
    
    return(
        <div>
            <NavBar />
            <div className={Style.dogCard}>
                <h3 className ={Style.title}>{fullDog.Name}</h3>
                <img className={Style.dogImg} src={fullDog.Image || "https://img2.freepng.es/20180415/jdw/kisspng-logo-silhouette-dog-bone-dog-5ad41d4b59e7d5.7560651515238505713683.jpg"} alt="a dog"/>
                <p>Temperaments: {fullDog.Temperament}</p>
                <p>Height: {fullDog.Height} cm </p>
                <p>Weight: {fullDog.Weight} kg</p>
                <p>LifeSpan: {fullDog.LifeSpan} </p>
            </div>
            <Footer />
        </div>
    )
}

function mapStateToProps(state){
    return{
        fullDog : state.fullDog
    }
}

function mapDispatchToProps(dispatch){
    return{
        getFullDogs : idDog=> dispatch(getFullDogs(idDog))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FullDogCard);

