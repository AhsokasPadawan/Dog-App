import React, {useState, useEffect} from 'react';
import {getTemperaments, createDog} from '../Actions/index';
import {connect} from 'react-redux';

function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = 'Breed is required';
    } else if (!/[^\(\)0-9]*/.test(input.name)){
        errors.name = 'Breed is invalid';
    }
    if(!input.height){
        errors.height = 'Numbers are required';
    }else if ((!/(?=.*[0-9])/.test(input.height))){
        errors.height = 'Height is invalid';
    }

    if (!input.weight) {
        errors.weight = 'Numbers are required';
    }else if ((!/(?=.*[0-9])/.test(input.weight))){
        errors.weight = 'Weight is invalid';
    }
    if(!input.lifeSpan){
        errors.lifeSpan = 'Numbers are required';
    }else if ((!/(?=.*[0-9])/.test(input.lifeSpan))){
        errors.lifeSpan = 'Life Span is invalid';
    }

    return errors;
};



function  Form({allTemperaments, getTemperaments, createDog}) {

    useEffect(
        ()=>{ 
            getTemperaments()
        },[]
    )

    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        lifeSpan: '',
        temperaments: []
    });

    function handleSubmit(e){
        console.log("soy el submit");
        e.preventDefault();
        if(Object.entries(errors).length === 0){
            createDog(input);

        }else{
            alert("Every field must be valid");
        }
    }

    const [errors, setErrors] = useState({});

    const handleInputChange = (e)=>{
        if(e.target.name === "temperaments"){

            setInput({
                ...input, temperaments: [...input.temperaments, e.target.value]
            })
        }
        else{
            setInput({
                ...input, [e.target.name]: e.target.value
            })
        }
        setErrors(validate({
        ...input, [e.target.name]: e.target.value
        }))
    }


    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label>Breed:</label>
                <input className={`${errors.name && 'danger'}`} type="text" name="name" onChange={handleInputChange}  value={input.name}/>
                <p className='danger'>{errors.name}</p>
                <label>Height(min and max ):</label>
                <input className={`${errors.height && 'danger'}`} type="text" name="height" onChange={handleInputChange} value={input.height} />
                <p className='danger'>{errors.height}</p>
                <label>Weight(min and max):</label>
                <input className={`${errors.weight && 'danger'}`} type="text" name="weight" onChange={handleInputChange}  value={input.weight}/>
                <p className='danger'>{errors.weight}</p>
                <label>Life Span:</label>
                <input className={`${errors.lifeSpan && 'danger'}`} type="text" name="lifeSpan" onChange={handleInputChange} value={input.lifeSpan} />
                <p className='danger'>{errors.lifeSpan}</p>
                <select name="temperaments" onChange={(e)=>handleInputChange(e)}>
                    <option value ="temperament" >Temperament</option>
                    {allTemperaments.map((temperament, index)=>{ return <option key={index} value ={temperament.id} >{temperament.name}</option>})}
                </select>
                <input type="submit" value= 'submit' />
            </div>
        </form>
    )
}

function mapStateToProps(state){
    return{
        allTemperaments : state.temperaments,
    }
}

function mapDispatchToProps(dispatch){
    return{
        getTemperaments: ()=> dispatch(getTemperaments()),
        createDog: (newDog)=> dispatch(createDog(newDog)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Form);