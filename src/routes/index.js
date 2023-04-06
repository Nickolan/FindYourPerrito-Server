const { Router } = require('express');
const axios = require('axios');
const { joinApiDB, getApiData, getTempsApi, nameDogsFinder } = require('../controllers/apiData')
const  { Dog, Temperament }  = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    const allDogs = await joinApiDB();
    try {
        if(name){
            const filterDogs = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            if(filterDogs.length) return res.status(200).json(filterDogs)
            else return res.status(404).send('El perro solicitado no existe')
        }else {
            console.log('Se obtuvieron todos los perros');
            return res.status(200).json(allDogs)
        }
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
})

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error('Ingrese un id')

       const allDogs = await joinApiDB();

        if (id.length > 5) {
            let perroAPIEncontrado = allDogs.find(dog => dog.id === id);
            return res.status(200).json(perroAPIEncontrado)
        } else {
            let perroDBEncontrado = allDogs.find(dog => dog.id === Number(id));
            return res.status(200).json(perroDBEncontrado)
        }
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})


router.post('/dogs', async (req, res) => {
    let { name, image, height, weight, life_span, temperament } = req.body
    
    try {
        if (!image) {
            image = 'https://i.redd.it/iwujsd0cffga1.jpg'
        }
        if (!name || !height || !weight || !life_span || !temperament.length) throw new Error('Faltan datos obligatorios')

        const newDog = await Dog.create({name, image, height, weight, life_span})
        
        
        await newDog.addTemperament(temperament)   
        
        return res.status(201).json(newDog)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})

router.get('/temperaments', async (req, res) => {
    try {
        let allTemperamentos = await Temperament.findAll()
        if (allTemperamentos.length < 1) {
            const allDogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
            let temps = allDogsApi.data.map(dog => dog.temperament).join(',').split(',');
            temps = temps.map(temp => temp.trim())
            let eachTemps = new Set(temps);
            let ordered = [...eachTemps].sort().slice(1).map((temp) => {return {name: temp}})
            let allTemperamentos = await Temperament.bulkCreate(ordered)
            return res.status(200).json(allTemperamentos);
        } else {
            return res.status(200).json(allTemperamentos);
        }
    } catch (error) {
        return error;
    }
})


module.exports = router;
