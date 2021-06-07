import React, {useState} from 'react';
import {connect} from 'react-redux';
import {filterBySource, filterByTemperament} from '../Actions/index';


function Filter({temperaments, breeds, filterByTemperament, filterBySource}){

    const [chosenTemperament, setChosenTemperament] = useState("");
    const [chosenSource, setChosenSource] = useState("");

    function handleChange(id){
        let filter = document.getElementById(id);
        if(id === "selectSource") setChosenSource(filter && filter.value);
        if(id === "selectTemperament")setChosenTemperament(filter && filter.value);
    }

    function filter(type){
        if(type === "source") return filterBySource(chosenSource);
        if(type === "temperament") return filterByTemperament(chosenTemperament);
    }

    return(
        <div>
            <span>Filter by</span>
            <select id="selectSource" onChange={()=>handleChange("selectSource")}>
                <option value ="-" >-</option>
                <option value ="api" >Api</option>
                <option value ="db" >DB</option>
                {/* {breeds?.map((breed, index)=>{ return <option key={index} value ={breed} >{breed}</option>})} */}
            </select>
            <button onClick={() =>filter("source")}>Source</button>
            <select id="selectTemperament" onChange={()=>handleChange("selectTemperament")}>
                <option value ="temperament" >-</option>
                {temperaments.map((temperament, index)=>{ return <option key={index} value ={temperament.name} >{temperament.name}</option>})}
            </select>
            <button onClick={() =>filter("temperament")}>Temperament</button>
        </div>
    )
}

function mapStateToProps(state){
    return{
        temperaments : state.temperaments,
        breeds : state.dogsByBreed
    }
}

function mapDispatchToProps(dispatch){
    return{
        filterByTemperament: (temperament=> dispatch(filterByTemperament(temperament))),
        filterBySource: (source=> dispatch(filterBySource(source)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter);