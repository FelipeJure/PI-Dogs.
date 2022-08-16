import { 
    GET_ALL_DOGS, 
    GET_DOG, 
    GET_TEMPERAMENTS, 
    FILTER_BY_TEMPERAMENT, 
    FILTER_BY_BREED,
    FILTER_BY_ORIGIN,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    POST_DOG,
    DELETE_DOG,
    EDIT_DOG
} from "./actions";

const initialState = {
    allDogs: [],
    alwaysAllDogs:[],
    temperaments:[],
    specificTemperaments:null
};

export default function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                alwaysAllDogs: action.payload,
                specificTemperaments: null
            }
        case GET_DOG:
            let someTemperaments = null
            if(action.payload.length){
                let someTemp = []
                someTemp = action.payload.reduce((prev,curr) => {
                    if (curr.temperament) return prev.concat(curr.temperament)
                }, [])
                const setTemperaments = new Set (someTemp)
                const arrayTemperaments = Array.from(setTemperaments)
                someTemperaments = []
                for(let i = 0; i < arrayTemperaments.length; i++){
                    for(let j = 0; j < state.temperaments.length; j++){
                        if (arrayTemperaments[i] === state.temperaments[j].name) someTemperaments.push(state.temperaments[j])
                    }
                } 
                someTemperaments.sort((a,b)=> (a.name > b.name ? 1 : -1))
            }
            return {
                ...state,
                allDogs: action.payload,
                alwaysAllDogs: action.payload,
                specificTemperaments: someTemperaments
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.alwaysAllDogs
            const filteredDogs = action.payload === 'all'? allDogs : allDogs.filter(dog => dog.temperament?.find(t => t === action.payload));
            return{
                ...state,
                allDogs:filteredDogs,
            }
        case FILTER_BY_BREED:
            const dogs = state.alwaysAllDogs;
            const filteredDog = action.payload === 'all'? dogs : dogs.filter(dog => dog.name === action.payload);
            return{
                ...state,
                allDogs:filteredDog,
            }
        case FILTER_BY_ORIGIN:
            let origin
            let originTemperaments = state.temperaments
            if(action.payload.length) {
                origin = action.payload
                if(action.filter === 'created'){
                    let someTemp = []
                    someTemp = action.payload.reduce((prev,curr) => {
                        if (curr.temperament) return prev.concat(curr.temperament)
                    }, [])
                    const setTemperaments = new Set (someTemp)
                    const arrayTemperaments = Array.from(setTemperaments)
                    originTemperaments = []
                    for(let i = 0; i < arrayTemperaments.length; i++){
                        for(let j = 0; j < state.temperaments.length; j++){
                            if (arrayTemperaments[i] === state.temperaments[j].name) originTemperaments.push(state.temperaments[j])
                        }
                    } 
                    originTemperaments.sort((a,b)=> (a.name > b.name ? 1 : -1))
                }
            }
            else origin = {message:"Create one dog!"}
            return {
                ...state,
                allDogs:origin,
                alwaysAllDogs: origin,
                specificTemperaments: originTemperaments
            }
        case ORDER_BY_NAME:
            let orderDogs = action.payload==='A-Z'? state.allDogs.sort((a,b) => {
                if(a.name>b.name) return 1
                if(a.name<b.name)return -1
                else return 0
                }): state.allDogs.sort((a,b) => {
                    if(a.name>b.name) return -1
                    if(a.name<b.name)return 1
                    else return 0
                    })
            return{
                ...state,
                allDogs:orderDogs,
            }
        case ORDER_BY_WEIGHT:
            let averageWeight = state.allDogs.map(dog =>{
                dog.weight = dog.weight.split(' - ')
                let minWeight = dog.weight[0] === 'NaN'?10:Number(dog.weight[0])
                let maxWeight
                if(dog.weight[1]){
                    if (dog.weight[1]=== 'NaN') maxWeight = 10
                    else maxWeight = Number(dog.weight[1])
                }
                else maxWeight = minWeight
                dog.middleWeight = (minWeight + maxWeight) / 2
                dog.weight = dog.weight.join(' - ')
                return dog
            })
            averageWeight = action.payload === 'Menor peso'? 
                averageWeight.sort((a,b) => {
                    if(a.middleWeight>b.middleWeight) return 1
                    if(a.middleWeight<b.middleWeight) return -1
                    return 0
                })
            : 
                action.payload === 'Mayor peso'?
                    averageWeight.sort((a,b) => {
                        if(a.middleWeight>b.middleWeight) return -1
                        if(a.middleWeight<b.middleWeight) return 1
                        return 0
                    })
                : 
                averageWeight
            return{
                ...state,
                allDogs: averageWeight,
            }
        case POST_DOG:
            return {
                ...state,   
            }
        case DELETE_DOG:
            return {
                ...state,
                allDogs: action.payload,
                alwaysAllDogs: action.payload
            }
        case EDIT_DOG:
            console.log(action.payload)
            return {
                ...state,   
            }
        default: 
        return state
    }
}