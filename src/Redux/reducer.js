import { ORDER, GET_DOGS, GET_TEMPS, FILTER_ORIGIN, FILTER_TEMPS, FIND_DOGS, RESET } from './action-types'
const initialState = {
    showDogs: [],
    temperaments: [],
    allDogs: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return{
                ...state, allDogs: action.payload, showDogs: action.payload
            }
        case GET_TEMPS:
            return{
                ...state, temperaments: action.payload
            }
        case ORDER:
            let order;
            let dogs = state.showDogs.map(dog => { 
                    let dogweight = dog.weight;
                    var peso = dogweight.split(' - ').join('') // '1030'   '510' '3035'
                    return{
                    ...dog,
                    mweight: peso //   1020   510
                }
                 /*
                let peso = dog.weight.split(' ') 
                // let wpeso = Number(peso[0])
                let wpeso = peso[0] + peso[2];
                return{
                    ...dog,
                    mweight: Number(wpeso) 
                }
                */
            })
            if (action.payload === 'ascendente') {
                order = [...state.showDogs].sort((a, b) => a.name.localeCompare(b.name))
            } else if (action.payload === 'descendente') {
                order = [...state.showDogs].sort((a, b) => b.name.localeCompare(a.name))
            } else if (action.payload === 'Weight min'){
                // order = dogs.sort((a, b) => a.mweight - b.mweight) 
                order = [...dogs].sort((a, b) => Number(a.mweight) - Number(b.mweight)) 
            } else if (action.payload === 'Weight max'){
               // order = dogs.sort((a, b) => b.mweight - a.mweight) 
               order = [...dogs].sort((a, b) => Number(b.mweight) - Number(a.mweight)) 
            }
            return {
                ...state, 
                showDogs: order
                
            }


        case FILTER_ORIGIN:
            let filtered
            if (action.payload === 'Api') {
              filtered = [...state.showDogs].filter(dogs => !dogs.madeInDB)
             //filtered = [...state.allDogs].filter(dogs => !dogs.madeInDB)   
            } else if (action.payload === "Data"){
                 //filtered = [...state.showDogs].filter(dogs => dogs.madeInDB)
                filtered = [...state.showDogs].filter(dogs => dogs.madeInDB)
            } else {
                filtered = state.allDogs
            }
            return {
                ...state, showDogs: filtered
            }


        case FILTER_TEMPS:
            if (action.payload === 'AllTemps') {
                return {
                    ...state, showDogs: state.allDogs
                }
            }   //              [...state.showDogs] probar para combinar temperamentos
            let tempsFiltered = [...state.showDogs].filter((dogs) => dogs.temperaments && dogs.temperaments.includes(action.payload))
            /*
            let tempsFiltered = [...state.showDogs].filter((dogs) => {
                // if (dogs.madeInDB) {
                //     dogs.temperaments = dogs.temperaments.map((temp) => {
                //         Object.values(temp)
                //     })
                // }
                return dogs.temperaments && dogs.temperaments.includes(action.payload)
            })
            */
            return {
                ...state, showDogs: tempsFiltered
            }


        case FIND_DOGS:
            return {
                ...state, showDogs: action.payload
            }
        case RESET:
            return {
                ...state, showDogs: state.allDogs
            }
        default:
            return {...state}
    }
}

export default reducer;