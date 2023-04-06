const axios = require('axios');
const dog = require('../models/Dog');
const  { Dog, Temperament }  = require('../db')



const getApiData = async () => {
        const allDogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const razas = allDogsApi.data.map(perro => {
            return {
                id: perro.id,
                name: perro.name,
                image: perro.image.url,
                height: perro.height.metric,
                weight: perro.weight.metric,
                life_span: perro.life_span,
                temperaments: perro.temperament
            }
        })
        return razas;
        //return allDogsApi.data;
}

const getDbData = async () => {
        return await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [] 
                }
            } 
        });
   
}

const joinApiDB = async () => {
    // getApiData()
    // .then(allDogsApi => allDogsApi.concat(getDbData()))
    let allDogsApi = await getApiData()
    let allDogsDB = await getDbData();
    let allDogs = allDogsApi.concat(allDogsDB)
    return allDogs;
}

const getTempsApi = async () => {
    try {
        const allDogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        let temps = allDogsApi.data.map(dog => dog.temperament).join(',').split(',');
        let newTemps = new Set(temps);
        let final = [...newTemps].sort();
        return res.status(200).json(final);
        // temps = temps.sort()
    } catch (error) {
        return error;
    }
}

const nameDogsFinder = async (name) => {
    const dogsRace = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`) 
    let response = dogsRace.data;
    let dogsApi = await Dog.findAll({
        where: {
            name: name
        },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        } 
    })
    let allDogs = response.concat(dogsApi)
    return allDogs;

    /*const razas = dogsRace.data.map(perro => {
        return {
            id: perro.id,
            nombre: perro.name,
            imagen: perro.image.url,
            altura: perro.height.imperial,
            peso: perro.weight.imperial,
            añosDeVida: perro.life_span,
            temperamentos: perro.temperament
        }
    })
    return razas;
    */
}


module.exports = { joinApiDB, getApiData, getTempsApi, nameDogsFinder };