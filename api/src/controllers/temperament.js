const {Dog, Temper} = require('../db');
const axios = require('axios');
const {BASE_URL} = require('../../constants');
const { response } = require('express');
const { get } = require('../app');
// const {v4: uuidv4} = require('uuid');

function getTemperaments(){
    const allDogs = axios.get(BASE_URL);
    allDogs.then(response => {
        var filtered = [];
        for(let i = 0; i < response.data.length; i++ ){
            if (response.data[i].temperament) {
                let eachTemper = response.data[i].temperament.replace(/,/g, "").split(" ");
                filtered = filtered.concat(eachTemper);
            }
        }
        let temperaments = [... new Set(filtered)];
        return temperaments;
    }).then(temperaments => {
        let allTemperaments = temperaments.map(each=> {return {name : each}});
        Temper.bulkCreate(allTemperaments)
    }).catch(err=> console.log(err));
}


getTemperaments();


function getAllTemperaments(req, res, next){
    const temper = Temper.findAll();
    temper.then(response =>{
        res.json(response);
    }).catch(err => next(err));
}

module.exports = {
    getTemperaments,
    getAllTemperaments
}


// hace click en temperaments
// llamo a la ruta Get Temperaments
// llamo a la api
// chequeo si hay alogo en la db
//si no hay
// cargo en la db
// si hay 
// leo de la base de datos
// devuelvo
