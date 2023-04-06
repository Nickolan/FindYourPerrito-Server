import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTemperaments } from "../../Redux/actions";
import { validate } from "./validators";
import formStyle from './Form.module.css'
import icon from '../../images/Perrito2.png'
import create from '../../images/createDog.png'

export default function Form({back, play}){

    const temps = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [dog, setDog] = useState({
        name: '',
        image: '',
        temperament: [],
        showTemp: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_spanMin: '',
        life_spanMax: '',
    })

    const [errors, setError] = useState({})

    useEffect(() => {
        dispatch(getTemperaments())
        setError(validate({
            ...dog
        }))
    }, [])

    const handleClearTemps = () => {
        setDog({
            ...dog,
            temperament: [],
            showTemp: ''
        })
        setError(validate({
            ...dog,
            temperament: []
        }))
    }

    const handleChange = (event) => {
        let property = event.target.name;
        let value = event.target.value;
        setDog({ ...dog, 
            [property]: value
        })
        setError(validate({
            ...dog,
            [property]: value
        }))
    }

    const handleCheck = (event) => {
        if (dog.temperament.includes(event.target.value)) {
            setDog({
                ...dog
            })
        } else {
            setDog({
                ...dog,
                temperament: [...dog.temperament, event.target.value],
                showTemp:[...dog.showTemp, ` ${event.target.value}`] 
            })
            setError(validate({
                ...dog,
                temperament: [...dog.temperament, event.target.value]
            }))
        }
    }

    const handleSubmit = (event) => {
        if (Object.entries(errors).length > 0) {
            event.preventDefault();
            return window.alert('Hay errores en la completacion del formulario, arreglalo para crear tu nuevo perro')
        } 
        event.preventDefault();
            axios.post('http://localhost:3001/dogs', {
                name: dog.name,
                image: dog.image,
                height: `${dog.heightMin} - ${dog.heightMax}`,
                weight: `${dog.weightMin} - ${dog.weightMax}`,
                life_span: `${dog.life_spanMin} - ${dog.life_spanMax} years`,
                temperament: dog.temperament
            }).then(play())
            .then(navigate('/home'))
    }

    return (
        <div className={formStyle.contain}>
            <button onClick={() => back()} className={formStyle.buttonBack}>
                <Link to={'http://localhost:3000/home'}><img className={formStyle.exitImg} src={icon} alt="" /></Link>
                <h2>Home</h2>
            </button>

            <button className={formStyle.clearTemps} onClick={handleClearTemps}>Clear Temperaments</button>
        <form className={formStyle.formbox} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Dog's Name: </label>
                <input required type="text" name="name" onChange={handleChange}/>
                <p className={formStyle.errors}>{errors.name}</p>
            </div>
            <div>
                <label htmlFor="">Dog's Height: </label>
                <div onChange={handleChange}>
                    <label>Min: </label>
                    <input type="number" name="heightMin"/>
                    <label> Max: </label>
                    <input type="number" name="heightMax"/>
                </div>
                <p className={formStyle.errors}>{errors.height}</p>
            </div>
            <div>
                <label >Dog's Weight: </label>
                <div onChange={handleChange}>
                    <label>Min: </label>
                    <input type="number" name="weightMin"/>
                    <label> Max: </label>
                    <input type="number" name="weightMax"/>
                </div>
                <p className={formStyle.errors}>{errors.weight}</p>
            </div>
            <div>
                <label htmlFor="">Dog's Life-Span: </label>
                <div onChange={handleChange}>
                    <label>Min: </label>
                    <input type="number" name="life_spanMin"/>
                    <label> Max: </label>
                    <input type="number" name="life_spanMax"/>
                </div>
                <p className={formStyle.errors}>{errors.life_span}</p>
            </div>
            <div>
                <label htmlFor="">Dog's image: </label>
                <input placeholder="No es obligatorio" type='url' name="image" onChange={handleChange}/>
                
            </div>
            <div>
                <label>Dog's Temperament/s: </label>
            <div>
                <select className={formStyle.select} onClick={handleCheck} multiple='multiple'>
                { temps.map((temp, index) => <option ty key={index} value={temp.name}>{temp.name}</option>) }
                </select>

            </div>
                <p className={formStyle.errors}>{errors.temperament}</p>
            </div>
            <div>
                {
                    Object.entries(errors).length > 0 
                    ? <p className={formStyle.errors}>There are {Object.entries(errors).length} errors to fix before creating your dog</p>
                    : null
                }
                
                <button className={formStyle.submit} type="submit"><img className={formStyle.hueso} src={create} alt="" /></button>
            </div>

        </form>

            <div className={formStyle.result}>
                <h2 className={formStyle.text}>Name: {dog.name}</h2>
                <h2 className={formStyle.text}>Height: ({dog.heightMin} -  {dog.heightMax})cm</h2>
                <h2 className={formStyle.text}>Weight: ({dog.weightMin} - {dog.weightMax})Kg</h2>
                <h2 className={formStyle.text}>Life-Span: ({dog.life_spanMin} - {dog.life_spanMax}) years</h2>
                <h2 className={formStyle.text}>Temperament/s: {dog.showTemp}</h2>
                <div className={formStyle.imgCont}>{dog.image.length > 0 ? <img className={formStyle.dogImg} src={dog.image}/> : <img className={formStyle.dogImg} src={icon}/>}</div>
            </div>
        </div>
    )
}

/*
dog.temperament.split(/(?=[A-Z])/); // separa por letras mayusculas
*/