const {Dog, Temper} = require('../db');
const axios = require('axios');
const {BASE_URL, DOG} = require('../../constants');
const { response } = require('express');
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');



function getSomeDogs(req, res, next){

    const DogsApi = axios.get(BASE_URL);
    const DogsDB = Dog.findAll({include :Temper});
    Promise.all([DogsApi, DogsDB])
    .then(response=> {
        let [ApiRes, DBRes] = response;
        let ApiFiltered = ApiRes.data.map(each => {
            
            return {
                Id: each.id,
                Image: each.image.url,
                Name : each.name,
                Temperament: each.temperament, 
                Weight: each.weight.metric.replace(/-/g, "").split(" ")
            }
        })
        
        let DBFiltered = DBRes.map(each=> {
            let arrayTemperaments = each.tempers.map((elem, index) => {
                return elem.dataValues.name + ',  ';
            })
            console.log(arrayTemperaments);

            
            return { 
                Id: each.id,
                Name : each.name,
                Temperament: arrayTemperaments,
                Weight: each.weight
            }
        })
        const dogs = DBRes.concat(ApiRes.data);
        return res.send(DBFiltered.concat(ApiFiltered))
    }).catch(err =>{
        next(err);
    })
}

function getDogsBreed(req, res, next){
    const name = req.query.name;
    const DogsApi = axios.get(`${BASE_URL}${DOG}${name}`);
    const DogsDB = Dog.findAll({where: {name : {[Op.iLike]: `%${name}%`}}}, {include :Temper} );
    Promise.all([DogsApi, DogsDB])
    .then(response=> {
        let [ApiRes, DBRes] = response;
        let ApiFiltered = ApiRes.data.map(each => {

            let imageUrl = ()=>{
                if(each.reference_image_id === undefined) return "https://img2.freepng.es/20180415/jdw/kisspng-logo-silhouette-dog-bone-dog-5ad41d4b59e7d5.7560651515238505713683.jpg"
                return `https://cdn2.thedogapi.com/images/${each.reference_image_id}.jpg`
            }

            return {
                Id: each.id,
                Image:imageUrl(),
                Name : each.name,
                Temperament: each.temperament
            }
        })
        let DBFiltered = DBRes.map(each=> {
            let arrayTemperaments = each.tempers.map((elem, index) => {
                return elem.dataValues.name + ',  ';
            })
            console.log(arrayTemperaments);

            return {
                Id: each.id,
                Image: "https://img2.freepng.es/20180415/jdw/kisspng-logo-silhouette-dog-bone-dog-5ad41d4b59e7d5.7560651515238505713683.jpg",
                Name : each.name,
                Temperament: arrayTemperaments
            }
        })
        return res.send(DBFiltered.concat(ApiFiltered))
    }).catch(err =>{
        next(err);
    })

}


function getFullDogs(req, res, next){
    const id = req.params.idBreed;

    if(typeof id === 'string' && id.includes("-")){
        console.log(id);
        const DogsDB = Dog.findOne({where: {id : id}, include: "tempers"} );
        DogsDB
        .then(response => {
            let arrayTemperaments = response.tempers.map((elem, index) => {
                return elem.dataValues.name + ',  ';
            })
            console.log(response)
            console.log(arrayTemperaments);
            let DogFiltered = {
                Id: response.id,
                Name : response.name,
                Temperament: arrayTemperaments,
                Height: response.height,
                Weight: response.weight,
                LifeSpan: response.lifeSpan
            }
            return res.send(DogFiltered);
        }).catch(err=> next(err));
    }else{

        console.log("pase de largo la db");
        const DogsApi = axios.get(`${BASE_URL}`);
        DogsApi
        .then(response =>{
            const ApiDog = response.data.find(dog=> dog.id === parseInt(id)); 
            return ApiDog;
                
        }).then(ApiDog => {
            let ApiFiltered = {
                Id: ApiDog.id,
                Image: ApiDog.image.url || "https://e7.pngegg.com/pngimages/106/985/png-clipart-dog-walking-pet-sitting-symbol-horse-veterinary-mammal-animals.png",
                Name : ApiDog.name,
                Temperament: ApiDog.temperament,
                Height: ApiDog.height.metric,
                Weight: ApiDog.weight.metric,
                LifeSpan: ApiDog.lifeSpan
            }
            return res.send(ApiFiltered);
        }).catch(err=> next(err));
    }
}

function getDogsNames(req, res, next){
    const allDogs = axios.get(BASE_URL);
    allDogs.then(response => {
        var filtered = [];
        for(let i = 0; i < response.data.length; i++ ){
            if (response.data[i].name) {
                filtered = filtered.concat(response.data[i].name);
            }
        }
        let names = [... new Set(filtered)];
        return names;
    }).then(names => {
        res.json(names);
    }).catch(err=> next(err));
}

function postADog(req, res, next){
    const id = uuidv4();
    const {name, height, weight, lifeSpan, temperaments} = req.body
    const newDog = {
        id : id,
        name,
        height,
        weight,
        lifeSpan,
    };
    Dog.create(newDog)
    .then(response=> response.addTempers(temperaments))
    .then(response =>{
        res.status(200).json("A new Breed was created, yay");
    }).catch(err => next(err));

}


module.exports =  {
    getSomeDogs,
    getDogsBreed,
    getFullDogs,
    getDogsNames,
    postADog
}
