import {BASE_URL, DOG, BREED, FULLDOG, TEMPER, ALLTEMPER, NAMES} from '../constants';
import axios from 'axios';


//traigo todos los perros
export function getDogs() {
    return function(dispatch) {
      return axios.get(`${BASE_URL}${DOG}`)
        .then(response => {
          console.log(response.data);
          dispatch({ type: "GET_DOG", payload: response.data});
    })
  }
}

// traigo todos los perros de esa raza
export function getDogsByBreed(name){
  return function(dispatch) {
    return axios.get(name?`${BASE_URL}${DOG}${BREED}${name}`: `${BASE_URL}${DOG}`)
    .then(response => {
      console.log(response.data);
      dispatch({ type: "GET_DOG_BY_BREED", payload: response.data});
    })
  }
}

//traigo el detalle completo de un solo perro
export function getFullDogs(id){
  return function(dispatch) {
    return axios.get(`${BASE_URL}${DOG}${FULLDOG}${id}`)
    .then(response => {
      dispatch({ type: "GET_FULLDOG", payload: response.data});
    })
  }
}

//traigo todos los temperamentos

export function getTemperaments(payload) {
  return function(dispatch) {
    return axios.get(`${BASE_URL}${TEMPER}${ALLTEMPER}`)
      .then(response => {
        dispatch({ type: "GET_TEMPER", payload: response.data});
    })
  }
}

export function getNames() {
  return function(dispatch) {
    return axios.get(`${BASE_URL}${DOG}${NAMES}`)
      .then(response => {
        dispatch({ type: "GET_NAMES", payload: response.data});
    })
  }
}

export function filterByTemperament(temperament){
  return { type: "FILTER_BY_TEMPERAMENT", payload: temperament}
}

export function filterBySource(source){
  //console.log("action: ", source);
  return { type: "FILTER_BY_SOURCE", payload: source}
}

export function ordered(orderedState){
  console.log(orderedState);
  console.log("se esta ordenando");
  return { type: "ORDERED", payload: orderedState}
}

export function createDog(newDog){
  return function(dispatch) {
    let uniqueTemperaments = [... new Set(newDog.temperaments)];
    let intTemperaments = uniqueTemperaments.map(each=> parseInt(each));
    const body = {
      ...newDog,
      temperaments: intTemperaments
    }
    axios.post(`${BASE_URL}${DOG}`, body, {responseType: 'json'})
    .then(response => {
      console.log("post", response);
      return dispatch({ type: "CREATE_DOG", payload: newDog });
    })
  }
}