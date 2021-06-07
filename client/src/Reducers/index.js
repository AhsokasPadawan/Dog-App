
const initialState = {
    dogs : [],
    dogsFiltered: [],
    dogsByBreed : [],
    fullDog : {},
    temperaments : []
}

function reverseSort(dogs){
    const clone = [...dogs];
    clone.reverse();
    return clone
}

function sourceDBFilter(dogs){
    const clone = [...dogs];
    let filtered = clone.filter(each=> typeof each.Id === 'string')
    return filtered
}

function sourceApiFilter(dogs){
    const clone = [...dogs];
    let filtered = clone.filter(each=> typeof each.Id === 'number');
    return filtered
}

function AZ(dogs){
    const clone = [...dogs];
    clone.sort((a,b)=> {
        console.log("a:", a.Name, "b:", b.Name);
        return a.Name - b.Name })
    return clone
}

function MinMax(dogs){
    const clone = [...dogs];
    clone.sort((a,b)=> {
        console.log("a:", a.Weight, "b:", b.Weight);
        return a.Weight[0] - b.Weight[0] })
    return clone
}

function MaxMin(dogs){
    const clone = [...dogs];
    clone.sort((a,b)=> {
        console.log("a:", a.Weight, "b:", b.Weight);
        return  b.Weight[0]- a.Weight[0] })
    return clone
}

function rootReducer(state = initialState, action) {
    console.log(action);
    if (action.type === "GET_DOG") {
        return {
            ...state,
          dogs: action.payload
        };
    }
    if (action.type === "GET_DOG_BY_BREED") {
        return {
            ...state,
            dogs: action.payload
        }
    }
    if (action.type === "GET_FULLDOG"){
        return {
            ...state,
            fullDog: action.payload
        }
    }
    if (action.type === "GET_TEMPER"){
        return {
            ...state, 
            temperaments:action.payload
        }
    }

    if (action.type === "GET_NAMES"){
        return {
            ...state, 
            dogsByBreed:action.payload
        }
    }
    
    if (action.type === "FILTER_BY_TEMPERAMENT"){
        console.log("estoy en el reducer");
        return {
            ...state, 
            dogsFiltered: state.dogs.filter(dog=> dog.hasOwnProperty("Temperament") && dog.Temperament.includes(action.payload))
        }
    }

    if (action.type === "FILTER_BY_SOURCE"){
        //console.log("reducer", action.payload);
        console.log("state", state.dogs);
        if(action.payload === 'db'){
            return {...state,
                dogsFiltered: sourceDBFilter(state.dogs)}
        }
        if(action.payload === 'api'){
            return {...state,
                dogsFiltered: sourceApiFilter(state.dogs)}
        }
    }

    if (action.type === "ORDERED") {
        console.log("Estoy en el reducer", action.payload)
        switch(action.payload){
            case "AZ": 
            return {...state,
                    dogs: AZ(state.dogs)}
            case "ZA": 
            return {...state,
                    dogs: reverseSort(state.dogs)}
            case "MaxMin": 
            return {...state,
                    dogs: MaxMin(state.dogs)}
            case "MinMax": 
            return {...state,
                dogs: MinMax(state.dogs)}

            default: return state;
        }
    }

    
    if (action.type === "CREATE_DOG"){
        console.log("pase por el reducer");
        return {
            ...state, 
            fullDog: action.payload
        }
    }

    return state;
}

export default rootReducer;