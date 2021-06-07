import React from 'react';
import {useState} from 'react';
import { getDogsByBreed } from '../Actions';
import {connect} from 'react-redux';

function Search({dogsByBreed}){

    const [dogSearched, setDogSearched] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        dogsByBreed(dogSearched);
        setDogSearched("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search dog by breed" value={dogSearched} onChange={e => setDogSearched(e.target.value)}/>
            <input type="submit" value="Buscar" />
          </form>
    );
}

function mapDispatchToProps(dispatch){
    return{
        dogsByBreed : breed=> dispatch(getDogsByBreed(breed))
    }
}

export default connect(null, mapDispatchToProps)(Search);