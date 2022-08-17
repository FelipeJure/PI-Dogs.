export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG = 'GET_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_BREED = 'FILTER_BY_BREED';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const POST_DOG = 'POST_DOG';
export const DELETE_DOG = 'DELETE_DOG';
export const EDIT_DOG = 'EDIT_DOG';
export const ORDER_BY_HEIGHT = 'ORDER_BY_HEIGHT';

export function orderByHeight (height) {
    return {
        type: ORDER_BY_HEIGHT,
        payload: height
    }
}

export function getAllDogs (){
    return function (dispatch){
        return (
            fetch('http://localhost:3001/dogs')
            .then(response => response.json())
            .then(allDogs => dispatch({ type: GET_ALL_DOGS, payload: allDogs }))
        )
    }
}
export function getDog (name){
    return function (dispatch){
        return (
            fetch(`http://localhost:3001/dogs?name=${name}`)
            .then(response => response.json())
            .then(dogs => {
                dispatch({ type: GET_DOG, payload: dogs })
            })
        )
    }
}
export function getTemperaments(){
    return function (dispatch){
        return (
            fetch('http://localhost:3001/temperaments')
            .then(response => response.json())
            .then(temperaments => dispatch({ type: GET_TEMPERAMENTS, payload: temperaments }))
        )
    }
}
export function filterByTemperament (temperament){
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: temperament
    }
}
export function filterByBreed (breed){
    return {
        type:FILTER_BY_BREED,
        payload: breed
    }
}
export function filterByOrigin (origin){
    return function (dispatch){
        return (
            fetch(`http://localhost:3001/dogs/filteredByOrigin/${origin}`)
            .then(response => response.json())
            .then(dogs => {
                dispatch({ type: FILTER_BY_ORIGIN, payload: dogs, filter:origin })})
        )
    }
}
export function orderByName (name){
    return {
        type: ORDER_BY_NAME,
        payload:name
    }
}
export function orderByWeight (weight){
    return {
        type: ORDER_BY_WEIGHT,
        payload:weight
    }
}
export function createDog (payload){
    return async function (){
        return fetch('http://localhost:3001/dogs', {
            method:'POST',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => {
            return {type:POST_DOG, payload:response}
        })
        .catch(error => {
            console.error(error)
        })
    }
}

export function deleteDog (id) {
    return async function (){
        return fetch(`http://localhost:3001/dogs/${id}`, {
            method:'DELETE'
        }).then(res => res.json())
        .then(response => {
            return {type:DELETE_DOG, payload:response}
        })
        .catch(error => {
            console.error(error)
        })
    }
}

export function editDog (payload) {
    return async function (){
        return fetch('http://localhost:3001/dogs', {
            method:'PUT',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => {
            console.log(response)
            return {type:EDIT_DOG, payload:response}
        })
        .catch(reason => {
            console.log('HOLAAAAAAAAAAAA')
            return {type:EDIT_DOG, payload:reason}
        })
    }
}