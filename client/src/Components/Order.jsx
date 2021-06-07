import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ordered} from '../Actions/index';


function Order({dogs, ordered}){

    const [chosenSort, setChosenSort] = useState("");

    function handleChange(id){
        let orderType = document.getElementById(id);
        switch(orderType.value){
            case "AZ": 
            return setChosenSort("AZ");
            case "ZA": 
            return setChosenSort("ZA");
            case "MaxMin": 
            return setChosenSort("MaxMin");
            case "MinMax": 
            return setChosenSort("MinMax");

            default: return
        }
    }

    function filter(){
        ordered(chosenSort);
    }

    return(
        <div>
            <span>Order by</span>
            <select id="selectOrder" onChange={()=>handleChange("selectOrder")}>   
                <option>-</option>
                <option value="AZ">Name(A-Z)</option>
                <option value="ZA">Name(Z-A)</option>
                <option value="MaxMin">Weight(Max-Min)</option>
                <option value="MinMax">Weight(Min-Max)</option>
            </select>
            <button onClick={() =>filter()}>Order</button>
        </div>
    )
}

function mapStateToProps(state){
    return{
        dogs : state.dogs,
    }
}

function mapDispatchToProps(dispatch){
    return{
        ordered: state=> dispatch(ordered(state))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);