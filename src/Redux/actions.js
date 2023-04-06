import axios from 'axios';
import { GET_DOGS, GET_TEMPS, ORDER, FILTER_TEMPS, FILTER_ORIGIN, FIND_DOGS, RESET } from './action-types'

export const getAllDogs = (setisLoading) => {
    return async function (dispatch){
        let dogsData = await axios.get('http://localhost:3001/dogs')
        setisLoading(true)
        return dispatch({type: GET_DOGS, payload: dogsData.data})
    }
}

export const reset = () => {
    return {type: RESET}
}

export const getTemperaments = () => {
    return async function (dispatch){
        let tempsData = await axios.get('http://localhost:3001/temperaments')
        return dispatch({type: GET_TEMPS, payload: tempsData.data})
    }
}

export const orderDogs = (order) => {
    return {type: ORDER, payload: order}
}

export const filterByTemps = (temp) => {
    return {type: FILTER_TEMPS, payload: temp}
}

export const filterByOrigin = (origin) => {
    return {type: FILTER_ORIGIN, payload: origin}
} 

export const findDogs = (dogName) => {
    return async function (dispatch){
        let dogs = await axios(`http://localhost:3001/dogs?name=${dogName}`)
        return dispatch({type: FIND_DOGS, payload: dogs.data})
    }
}