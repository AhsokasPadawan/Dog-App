import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import DogCard from './DogCard'
import Style from '../Styles/CardContainer.module.css';


function CardContainer({dogs, dogsFiltered}){
  
    const [initial, setInitial] = useState(0);
    const [end, setEnd] = useState(8);
    
    function handleClick(each){
        console.log(each);
        setInitial((parseInt(each) - 1)*8 );
        setEnd(parseInt(each)*8)    
    }

    let someDogs=[];
    let bar = [];

    if(dogsFiltered.length > 0){
        someDogs= dogsFiltered.slice(initial, end);
        for(let i= 0; i < Math.ceil(dogsFiltered.length/8); i++){
            bar.push(i + 1);
        }
    }else{
        someDogs= dogs.slice(initial, end);
        for(let i= 0; i < Math.ceil(dogs.length/8); i++){
            bar.push(i + 1);
        }
    }

    

    if(someDogs.length < 1){
        return(
            <div className={Style.cardContainer}>
                <h1>There are not dogs of the searched breed </h1>
            </div>
        )
    }

    return(
        <div className={Style.cardContainer}>
        {someDogs.map((dog, index)=> <DogCard id={dog.Id}
                                  name={dog.Name}
                                  temperament={dog.Temperament}
                                  image={dog.Image}
                                  key={index}/>)}
        <div>{bar.map((each, index)=> <button value={each} key={index} onClick = {(e)=>handleClick(e.target.value)}>{each}</button>)}</div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        dogs : state.dogs,
        dogsFiltered : state.dogsFiltered
    }
}

export default connect(mapStateToProps)(CardContainer);