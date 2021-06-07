import React from 'react';
import {Link} from 'react-router-dom';
import Style from '../Styles/DogCard.module.css'; 



function DogCard({name, temperament, image, id}){

    return(
        <div className={Style.dogCard}>
            <div className={Style.titleContainer}>
            <Link to={`/home/${id}`} ><h3 className ={Style.title}>{name}</h3></Link>
            </div>
            <div className={Style.imgContainer}>
                <img className={Style.dogImg} src={image || "https://img2.freepng.es/20180415/jdw/kisspng-logo-silhouette-dog-bone-dog-5ad41d4b59e7d5.7560651515238505713683.jpg"} alt="a dog"/>
            </div>
            <div className={Style.temperament}>
                <p>{temperament}</p>
            </div>
        </div>
    )
}

export default DogCard;

